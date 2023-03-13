<script setup>
import { RouterLink, useRouter } from "vue-router";
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
import { ref } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user, loadingUser } = storeToRefs(userStore);
const router = useRouter();
const searchUsername = ref("");

const onSearch = () => {
  /* ao clicar no botao de pesquisar */
  if (searchUsername.value) {
    router.push(`/profile/${searchUsername.value}`);
    searchUsername.value = "";
  }
};

const handleLogout = async () => {
  await userStore.handleLogout();
};
</script>

<template>
  <a-layout-header class="nav-bar">
    <!-- container que criei p limitar o tamanho do header -->
    <Container>
      <div class="nav-container">
        <div class="right-content">
          <RouterLink to="/">Picbook</RouterLink>
          <a-input-search
            v-model:value="searchUsername"
            placeholder="Nome do usuário..."
            style="width: 200px"
            @search="onSearch"
          />
        </div>
        <div class="content" v-if="loadingUser">
          <a-spin />
        </div>
        <div class="content" v-if="!loadingUser"> <!-- parte com problema -->
          <div class="left-content" v-if="!user">
            <auth-modal :isLogin="false" />
            <auth-modal :isLogin="true" />
          </div>
          <div class="left-content" v-else>
            <a-button type="primary">Perfil</a-button>
            <a-button type="primary" @click="handleLogout()">Sair</a-button>
        </div>
        </div>
      </div>
    </Container>
  </a-layout-header>
</template>

<style scoped>
.nav-container {
  display: flex; /* para deixar tudo horizontal */
  justify-content: space-between;
}

.content {
    display: flex;
    align-items: center;
}

.nav-bar {
  /* background-color: rgb(61, 0, 117); */
}

.right-content {
  display: flex;
  align-items: center;
}

.right-content a {
  margin-right: 10px;
}

.left-content {
  color: aliceblue;
  display: flex;
  align-items: center;
}

.blank {
  color: aliceblue;
}

.left-content button {
  margin-left: 10px;
}
</style>