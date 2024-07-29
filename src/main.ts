import './assets/css/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ButtonCustom from './components/controls/ButtonCustom.vue'
import CheckboxCustom from './components/controls/CheckboxCustom.vue'
import InputCustom from './components/controls/InputCustom.vue'


const app = createApp(App)

app.component('ButtonCustom', ButtonCustom)
app.component('CheckboxCustom', CheckboxCustom)
app.component('InputCustom', InputCustom)

app.use(createPinia())
app.use(router)

app.mount('#app')
