import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from "../supabase"

export const useCheckScreen = defineStore('checkScreen', () => {

  const isSmallScreen = ref(false);
  const isVerySmallScreen = ref(false);


  const checkScreenSize = () => {
    if (window.innerWidth < 900 && window.innerWidth > 750) {
      isSmallScreen.value = true;
      isVerySmallScreen.value = false;
    }
    else if (window.innerWidth < 750) {
      isSmallScreen.value = false;
      isVerySmallScreen.value = true
    }
    else {
      isVerySmallScreen.value = false;
      isSmallScreen.value = false;
    }
  };

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  return { isSmallScreen, isVerySmallScreen }
})
