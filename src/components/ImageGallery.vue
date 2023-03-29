<script setup>
import { defineProps } from "vue";
import { storeToRefs } from "pinia";
import { useCheckScreen } from "../stores/checkScreen"

const checkScreen = useCheckScreen();
const { isSmallScreen, isVerySmallScreen } = storeToRefs(checkScreen);

const {VITE_BASE_PHOTO_URL} = import.meta.env
const props = defineProps(["posts"]);
</script>


<template>
  <div class="image-gallery-container">
    <img :class="{ 'img': !isVerySmallScreen, 'img-mini': isVerySmallScreen }" v-for="post in props.posts" :key="post.id" :src="`${VITE_BASE_PHOTO_URL}${post.url}`" alt="" />
  </div>
</template>

<style scoped>


.img {
  margin: 5px;
  width: 200px;
}

.img-mini {
  margin: 1%;
  width: 31%;
}
</style>