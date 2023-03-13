<script setup>
import {onMounted} from "vue"
import Nav from "./components/Nav.vue"
import {RouterView} from "vue-router"
import {useUserStore} from "./stores/users"

const userStore = useUserStore()

onMounted(() =>  {
  userStore.getUser()
})

</script>

<template>
  <main>
    <Nav /> <!-- chamando componente nav -->
    <router-view/> <!-- está renderizando o homeview por ser o componente padrao -->
  </main>
</template>

<style scoped>
</style>
