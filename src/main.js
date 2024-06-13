import { createApp } from "vue";
import { createPinia } from "pinia";
// import axios from "axios";
import App from "./App.vue";
import router from "./router";
import "./asset/main.css";

const app = createApp(App);
const pinia = createPinia();
// Vue.prototype.$http = axios;

app.use(pinia);
app.use(router);

app.mount("#app");
