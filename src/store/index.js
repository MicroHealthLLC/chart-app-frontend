import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import channelStore from "./modules/channel-store";
import dashboardStore from "./modules/dashboard-store";
import datasetStore from "./modules/dataset-store";
import newsStore from "./modules/news-store";
// import snackbarStore from "./modules/snackbar-store";
import reportStore from "./modules/report-store";
// import userStore from "./modules/user-store";
import utilStore from "./modules/util-store";
import auth from "./modules/auth"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status_code: 0,
    snackbar: {
      show: false,
      message: "",
      color: "",
    },
    saving: false,
    loading: false,
    // tags: [],
  },
  // actions: {
  //   fetchTags({ commit }) {
  //     axios({
  //       method: "GET",
  //       url: "http://localhost:3000/v1/tags",
  //     }).then((res) => {
  //       commit("SET_TAGS", res.data);
  //     });
  //   },
  // },
  mutations: {
    SET_SNACKBAR: (state, snackbar) => (state.snackbar = snackbar),
    CLOSE_SNACKBAR: (state) => (state.snackbar.show = false),
    TOGGLE_SAVING: (state, isSaving) => (state.saving = isSaving),
    TOGGLE_LOADING: (state, isLoading) => (state.loading = isLoading),
    SET_STATUS_CODE: (state, code) => (state.status_code = code),
    SET_TAGS: (state, tags) => (state.tags = tags),
  },
  getters: {
    statusCode: (state) => state.status_code,
    // tags: (state) => state.tags, snackbar: (state) => state.snackbar,
    snackbar: (state) => state.snackbar,
    saving: (state) => state.saving,
    loading: (state) => state.loading,
  },
  modules: {
    channelStore,
    dashboardStore,
    datasetStore,
    newsStore,
    // snackbarStore,
    reportStore,
    // userStore,
    utilStore,
    auth
  },
});
