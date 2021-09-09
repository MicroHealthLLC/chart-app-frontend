import axios from "axios";
const BASE_URL = process.env.VUE_APP_BASE_API_URL;

export default {
  state: {
    news: [],
    activeNews: {
      title: "",
      body: "",
    },
  },
  actions: {
    fetchNews({ commit }) {
      axios({
        method: "GET",
        url: `${BASE_URL}/v1/news`,
      }).then((res) => {
        commit("SET_NEWS", res.data);
      });
    },
    addNews({ commit }, news) {
      axios({
        method: "POST",
        url: `${BASE_URL}/v1/news`,
        data: news,
      }).then((res) => {
        commit("ADD_NEWS", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "News added successfully!",
        });
      });
    },
    updateNews({ commit }, news) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/v1/news/${news.id}`,
        data: news,
      }).then((res) => {
        commit("UPDATE_NEWS", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "News updated successfully!",
        });
      });
    },
    deleteNews({ commit }, id) {
      axios({
        method: "DELETE",
        url: `${BASE_URL}/v1/news/${id}`,
      }).then(() => {
        commit("DELETE_NEWS", id);
        commit("SET_SNACKBAR", {
          show: true,
          message: "News successfully deleted.",
        });
      });
    },
  },
  mutations: {
    SET_NEWS: (state, news) => (state.news = news),
    SET_ACTIVE_NEWS: (state, news) => (state.activeNews = news),
    ADD_NEWS: (state, news) => state.news.unshift(news),
    UPDATE_NEWS: (state, news) => {
      let index = state.news.findIndex(
        (newsReport) => newsReport.id == news.id
      );
      state.news[index] = news;
    },
    DELETE_NEWS: (state, id) => {
      let index = state.news.findIndex((newsReport) => newsReport.id == id);
      state.news.splice(index, 1);
    },
  },
  getters: {
    news: (state) => state.news,
    activeNews: (state) => state.activeNews,
  },
};
