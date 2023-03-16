<script setup>
import { useCheckScreen } from "../stores/checkScreen";
import { storeToRefs } from "pinia";

const checkScreen = useCheckScreen();
const { isSmallScreen, isVerySmallScreen } = storeToRefs(checkScreen);
</script>

<template>
  <div :class="{ 'container': !isVerySmallScreen, 'container-mini': isVerySmallScreen }">
    <slot></slot>
    <!-- slot serve para colocar outras views dentro do nosso componente -->
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  min-width: 740px;
  margin: 0 auto;
  align-content: center;
}

.container-mini {

  position: relative;
  min-height: 10vh;
}
</style>