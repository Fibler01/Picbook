<script setup>
import { ref, defineProps } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const props = defineProps(["addNewPost"]);
const errorMessage = ref("");
const loading = ref(false);
const visible = ref(false);
const caption = ref("");
const file = ref(null);

const showModal = () => {
  visible.value = true;
};

const handleOk = async (e) => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 100000000000000);
  let filePath
  if (file.value) {
    const { data, error } = await supabase.storage
      .from("images")
      .upload("public/" + fileName, file.value);

    if (error) {
      loading.value = false;
      return (errorMessage.value = "Não foi possível enviar a foto");
    }

    filePath = data.path

    if (data) {
      await supabase.from("posts").insert({
        url: filePath,
        username: user.value.username,
        caption: caption.value,
        owner_id: user.value.id,
      });
      loading.value = false;
      visible.value = false;
      caption.value = "";
      props.addNewPost({
        url: filePath,
        caption: caption.value
      });
    }
  }
};

const handleUploadChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  }
};
</script>
<template>
  <div>
    <a-button class="default-button" @click="showModal">Nova imagem</a-button> <!-- mudar botoes aqui -->

    <a-modal v-model:visible="visible" title="Upload Photo" @ok="handleOk">
      <div v-if="!loading">
        <input type="file" accept=".jpeg,.png" @change="handleUploadChange" />
        <a-input
          v-model:value="caption"
          placeholder="Descrição..."
          :maxLength="50"
        ></a-input>
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

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>