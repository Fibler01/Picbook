import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "../supabase"

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref("")
  const loading = ref(false)
  const loadingUser = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (credentials) => {
    const { email, password } = credentials
    if (!validateEmail(email)) {
      return errorMessage.value = "Email inválido"
    }

    if (!password.length) {
      return errorMessage.value = "Senha não pode ser vazia"
    }

    loading.value = true

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      loading.value = false
      console.log(error.status);
      if (error.status == 400) {
        return errorMessage.value = "Email e/ou senha inválidos";
      }
      return errorMessage.value = error.message;
    }
     
      const { data: existingUser } = await supabase
        .from("users")
        .select()
        .eq('email', email)
        .single()

      user.value = {
        email: existingUser.email,
        username: existingUser.username,
        id: existingUser.id
      }
      loading.value = false;
      errorMessage.value = "";

  }

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

    const { data: userWithUsername } = await supabase
      .from("users")
      .select()
      .eq('username', username) /* vendo se tem algum usuario que seja igual ao usuario do banco de dados */
      .single() /* single p n retornar um array de resultados, se ele encontrar uma vez ja para */

    const { data: userWithEmail } = await supabase
      .from("users")
      .select()
      .eq('email', email) /* vendo se tem algum usuario que seja igual ao usuario do banco de dados */
      .single()


    if (userWithUsername) {
      loading.value = false
      return errorMessage.value = "Usuário já registrado com este nome"
    }

    if (userWithEmail) {
      loading.value = false
      return errorMessage.value = "Usuário já registrado com este email"
    }

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      loading.value = false
      return errorMessage.value = error.message;
    }

    await supabase.from("users").insert({
      email,
      username
    });

    const { data: newUser } = await supabase
      .from("users")
      .select()
      .eq('email', email)
      .single()

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

    loading.value = false
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    user.value = null
   }

  const getUser = async () => {
    loadingUser.value=true;
    const {data}= await supabase.auth.getUser() /* supabase decoda o jwt do token do navegador, e ve o email da sessao e deixa o navegador logado neste mesmo email (persistencia do login) */
    if(!data.user) {
      loadingUser.value = false;
      return user.value = null
    }
    const {data: userWithEmail} = await supabase
    .from("users")
    .select()
    .eq('email', data.user.email)
    .single()

    user.value = {
      username: userWithEmail.username,
      email: userWithEmail.email,
      id: userWithEmail.id,
      profilePic: userWithEmail.profilePic
    }

    loadingUser.value = false;
   }

  const clearErrorMessage = () => {
    errorMessage.value = "";
  }

  return { user, errorMessage, loading, loadingUser, user, handleLogin, handleLogout, handleSignup, getUser, clearErrorMessage }
})
