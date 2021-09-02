import axios from "axios";

export default {
  state: {
    channel: {
      title: "",
      category: "public",
      description: "",
      reports: [],
    },
    channels: [],
  },
  actions: {
    addChannel({ commit, dispatch, getters }, channel) {
      axios({
        method: "POST",
        url: "http://localhost:3000/v1/channels",
        data: channel,
      }).then((res) => {
        commit("SET_CHANNEL", res.data);
        commit("SET_CHANNELS", [...getters.channels, res.data]);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Channel added successfully!",
        });
        // Used to update changes made necessary for sidebar
        dispatch("fetchChannels");
      });
    },
    fetchChannel({ commit }, id) {
      axios({
        method: "GET",
        url: `http://localhost:3000/v1/channels/${id}`,
      })
        .then((res) => {
          commit("SET_CHANNEL", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchChannels({ commit }) {
      axios({
        method: "GET",
        url: "http://localhost:3000/v1/channels",
      })
        .then((res) => {
          commit("SET_CHANNELS", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateChannel({ commit, dispatch }, channel) {
      axios({
        method: "PATCH",
        url: `http://localhost:3000/v1/channels/${channel.id}`,
        data: channel,
      }).then((res) => {
        commit("SET_CHANNEL", res.data);
        // TODO: Update state.channels for Sidebar
        // commit("SET_CHANNELS", [...getters.channels, res.data]);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Channel updated successfully!",
        });
        // Used to update changes made necessary for sidebar
        dispatch("fetchChannels");
      });
    },
  },
  mutations: {
    SET_CHANNEL: (state, channel) => (state.channel = channel),
    SET_CHANNELS: (state, channels) => (state.channels = channels),
  },
  getters: {
    channel: (state) => state.channel,
    channels: (state) => state.channels,
  },
};