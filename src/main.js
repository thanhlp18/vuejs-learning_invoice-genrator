import './assets/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueHtmlToPaper from 'vue-html-to-paper'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.use(VueHtmlToPaper)

app.mount('#app')
