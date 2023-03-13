<script setup>
import {defineProps} from "vue"
import UploadPhotoModal from "./UploadPhotoModal.vue"
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import {useRoute} from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const {username: profileUsername} = route.params;
const { user } = storeToRefs(userStore);
const props = defineProps(['username', 'userInfo'])

</script>

<template>
    <div class="userbar-container">
        <div class="top-content">
            <a-typography-title :level="2">{{ props.username }}</a-typography-title>
            <div v-if="user && profileUsername===user.username">
                <upload-photo-modal />
            </div>
        </div>
        <div class="bottom-content">
            <a-typography-title :level="5">{{props.userInfo.posts}} posts</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.followers}} seguidores</a-typography-title>
            <a-typography-title :level="5">{{props.userInfo.following}} seguindo</a-typography-title>
        </div>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}


</style>