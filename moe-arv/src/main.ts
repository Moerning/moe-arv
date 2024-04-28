import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router';
import Toast from "vue-toastification";
import ToastCloseBtn from './components/common/toast/ToastCloseBtn.vue';
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(router)
app.use(Toast,{
    icon:false,
    closeButton:ToastCloseBtn,
    hideProgressBar: true,
})

app.mount('#app')
