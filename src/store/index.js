import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    channel: {
      title: "",
      category: "public",
      description: "",
      reports: [],
    },
    channels: [],
    channel_reports: [],
    active_data_set: {
      title: "",
      description: "",
      data: [],
    },
    data_sets: [],
    active_report: {
      title: "",
      description: "",
      chart_type: "line",
      data_set: { data: [] },
    },
    reports: [],
    latest_reports: {},
    snackbar: {
      show: false,
      message: "",
    },
  },
  actions: {
    addChannel({ commit, getters }, channel) {
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
    updateChannel({ commit }, channel) {
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
      });
    },
    fetchReports({ commit }) {
      axios({
        method: "GET",
        url: "http://localhost:3000/v1/reports",
      }).then((res) => {
        commit("SET_REPORTS", res.data);
      });
    },
    fetchDataSet({ commit }, id) {
      axios({
        method: "GET",
        url: `http://localhost:3000/v1/data_sets/${id}`,
      }).then((res) => {
        commit("SET_ACTIVE_DATA_SET", res.data);
      });
    },
    fetchDataSets({ commit }) {
      axios({
        method: "GET",
        url: "http://localhost:3000/v1/data_sets",
      }).then((res) => {
        commit("SET_DATA_SETS", res.data);
      });
    },
    addDataSet({ commit }, dataSet) {
      axios({
        method: "POST",
        url: "http://localhost:3000/v1/data_sets",
        data: dataSet,
      }).then((res) => {
        commit("SET_ACTIVE_DATA_SET", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Data Set added successfully!",
        });
      });
    },
    updateDataSet({ commit }, dataSet) {
      axios({
        method: "PATCH",
        url: `http://localhost:3000/v1/data_sets/${dataSet.id}`,
        data: dataSet,
      }).then((res) => {
        commit("SET_ACTIVE_DATA_SET", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Data Set updated successfully!",
        });
      });
    },
    fetchReport({ commit }, id) {
      axios({
        method: "GET",
        url: `http://localhost:3000/v1/reports/${id}`,
      }).then((res) => {
        commit("SET_ACTIVE_REPORT", res.data);
      });
    },
    addReport({ commit }, report) {
      axios({
        method: "POST",
        url: "http://localhost:3000/v1/reports",
        data: report,
      }).then((res) => {
        commit("SET_ACTIVE_REPORT", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report added successfully!",
        });
      });
    },
    updateReport({ commit }, report) {
      axios({
        method: "PATCH",
        url: `http://localhost:3000/v1/reports/${report.id}`,
        data: report,
      }).then((res) => {
        commit("SET_ACTIVE_REPORT", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report updated successfully!",
        });
      });
    },
  },
  mutations: {
    SET_CHANNEL: (state, channel) => (state.channel = channel),
    SET_CHANNELS: (state, channels) => (state.channels = channels),
    SET_REPORTS: (state, reports) => (state.reports = reports),
    SET_ACTIVE_DATA_SET: (state, dataSet) => (state.active_data_set = dataSet),
    SET_ACTIVE_REPORT: (state, report) => (state.active_report = report),
    SET_DATA_SETS: (state, dataSets) => (state.data_sets = dataSets),
    SET_REPORT_DATA_SET: (state, dataSet) =>
      (state.active_report.data_set = dataSet),
    SET_SNACKBAR: (state, snackbar) => (state.snackbar = snackbar),
    CLOSE_SNACKBAR: (state) => (state.snackbar.show = false),
  },
  getters: {
    channel: (state) => state.channel,
    channels: (state) => state.channels,
    channelReports: (state) => state.channel_reports,
    activeDataSet: (state) => state.active_data_set,
    dataSets: (state) => state.data_sets,
    activeReport: (state) => state.active_report,
    reports: (state) => state.reports,
    latestReports: (state) => state.latest_reports,
    snackbar: (state) => state.snackbar,
  },
  modules: {},
});
