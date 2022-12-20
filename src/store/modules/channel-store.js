import { API, graphqlOperation } from "aws-amplify";
import { createChannel } from "@/graphql/mutations";
import { createCurrentChannel } from "@/graphql/mutations";
import { updateChannel } from "@/graphql/mutations";
import { updateCurrentChannel } from "@/graphql/mutations";
import { deleteChannel } from "@/graphql/mutations";
import { deleteCurrentChannel } from "@/graphql/mutations";
// import { getCurrentChannel } from "@/graphql/queries";
import { getChannel } from "@/graphql/queries";
import { listChannels } from "@/graphql/queries";
import { listCurrentChannels } from "@/graphql/queries";

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
    channelType:{},
    current_channel: {},
    current_channels: [],
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
    // currrentChannel Work
    async setCurrentChannel({ commit, dispatch }, current_channel) {
      console.log(current_channel);
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createCurrentChannel, { input: current_channel }));
        dispatch("fetchCurrentChannels");
        // commit("SET_SNACKBAR", {
        //   show: true,
        //   message: "Channel Successfully Added!",
        //   color: "var(--mh-green)",
        // });
      } catch (error) {
        console.log("loser");
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateCurrentChannelById({ commit, dispatch }, current_channel ) {
      console.log(current_channel);
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateCurrentChannel, { input: current_channel }));
        dispatch("fetchCurrentChannels");
        // commit("SET_SNACKBAR", {
        //   show: true,
        //   message: "Channel Successfully Updated!",
        //   color: "var(--mh-green)",
        // });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeCurrentChannel({ dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteCurrentChannel, { input: id }));
        dispatch("fetchCurrentChannels");
        // commit("SET_SNACKBAR", {
        //   show: true,
        //   message: "Channel Successfully Removed",
        //   color: "var(--mh-orange)",
        // });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCurrentChannels({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listCurrentChannels));
        commit("SET_CURRENT_CHANNELS", res.data.listCurrentChannels.items);
      } catch (error) {
        console.log(error);
      }
    },
    // End currentChannel Actions
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
    //currentChannel
    ADD_CURRENT_CHANNEL: (state, current_channel) => state.current_channels.push(current_channel),
    SET_CURRENT_CHANNEL: (state, current_channel) => (state.current_channel = current_channel),
    SET_CURRENT_CHANNELS: (state, current_channels) => (state.current_channels = current_channels),
  },
  getters: {
    channels: (state) => state.channels,  
    channel: (state) => state.channel, 
    // Channel Types
    channelTypes: (state) => state.channelTypes,  
    channelType: (state) => state.channelType, 
    currenttChannel: (state) => state.current_channel,
    currentChannels: (state) => state.current_channels
  },
};


