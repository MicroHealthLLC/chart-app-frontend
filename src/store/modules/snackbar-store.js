export default {
  state: {
    snackbar: {
      show: false,
      message: "",
    },
  },
  actions: {},
  mutations: {
    SET_SNACKBAR: (state, snackbar) => (state.snackbar = snackbar),
    CLOSE_SNACKBAR: (state) => (state.snackbar.show = false),
  },
  getters: { snackbar: (state) => state.snackbar },
};
