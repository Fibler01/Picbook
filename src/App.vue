<script setup>
import Nav from "./components/Nav.vue"
import {RouterView} from "vue-router"
</script>

<template>
  <main>
    <Nav /> <!-- chamando componente nav -->
    <router-view/> <!-- está renderizando o homeview por ser o componente padrao -->
  </main>
</template>

<style scoped>
</style>
