<script setup>
import {defineProps} from "vue"
import UploadPhotoModal from "./UploadPhotoModal.vue"
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import {useRoute} from "vue-router";
import { supabase } from "../supabase"

const userStore = useUserStore();
const route = useRoute();
const {username: profileUsername} = route.params;
const { user } = storeToRefs(userStore);
const props = defineProps(['user', 'userInfo', 'addNewPost', 'isFollowing', 'updateIsFollowing'])

const followUser = async () => {
    props.updateIsFollowing(true)
    await supabase.from("followers_following").insert({
        follower_id: user.value.id, 
        following_id: props.user.id /* voce que apertou para seguir */
    })
}

const unfollowUser = async () => {
    props.updateIsFollowing(false)
    await supabase.from("followers_following").delete().eq("follower_id", user.value.id).eq("following_id", props.user.id)
}


</script>

<template>
    <div class="userbar-container" v-if="props.user">
        <div class="top-content">
            <a-typography-title class="black" :level="2">{{ props.user.username }}</a-typography-title>
                <div v-if="user">
                    <upload-photo-modal v-if="user && profileUsername===user.username"
                    :addNewPost="addNewPost"
                 />
                 <div v-else>
                 <a-button v-if="!props.isFollowing" @click="followUser">Seguir</a-button>
                 <a-button v-else @click="unfollowUser">Seguindo</a-button>
                 </div>
                </div>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{props.userInfo.posts}} posts</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.followers}} seguidores</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.following}} seguindo</a-typography-title>
        </div>
    </div>
    <div class="userbar-container" v-else>
        <a-typography-title :level="2">Usuário não encontrado</a-typography-title>
    </div>
</template>

<style scoped>
.userbar-container {
    padding-bottom: 75px;
}

.bottom-content {
    display: flex;
    align-items: center;
}

.bottom-content h5 {
    margin: 0 !important;
    padding: 0;
    margin-right: 30px !important;
    align-items: center;
}

.top-content{
    padding: 8% 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
}

.black{
    color: rgb(0, 0, 0);
    text-shadow: 0 0 10px #fff, 0 0 1px #fff, 0 0 10px #fff, 0 0 100px rgb(0, 0, 0), 0 0 100px rgb(255, 255, 255), 0 0 80px rgb(255, 255, 255), 0 0 100px rgb(43, 3, 163), 0 0 150px rgb(0, 0, 128);
}


</style>