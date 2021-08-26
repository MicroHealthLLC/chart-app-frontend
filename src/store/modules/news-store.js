import axios from "axios";

export default {
  state: {
    news: [],
  },
  actions: {
    fetchNews({ commit }) {
      axios({
        method: "GET",
        url: "http://localhost:3000/v1/news",
      }).then((res) => {
        commit("SET_NEWS", res.data);
      });
    },
  },
  mutations: {
    SET_NEWS: (state, news) => (state.news = news),
  },
  getters: { news: (state) => state.news },
};
