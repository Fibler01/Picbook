<script setup>
import { defineComponent, ref, defineProps, reactive } from "vue";
import {useUserStore} from "../stores/users"
import {storeToRefs} from "pinia" /* para listening da mensagem de erro */

const userStore = useUserStore();

const { errorMessage, loading, user } = storeToRefs(userStore);  /* pegando o errorMessage e handleSignup e as atribuindo para duas novas variaveis com o mesmo nome */

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

const handleOk = async (e) => {
  if(props.isLogin){
    await userStore.handleLogin({
      email: userCredentials.email,
      password: userCredentials.password
    });
  }
  else{
  await userStore.handleSignup(userCredentials); /* para esperar acontecer o signup */
  }
  if(user.value){
    console.log("USUARIO TEM VALOR")
    clearUserCredentialsInput();
    visible.value = false;
    }
  
};

const clearUserCredentialsInput = () => {
  userCredentials.email = "";
    userCredentials.password = "";
    userCredentials.username = "";
    userStore.clearErrorMessage();
}

const handleCancel = (e) => {
  clearUserCredentialsInput();
  visible.value = false; /* para fechar modal */
};

const title = props.isLogin ? 'Entrar' : 'Cadastrar';

</script>

<template>
  <div>
    <a-button @click="showModal" class="btn">{{ title }}</a-button>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <template #footer>
        <a-button class="default-button" key="back" @click="handleCancel()">Cancelar</a-button>
        <a-button class="default-button" :disabled="loading" key="submit" :loading="loading" @click="handleOk()">Ok</a-button>
      </template>
      <div v-if="!loading" class="input-container">
        <a-input class="custom-input" v-if="isLogin==false" v-model:value="userCredentials.username" placeholder="Nome de usuário" />
        <a-input class="custom-input" v-model:value="userCredentials.email" placeholder="Email" />
        <a-input class="custom-input" v-model:value="userCredentials.password" placeholder="Senha" type="password" />
      </div>
        <div v-else class="spinner">
          <a-spin />
        </div>
      <a-typography-text v-if="errorMessage" type="danger">{{ errorMessage }}</a-typography-text>
    </a-modal>
  </div>
</template>

<style scoped>
.btn {
    margin-left: 10px;
    background-color: rgb(170, 67, 218);
    border-color: rgb(170, 67, 218);
    border-radius: 3px;
    color: aliceblue;
}

.btn :hover{
    border-color: rgb(75, 0, 110);
  }

.custom-input{
    margin-top: 5px;
}
.input-container{
  height: 120px;
}

.spinner{
  display: flex;
  align-content: center;
  justify-content: center;
  height: 120px;
}


</style>


