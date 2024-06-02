import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // 引入Vuetify的样式
import '@mdi/font/css/materialdesignicons.css'; // 引入mdi图标库
import './assets/styles/global.css';

  // 创建Vuetify实例
  const vuetify = createVuetify({
    // 可以在这里添加更多全局配置
  });

  
const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')