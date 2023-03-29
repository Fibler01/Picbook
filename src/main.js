import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from "ant-design-vue"
import App from './App.vue'
import router from './router'
import "ant-design-vue/dist/antd.css"

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faArrowRightFromBracket, faUserPen } from '@fortawesome/free-solid-svg-icons'



import './assets/main.css'

/* add icons to the library */
library.add(faArrowRightFromBracket, faUserPen)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(Antd)
app.use(router)

app.mount('#app')
