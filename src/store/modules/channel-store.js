import { API, graphqlOperation } from "aws-amplify";
import { createChannel } from "@/graphql/mutations";
import { updateChannel } from "@/graphql/mutations";
import { deleteChannel } from "@/graphql/mutations";
import { getChannel } from "@/graphql/queries";
import { listChannels } from "@/graphql/queries";

import { createChannelType } from "@/graphql/mutations";
import { updateChannelType } from "@/graphql/mutations";
import { deleteChannelType } from "@/graphql/mutations";
import { getChannelType } from "@/graphql/queries";
import { listChannelTypes } from "@/graphql/queries";


export default {
  state: {
    channels: [],
    channel: {},
    channelTypes: [],
    channelType:{}
  },
  actions: {
    async addChannel({ commit, dispatch }, channel) {
      console.log(channel);
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
        console.log("loser");
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateChannelById({ commit, dispatch }, channel ) {
      console.log(channel);
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
    async fetchChannel({ commit }, id) {
      console.log(id);
      try {     
       const res = await API.graphql(graphqlOperation(getChannel, { id: id }));
        commit("SET_CHANNEL", res.data.getChannel);
        console.log(res.data.getChannel);
      } catch (error) {
        console.log(error);
      }
    },
//Channel Types
    async addChannelType({ commit, dispatch }, channelType) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createChannelType, { input: channelType }));
        dispatch("fetchChannelTypes");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Channel Type Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
        console.log("dummy");
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateChannelTypeById({ commit, dispatch }, channelType ) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateChannelType, { input: channelType }));
        dispatch("fetchChannelTypes");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Channel Type Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeChannelType({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteChannelType, { input: id }));
        dispatch("fetchChannelTypes");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Channel Type Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchChannelTypes({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listChannelTypes));
        commit("SET_CHANNEL_TYPES", res.data.listChannelTypes.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchChannelType({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(getChannelType));
        commit("SET_CHANNEL_TYPE", res.data.getChannelType);
        console.log(res.data.getChannelType);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_CHANNEL: (state, channel) => state.channels.push(channel),
    SET_CHANNELS: (state, channels) => (state.channels = channels),
    SET_CHANNEL: (state, channel) => (state.channel = channel),
    // Channel Types
    ADD_CHANNEL_TYPE: (state, channelType) => state.channelTypes.push(channelType),
    SET_CHANNEL_TYPES: (state, channelTypes) => (state.channelTypes = channelTypes),
    SET_CHANNEL_TYPE: (state, channelType) => (state.channelType = channelType),
  },
  getters: {
    channels: (state) => state.channels,  
    channel: (state) => state.channel, 
    // Channel Types
    channelTypes: (state) => state.channelTypes,  
    channelType: (state) => state.channelType, 
  },
};


