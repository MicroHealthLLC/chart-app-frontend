import axios from "axios";
const BASE_URL = process.env.VUE_APP_BASE_API_URL;

export default {
  state: {
    active_report: {
      title: "",
      description: "",
      chart_type: "line",
      data_set: { data: [] },
      tags: [],
      color_scheme_id: 1,
      user: {
        first_name: "",
        last_name: "",
      },
      last_updated_by: "",
      updated_at: "",
    },
    channel_reports: [],
    reports: [],
    latest_reports: {},
    report_loaded: true,
  },
  actions: {
    fetchReports({ commit }) {
      axios({
        method: "GET",
        url: `${BASE_URL}/v1/reports`,
      }).then((res) => {
        commit("SET_REPORTS", res.data);
      });
    },
    fetchReport({ commit }, id) {
      commit("TOGGLE_REPORT_LOADED", false);
      axios({
        method: "GET",
        url: `${BASE_URL}/v1/reports/${id}`,
      })
        .then((res) => {
          commit("SET_ACTIVE_REPORT", res.data);
        })
        .then(() => commit("TOGGLE_REPORT_LOADED", true));
    },
    addReport({ commit }, report) {
      axios({
        method: "POST",
        url: `${BASE_URL}/v1/reports`,
        data: report,
      }).then((res) => {
        commit("SET_ACTIVE_REPORT", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report added successfully!",
        });
        commit("SET_STATUS_CODE", res.status);
      });
    },
    updateReport({ commit }, report) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/v1/reports/${report.id}`,
        data: report,
      }).then((res) => {
        commit("SET_ACTIVE_REPORT", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report updated successfully!",
        });
      });
    },
    deleteReport({ commit }, id) {
      axios({
        method: "DELETE",
        url: `${BASE_URL}/v1/reports/${id}`,
      }).then(() => {
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report successfully deleted.",
        });
      });
    },
  },
  mutations: {
    SET_REPORTS: (state, reports) => (state.reports = reports),
    SET_ACTIVE_REPORT: (state, report) => (state.active_report = report),
    SET_REPORT_DATA_SET: (state, dataSet) =>
      (state.active_report.data_set = dataSet),
    TOGGLE_REPORT_LOADED: (state, isLoaded) => (state.report_loaded = isLoaded),
  },
  getters: {
    activeReport: (state) => state.active_report,
    channelReports: (state) => state.channel_reports,
    reports: (state) => state.reports,
    latestReports: (state) => state.latest_reports,
    reportLoaded: (state) => state.report_loaded,
  },
};
