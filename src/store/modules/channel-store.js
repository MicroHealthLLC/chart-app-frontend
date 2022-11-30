import { API, graphqlOperation } from "aws-amplify";
import { createChannel } from "@/graphql/mutations";
import { updateChannel } from "@/graphql/mutations";
import { deleteChannel } from "@/graphql/mutations";
import { getChannel } from "@/graphql/queries";
import { listChannels } from "@/graphql/queries";


export default {
  state: {
    channels: [],
    channel: {},
  },
  actions: {
    async addChannel({ commit, dispatch }, channel) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createChannel, { input: channel }));
        dispatch("fetchChannels");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Channel Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateChannelById({ commit, dispatch }, channel ) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateChannel, { input: channel }));
        dispatch("fetchChannels");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Channel Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeChannel({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteChannel, { input: id }));
        dispatch("fetchChannels");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Channel Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchChannels({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listChannels));
        commit("SET_CHANNELS", res.data.listChannels.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchChannel({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(getChannel));
        commit("SET_CHANNEL", res.data.getChannel);
        console.log(res.data.getChannel);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_CHANNEL: (state, channel) => state.channels.push(channel),
    SET_CHANNELS: (state, channels) => (state.channels = channels),
    SET_CHANNEL: (state, channel) => (state.channel = channel),
  },
  getters: {
    channels: (state) => state.channels,  
    channel: (state) => state.channel, 
  },
};


