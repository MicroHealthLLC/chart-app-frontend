import axios from "axios";
const BASE_URL = process.env.VUE_APP_BASE_API_URL;

export default {
  state: {
    active_data_set: {
      title: "",
      description: "",
      data: [],
      channels: [],
      user: {
        first_name: "",
        last_name: "",
      },
    },
    data_sets: [],
    channel_data_sets: [],
  },
  actions: {
    fetchDataSet({ commit }, id) {
      axios({
        method: "GET",
        url: `${BASE_URL}/v1/data_sets/${id}`,
      }).then((res) => {
        commit("SET_ACTIVE_DATA_SET", res.data);
      });
    },
    fetchDataSets({ commit }) {
      axios({
        method: "GET",
        url: `${BASE_URL}/v1/data_sets`,
      }).then((res) => {
        commit("SET_DATA_SETS", res.data);
      });
    },
    fetchChannelDataSets({ commit }, id) {
      axios({
        method: "GET",
        url: `${BASE_URL}/v1/channels/${id}/data_sets`,
      }).then((res) => {
        commit("SET_CHANNEL_DATA_SETS", res.data);
      });
    },
    addDataSet({ commit }, dataSet) {
      axios({
        method: "POST",
        url: `${BASE_URL}/v1/data_sets`,
        data: dataSet,
      }).then((res) => {
        commit("SET_ACTIVE_DATA_SET", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Data Set added successfully!",
        });
        commit("SET_STATUS_CODE", res.status);
      });
    },
    updateDataSet({ commit }, dataSet) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/v1/data_sets/${dataSet.id}`,
        data: dataSet,
      }).then((res) => {
        commit("SET_ACTIVE_DATA_SET", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Data Set updated successfully!",
        });
      });
    },
  },
  mutations: {
    SET_ACTIVE_DATA_SET: (state, dataSet) => (state.active_data_set = dataSet),
    SET_DATA_SETS: (state, dataSets) => (state.data_sets = dataSets),
    SET_CHANNEL_DATA_SETS: (state, dataSets) =>
      (state.channel_data_sets = dataSets),
  },
  getters: {
    activeDataSet: (state) => state.active_data_set,
    dataSets: (state) => state.data_sets,
    channelDataSets: (state) => state.channel_data_sets,
  },
};
