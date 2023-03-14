<script setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/users";
import { supabase } from "../supabase";
import Card from "./Card.vue";
import Observer from "./Observer.vue";

const userStore = useUserStore();
const lastCardIndex = ref(2);
const ownerIds = ref([]);
const reachEnd = ref(false);
const loadingPosts = ref(false);

const { user } = storeToRefs(userStore);

const posts = ref([]);

const fetchData = async () => {
  /* pegando posts de quem voce esta seguindo, voce = user.value.id */
  const { data: followings } = await supabase
    .from("followers_following")
    .select("following_id")
    .eq("follower_id", user.value.id);
  /* mapeando o data p se tornar um array com os ids dos numeros das pessoas que voce segue */
  ownerIds.value = followings.map((f) => f.following_id);
  /* finalmente pegando os posts dos usuarios que vc segue, em ordem do mais recente */
  const { data } = await supabase
    .from("posts")
    .select()
    .in("owner_id", ownerIds.value)
    .range(0, 2)
    .order("created_at", { ascending: false });

  posts.value = data;
};

const fetchNextSet = async () => {
  if (!reachEnd.value) {
    loadingPosts.value = true;
    const { data } = await supabase
      .from("posts")
      .select()
      .in("owner_id", ownerIds.value)
      .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
      .order("created_at", { ascending: false });

    console.log;

    posts.value = [...posts.value, ...data];

    lastCardIndex.value = lastCardIndex.value + 3;
    loadingPosts.value = false;
    if (!data.length) {
      loadingPosts.value = false;
      /* para evitar requisicoes desnecessárias, se chegou no final nao faz mais requisicoes */
      reachEnd.value = true;
    }
  }
};

onMounted(() => {
  fetchData();
});
</script>


<template>
  <div class="timeline-container">
    <Card v-for="post in posts" :key="post.id" :post="post" />
    <Observer v-if="posts.length" @intersect="fetchNextSet" />
    <a-spin v-if="loadingPosts" />
  </div>
</template>

<style scoped>
</style>