<script setup>
import Container from "./Container.vue";
import Card from "./Card.vue";

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
    <div class="timeline-container">
      <Card v-for="post in data" 
      :key="post.id" 
      :post="post" />
    </div>
  </Container>
</template>

<style scoped>
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
}
</style>