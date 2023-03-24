<script setup>
import { ref, defineProps, onMounted } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { useCheckScreen } from "../stores/checkScreen";

const checkScreen = useCheckScreen();
const { isSmallScreen, isVerySmallScreen } = storeToRefs(checkScreen);

const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const props = defineProps(["addNewPost", "previousProfilePic", "user", "profileUsername"]);
const errorMessage = ref("");
const loading = ref(false);
const visible = ref(false);
const caption = ref("");
const file = ref(null);

const { VITE_BASE_PHOTO_URL } = import.meta.env;

const showModal = () => {
  visible.value = true;
};

const deletePreviousProfilePic = async () => {
  if (props.previousProfilePic) { /* remove(VITE_BASE_PHOTO_URL + props.previousProfilePic); */
    try {
      const { data, error } = await supabase.storage.from('images').remove([props.previousProfilePic])
      console.log(data);

      if (error) {
        console.log("Erro ao apagar imagem:", error.message);
      } else {
        console.log("Imagem apagada com sucesso:", props.previousProfilePic);
      }
    } catch (error) {
      console.log("Erro ao apagar imagem:", error.message);
    }
  }
};

const handleOk = async (e) => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 100000000000000);
  let filePath;
  if (file.value) {
    const { data, error } = await supabase.storage
      .from("images")
      .upload("public/" + fileName, file.value);

    if (error) {
      loading.value = false;
      return (errorMessage.value = "Não foi possível enviar a foto");
    }

    filePath = data.path;

    if (data) {
      await deletePreviousProfilePic();
      /* apagar imagem anterior */
      await supabase
        .from("users")
        .update({
          profilePic: filePath,
        })
        .eq("id", user.value.id);

      loading.value = false;
      visible.value = false;
      caption.value = "";
    }
  }
};

onMounted(() => {
  console.log(props.previousProfilePic);
  console.log(props.user);
  
});

const handleUploadChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  }
};
</script>
<template>
  <div :class="{ 'flexing': !isVerySmallScreen, 'flexing-mini': isVerySmallScreen }">
    <div v-if="user && props.profileUsername === user.username">
    <img v-if="props.previousProfilePic" @click="showModal" :class="{ 'img': !isVerySmallScreen, 'img-mini': isVerySmallScreen }"
          :src="`${VITE_BASE_PHOTO_URL}${props.previousProfilePic}`"
      />
      <img v-else @click="showModal" :class="{ 'img': !isVerySmallScreen, 'img-mini': isVerySmallScreen }"
          src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
      />
    </div>
    
    <div v-else>
    <img v-if="props.previousProfilePic" :class="{ 'img': !isVerySmallScreen, 'img-mini': isVerySmallScreen }"
          :src="`${VITE_BASE_PHOTO_URL}${props.previousProfilePic}`"
      />
    </div>
    <!-- <a-button v-else type="primary" @click="showModal">Nova imagem</a-button> -->

    <a-modal cancelText="Cancelar" v-model:visible="visible" title="Enviar foto" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg,.png" @change="handleUploadChange" />
        <a-typography v-if="errorMessage" type="danger">{{
          errorMessage
        }}</a-typography>
      </div>
      <div v-else>
        <a-spin />
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}

.img-mini{
    width: 30%;
    height: 30%;
    border-radius: 40%;
}

.flexing{
  position: absolute;
  left: 8%;
}

.flexing-mini{
  position: absolute;
  left: 18%;
}

.img{
    width: 20%;
    height: 20%;
    border-radius: 40%;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>