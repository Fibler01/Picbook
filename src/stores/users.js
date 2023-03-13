import { ref } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref("");
  const loading = ref(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => { }

  const handleSignup = async (credentials) => {
    const { email, password, username } = credentials;

    if (password.length < 6) {
      return errorMessage.value = "Senha muito curta"
    }

    if (username.length < 4) {
      return errorMessage.value = "Nome de usuário muito curto"
    }

    if (!validateEmail(email)) {
      return errorMessage.value = "Email inválido"
    } 

    errorMessage.value = ""
    loading.value = true
    const {data: userWithUsername} = await supabase
    .from("users")
    .select()
    .eq('username', username) /* vendo se tem algum usuario que seja igual ao usuario do banco de dados */
    .single() /* single p n retornar um array de resultados, se ele encontrar uma vez ja para */

    const {data: userWithEmail} = await supabase
    .from("users")
    .select()
    .eq('email', email) /* vendo se tem algum usuario que seja igual ao usuario do banco de dados */
    .single()

  
    if(userWithUsername){
      loading.value=false
      return errorMessage.value = "Usuário já registrado com este nome"
    }

    if(userWithEmail){
      loading.value=false
      return errorMessage.value = "Usuário já registrado com este email"
    }

    const {error}= await supabase.auth.signUp({
      email,
      password
    })

    if(error){
      loading.value=false
      return errorMessage.value = error.message;
    }

    await supabase.from("users").insert({
      email,
      username
    })
    loading.value=false
  }

  const handleLogout = () => { }

  const getUser = () => { }

  const clearErrorMessage = () => {
    errorMessage.value = "";
  }

  return { user, errorMessage, loading, handleLogin, handleLogout, handleSignup, getUser, clearErrorMessage }
})
