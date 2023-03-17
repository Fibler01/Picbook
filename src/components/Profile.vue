<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue";
import { ref, onMounted, watch, reactive } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { useCheckScreen } from "../stores/checkScreen"


const checkScreen = useCheckScreen();
const { isSmallScreen, isVerySmallScreen } = storeToRefs(checkScreen);

const userStore = useUserStore();
const { user: loggedInUser } = storeToRefs(userStore);

const posts = ref([]);
const loading = ref(false);
const route = useRoute();
const user = ref(null);
const isFollowing = ref(false);
const { username } = route.params;
const userInfo = reactive({
  posts: null,
  followers: null,
  following: null,
});

const fetchFollowersCount = async () => {
  const { count } = await supabase
    .from("followers_following")
    .select("*", { count: "exact" })
    .eq("following_id", user.value.id);

  return count;
};

const fetchFollowingCount = async () => {
  const { count } = await supabase
    .from("followers_following")
    .select("*", { count: "exact" })
    .eq("follower_id", user.value.id);

  return count;
};

const addNewPost = (post) => {
  posts.value.unshift(post);
};

const updateIsFollowing = (follow) => {
  isFollowing.value = follow;
};

const fetchData = async () => {
  loading.value = true;
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (!userData) {
    loading.value = false;
    return (user.value = null);
  }
  user.value = userData;


  const { data: postsData } = await supabase
    .from("posts")
    .select()
    .eq("owner_id", user.value.id);
    
  

  posts.value = postsData;

  await fetchIsFollowing(); /* se vir dados é pq esta seguindo a pessoa em que vc esta na pagina */
  const followerCount = await fetchFollowersCount(); /* carregando seguidores */
  const followingCount = await fetchFollowingCount();

  userInfo.followers = followerCount;
  userInfo.following = followingCount;
  userInfo.posts = posts.value.length;

  loading.value = false;
};

const fetchIsFollowing = async () => {
  if (loggedInUser.value && loggedInUser.value.id !== user.value.id) {
    const { data } = await supabase
      .from("followers_following")
      .select()
      .eq("follower_id", loggedInUser.value.id)
      .eq("following_id", user.value.id)
      .single();

    if (data) {
      isFollowing.value = true;
    }
  }
};

watch(loggedInUser, () => {
  fetchIsFollowing();
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <Container>
    <div :class="{ 'profile-container': !isVerySmallScreen, 'profile-container-mini': isVerySmallScreen }" v-if="!loading">
      
      <!-- para deixar o route reativo (ao trocar de perfil n aparecer upload imagem, é necessario usar key), o parametro é o username -->
      <UserBar
        :key="$route.params.username"
        :user="user"
        :userInfo="userInfo"
        :addNewPost="addNewPost"
        :isFollowing="isFollowing"
        :updateIsFollowing="updateIsFollowing"
      />
      
      <ImageGallery :posts="posts" />
    </div>
    <div class="spinner" v-else>
      <a-spin />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
}

.profile-container-mini {
  flex-direction: column;
  align-items: center;
  padding: 40px 0px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
}
</style>