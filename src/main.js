import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import sso_config from "./sso-exports"
import sso_config from "./aws-exports"
import { Amplify } from "aws-amplify";
// import axios from "axios";

// amplify pull
// amplify add api (for graphQL schema)
// ampllify add auth (to set up cognito resources)
Amplify.configure(sso_config);

// axios.interceptors.request.use(
//   function (config) {
//     config.headers.Authorization = `Bearer ${localStorage.getItem(
//       "mRmsToken"
//     )}`;
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,

  render: function (h) {
    return h(App);
  },
}).$mount("#app");
