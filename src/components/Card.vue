<script setup>
import { defineProps } from "vue";
import { useCheckScreen } from "../stores/checkScreen";
import { storeToRefs } from "pinia";

const checkScreen = useCheckScreen();
const { isSmallScreen, isVerySmallScreen } = storeToRefs(checkScreen);

const props = defineProps(["post"]);
const { VITE_BASE_PHOTO_URL } = import.meta.env;
</script>


<template>
  <a-card hoverable class="card" :class="{ 'card': !isVerySmallScreen, 'card-mini': isVerySmallScreen }">
    <template #cover>
      <img :src="`${VITE_BASE_PHOTO_URL}${post.url}`" />
    </template>
    <a-card-meta :title="post.username">
      <template #description>{{ post.caption }}</template>
    </a-card-meta>
  </a-card>
</template>

<style scoped>
.card {
  max-width: 30%;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius:10px;
  font-size: 110%;
}

.card-mini {
  max-width: 60%;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius:10px;
  font-size: 110%;
}

a-card {
  font-size: 120%;
  height: auto;
}
</style>


