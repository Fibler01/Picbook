<script setup>
import { RouterLink, useRouter } from "vue-router";
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
import { ref } from "vue";

const router = useRouter();
const searchUsername = ref("");
const isAuthenticated = ref(false);


const onSearch = () => { /* ao clicar no botao de pesquisar */
  if(searchUsername.value) {
    router.push(`/profile/${searchUsername.value}`);
    searchUsername.value = "";

  }

};
</script>

<template>
  <a-layout-header>
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
        <div class="left-content" v-if="!isAuthenticated">
            <auth-modal :isLogin="false" />
            <auth-modal :isLogin="true" />
        </div>
        <div class="left-content" v-else>
            <a-button type="primary">Perfil</a-button>
            <a-button type="primary">Sair</a-button>
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
.right-content {
  display: flex;
  align-items: center;
}

.right-content a {
  margin-right: 10px;
}

.left-content {
  display: flex;
  align-items: center;
}

.left-content button{
  margin-left: 10px;
}
</style>