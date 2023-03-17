<script setup>
import { defineProps } from "vue";
import UploadPhotoModal from "./UploadPhotoModal.vue";
import UploadProfilePic from "./UploadProfilePic.vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { supabase } from "../supabase";
import { useCheckScreen } from "../stores/checkScreen";

const checkScreen = useCheckScreen();
const { isSmallScreen, isVerySmallScreen } = storeToRefs(checkScreen);

const { VITE_BASE_PHOTO_URL } = import.meta.env;

const userStore = useUserStore();
const route = useRoute();
const { username: profileUsername } = route.params;
const { user } = storeToRefs(userStore);
const props = defineProps([
  "user",
  "userInfo",
  "addNewPost",
  "isFollowing",
  "updateIsFollowing",
]);

const followUser = async () => {
  props.updateIsFollowing(true);
  await supabase.from("followers_following").insert({
    follower_id: user.value.id,
    following_id: props.user.id /* voce que apertou para seguir */,
  });
};

const unfollowUser = async () => {
  props.updateIsFollowing(false);
  await supabase
    .from("followers_following")
    .delete()
    .eq("follower_id", user.value.id)
    .eq("following_id", props.user.id);
};
</script>

<template>
  <div class="userbar-container" v-if="props.user">
    <div class="top-content">
      <a-typography-title class="black" :level="2"
        >{{ props.user.username }} 
        </a-typography-title>
        <upload-profile-pic class="profilePic"
          v-if="user && profileUsername === user.username"
          :previousProfilePic ="props.user.profilePic"
          :addNewPost="addNewPost"
        />
      <div v-if="user">
        <upload-photo-modal
          v-if="user && profileUsername === user.username"
          :addNewPost="addNewPost"
        />
        <div v-else>
          <a-button v-if="!props.isFollowing" @click="followUser"
            >Seguir</a-button
          >
          <a-button v-else @click="unfollowUser">Seguindo</a-button>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <a-typography-title :level="5"
        >{{ props.userInfo.posts }} posts</a-typography-title
      >
      <a-typography-title :level="5"
        >{{ props.userInfo.followers }} seguidores</a-typography-title
      >
      <a-typography-title :level="5"
        >{{ props.userInfo.following }} seguindo</a-typography-title
      >
    </div>
  </div>
  <div class="user-notfound" v-else>
    <a-typography-title :level="2">Usuário não encontrado</a-typography-title>
  </div>
</template>

<style scoped>
.userbar-container {
  padding-bottom: 75px;
}

.user-notfound{
    padding: 10%;
}

.bottom-content {
  /* border-bottom: 3px solid black; */
  /* background-image: linear-gradient(to right, #d3d3d3, #fff); */
  background-size: 100% 3px; /* tamanho de plano de fundo de 100% largura e 3px de altura */
  background-position: left bottom; /* posicionamento do plano de fundo no canto inferior esquerdo */
  display: flex;
  align-items: center;
}

.bottom-content h5 {
  margin: 0 !important;
  padding: 0;
  margin-right: 30px !important;
  align-items: center;
}

.profilePic{
    margin-left: 3%;
}

.top-content {
  padding: 8% 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.black {
    display: flex;
  color: rgb(0, 0, 0);
  text-shadow: 0 0 10px #abbee6, 0 0 1px #ebe9e9, 0 0 10px #aea7a7,
    0 0 100px rgb(203, 203, 203), 0 0 100px rgb(255, 255, 255),
    0 0 80px rgb(255, 255, 255), 0 0 100px rgb(43, 3, 163),
    0 0 150px rgb(0, 0, 128);
}
</style>