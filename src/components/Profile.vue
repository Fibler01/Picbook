<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue"

const data = [
  {
    id: 1,
    username: "Joao",
    url: "https://www.pontotel.com.br/wp-content/uploads/2022/05/imagem-corporativa.jpg",
    caption: "Teste",
  },
  {
    id: 2,
    username: "Pedro",
    url: "https://img.elo7.com.br/product/main/3B06B23/imagem-digital-jesus-e-leao-foto-para-quadro.jpg",
    caption: "Olá",
  },
  {
    id: 3,
    username: "Pedro",
    url: "https://img.elo7.com.br/product/main/3B06B23/imagem-digital-jesus-e-leao-foto-para-quadro.jpg",
    caption: "Olá",
  },
];
</script>

<template>
  <Container>
    <div class="profile-container"> <!-- para deixar o route reativo (ao trocar de perfil n aparecer upload imagem, é necessario usar key), o parametro é o username -->
      <UserBar
      :key="$route.params.username" 
      username="Joao"
      :userInfo="{
        posts:4,
        followers: 100,
        following: 342
      }" />
      <ImageGallery :posts="[
      {
        id: 1,
        image: 'https://www.guiaviagensbrasil.com/imagens/praia-costa-itacare-ba-9599.jpg'
      },
      {
        id: 2,
        image: 'https://www.guiaviagensbrasil.com/imagens/praia-costa-itacare-ba-9599.jpg'
      },
      {
        id: 3,
        image: 'https://www.guiaviagensbrasil.com/imagens/praia-costa-itacare-ba-9599.jpg'
      }
      ]"
       />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
}
</style>