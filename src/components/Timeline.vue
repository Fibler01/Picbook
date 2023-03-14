<script setup>
import Container from "./Container.vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import Cards from "./Cards.vue"
import LogInMessage from "./LogInMessage.vue"

const userStore = useUserStore();

const { user, loadingUser } = storeToRefs(userStore);


</script>

<template>
  <Container>
    <div class="" v-if="!loadingUser">
      <Cards v-if="user"/>
      <LogInMessage v-else />
    </div>
    <div v-else class="timeline-spinner">
      <a-spin />
    </div>
  </Container>
</template>

<style>
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0px;
}

.timeline-spinner {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 90vh;
}
</style>