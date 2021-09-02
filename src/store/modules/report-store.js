import axios from "axios";

export default {
  state: {
    active_report: {
      title: "",
      description: "",
      chart_type: "line",
      data_set: { data: [] },
      tags: [],
      color_scheme_id: 1,
    },
    channel_reports: [],
    reports: [],
    latest_reports: {},
  },
  actions: {
    fetchReports({ commit }) {
      axios({
        method: "GET",
        url: "http://localhost:3000/v1/reports",
      }).then((res) => {
        commit("SET_REPORTS", res.data);
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
        commit("SET_STATUS_CODE", res.status);
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
    deleteReport({ commit }, id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3000/v1/reports/${id}`,
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
  },
  getters: {
    activeReport: (state) => state.active_report,
    channelReports: (state) => state.channel_reports,
    reports: (state) => state.reports,
    latestReports: (state) => state.latest_reports,
  },
};