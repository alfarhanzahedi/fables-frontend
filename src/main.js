import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMoment from "vue-moment";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import "./assets/css/base.css";
import "./assets/css/fonts.css";

Vue.use(VueMoment);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
