import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./css/style.css";
import "./css/tailwind.css";
import "flowbite";

createApp(App).use(store).use(router).mount("#app");
