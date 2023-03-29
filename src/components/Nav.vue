<script setup>
import { RouterLink, useRouter } from "vue-router";
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
import { ref, watch } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { useCheckScreen } from "../stores/checkScreen"

const checkScreen = useCheckScreen();
const { isSmallScreen, isVerySmallScreen } = storeToRefs(checkScreen);

const userStore = useUserStore();
const { VITE_BASE_PHOTO_URL } = import.meta.env;

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

const goToUserProfile = () => {
  router.push(`/profile/${user.value.username}`);
};
</script>

<template>
  <a-layout-header v-if="!isVerySmallScreen" class="nav-bar">
    <!-- container que criei p limitar o tamanho do header -->
    <Container>
      <div v-if="!isSmallScreen" class="nav-container">
        <div class="right-content">
          <RouterLink to="/" class="bright-purple">Picbook</RouterLink>
          <a-input-search
            class="search"
            v-model:value="searchUsername"
            placeholder="Nome do usuário..."
            style="width: 300px"
            @search="onSearch"
          />
        </div>
        <div class="content" v-if="loadingUser">
          <a-spin />
        </div>
        <div class="content" v-if="!loadingUser">
          <!-- parte com problema -->
          <div class="left-content" v-if="!user">
            <auth-modal :isLogin="false" />
            <auth-modal :isLogin="true" />
          </div>
          <div class="left-content" v-else>
            <a-typography class="blank">{{ user.username }}</a-typography> 
            <a-button type="primary" @click="goToUserProfile()"
              >Perfil</a-button
            >
            
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" size="lg" style="color: #f7454e; margin-left:20%;" @click="handleLogout()"/>
            <!-- <a-button type="primary" @click="handleLogout()">Sair</a-button> -->
          </div>
        </div>
      </div>
      
      
      <div v-if="isSmallScreen" class="nav-container-mini">
        <div class="right-content">
          <RouterLink to="/" class="bright-purple">Picbook</RouterLink>
          <a-input-search
            class="search"
            v-model:value="searchUsername"
            placeholder="Nome do usuário..."
            style="width: 300px"
            @search="onSearch"
          />
        </div>
        <div class="content" v-if="loadingUser">
          <a-spin />
        </div>
        <div class="content" v-if="!loadingUser">
          <!-- parte com problema -->
          <div class="left-content" v-if="!user">
            <auth-modal :isLogin="false" />
            <auth-modal :isLogin="true" />
          </div>
          <div class="left-content" v-else>
            <a-typography class="blank">{{ user.username }}</a-typography>
            <a-button type="primary" @click="goToUserProfile()"
              >Perfil</a-button
            >
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" size="lg" style="color: #f7454e; margin-left:20%;" @click="handleLogout()"/>
            
          </div>
        </div>
      </div>
    </Container>
  </a-layout-header>

  <div v-else>
    <a-layout-header class="nav-bar-search">
      <div class="right-content">
          <RouterLink to="/" class="bright-purple">Picbook</RouterLink>
      <a-input-search
            class="search"
            v-model:value="searchUsername"
            placeholder="Nome do usuário..."
            @search="onSearch"
          />
          </div>
    </a-layout-header>
  <a-layout-header class="nav-bar-mini">
    <!-- container que criei p limitar o tamanho do header -->
    <Container>   
      <div class="nav-container-mini">
        <div class="content" v-if="loadingUser">
          <a-spin />
        </div>
        <div class="content" v-if="!loadingUser">
          <!-- parte com problema -->
          <div class="left-content" v-if="!user">
            <auth-modal :isLogin="false" />
            <auth-modal :isLogin="true" />
          </div>
          <div class="left-content" v-else>
            <a-typography class="blank">{{ user.username }}</a-typography>
            <a-button type="primary" @click="goToUserProfile()"
              >Perfil</a-button
            >
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" size="lg" style="color: #f7454e; margin-left:20%;" @click="handleLogout()"/>
            
          </div>
        </div>
      </div>
    </Container>
  </a-layout-header>
  </div>
</template>

<style scoped>
.nav-container {
  display: flex; /* para deixar tudo horizontal */
  justify-content: space-between;
}

.blank{
  margin-left: 10%;
}

.nav-container-mini {
  display: flex; /* para deixar tudo horizontal */
  float: right;
}

.content {
  display: flex;
  align-items: center;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.nav-bar-search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.nav-bar-mini {
  flex-shrink: 0; /* para nao encolher o footer */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
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