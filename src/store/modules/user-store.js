import axios from "axios";
const BASE_URL = process.env.VUE_APP_BASE_API_URL;

export default {
  state: {
    user: {
      isAuthenticated: false,
    },
  },
  actions: {
    fetchCurrentUser({ commit }, id) {
      axios({
        method: "GET",
        url: `${BASE_URL}/v1/users/${id}`,
      }).then((res) => {
        commit("SET_USER", res.data.user);
      });
    },
  },
  mutations: {
    SET_USER: (state, user) => (state.user = user),
  },
  getters: {
    user: (state) => state.user,
  },
};
