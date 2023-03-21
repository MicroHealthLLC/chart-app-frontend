import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ElementUI from "element-ui";
import VueFullscreen from 'vue-fullscreen'
import VueExcelEditor from 'vue-excel-editor'



import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, { locale });
Vue.use(VueFullscreen)
Vue.use(VueExcelEditor)
// import sso_config from "./sso-exports"
import aws_config from "./aws-exports";
import { Amplify } from "aws-amplify";

// amplify pull
// amplify add api (for graphQL schema)
// ampllify add auth (to set up cognito resources)
Amplify.configure(aws_config);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  ElementUI,

  render: function (h) {
    return h(App);
  },
}).$mount("#app");
