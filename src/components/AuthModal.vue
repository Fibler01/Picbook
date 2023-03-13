<script setup>
import { defineComponent, ref, defineProps, reactive } from "vue";
import {useUserStore} from "../stores/users"
import {storeToRefs} from "pinia" /* para listening da mensagem de erro */

const userStore = useUserStore();

const { errorMessage } = storeToRefs(userStore);  /* pegando o errorMessage e handleSignup e as atribuindo para duas novas variaveis com o mesmo nome */
const props = defineProps(['isLogin']);
const visible = ref(false);

const userCredentials = reactive({ /* vue monitora e reage a qualquer mudança feita nesse objeto */
  email: "",
  password: "",
  username: ""
})

const showModal = () => {
  visible.value = true;
};

const handleOk = (e) => {
  userStore.handleSignup(userCredentials);
};

const handleCancel = (e) => {
  visible.value = false; /* para fechar modal */
  userStore.clearErrorMessage();
};

const title = props.isLogin ? 'Entrar' : 'Cadastrar';

</script>

<template>
{{userCredentials.username}}
  <div>
    <a-button type="primary" @click="showModal" class="btn">{{ title }}</a-button>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel()">Cancelar</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk()">Ok</a-button>
      </template>
      <a-input class="custom-input" v-if="isLogin==false" v-model:value="userCredentials.username" placeholder="Nome de usuário" />
      <a-input class="custom-input" v-model:value="userCredentials.email" placeholder="Email" />
      <a-input class="custom-input" v-model:value="userCredentials.password" placeholder="Senha" type="password" />
      <a-typography-text v-if="errorMessage" type="danger">{{ errorMessage }}</a-typography-text>
    </a-modal>
  </div>
</template>

<style scoped>
.btn {
    margin-left: 10px;
}

.custom-input{
    margin-top: 5px;
}


</style>


