import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "../supabase"

export const useCheckScreen = defineStore('checkScreen', () => {

  const isSmallScreen = ref(false);


  const checkScreenSize = () => {
    console.log("ENTROU NA CHECAGEM DE TELA");
    if (window.innerWidth < 800) {
      isSmallScreen.value = true;
      console.log(isSmallScreen.value);
    }
    else isSmallScreen.value=false;
    /* state.isSmallScreen = window.innerWidth < 1000; */
  };
  
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  return { isSmallScreen }
})
