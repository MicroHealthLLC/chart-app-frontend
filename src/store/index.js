import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import channelStore from "./modules/channel-store";
import dashboardStore from "./modules/dashboard-store";
import datasetStore from "./modules/dataset-store";
import snackbarStore from "./modules/snackbar-store";
import reportStore from "./modules/report-store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: [],
  },
  actions: {
    fetchTags({ commit }) {
      axios({
        method: "GET",
        url: "http://localhost:3000/v1/tags",
      }).then((res) => {
        commit("SET_TAGS", res.data);
      });
    },
  },
  mutations: {
    SET_TAGS: (state, tags) => (state.tags = tags),
  },
  getters: {
    tags: (state) => state.tags,
  },
  modules: {
    channelStore,
    dashboardStore,
    datasetStore,
    snackbarStore,
    reportStore,
  },
});
