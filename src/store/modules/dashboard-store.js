import axios from "axios";
const BASE_URL = process.env.VUE_APP_BASE_API_URL;

export default {
  state: {
    dashboards: [],
    active_dashboard: {
      title: "",
      description: "",
      reports: [],
      tags: [],
      layout: "layout-1",
      user: {
        first_name: "",
        last_name: "",
      },
      last_updated_by: "",
      updated_at: "",
    },
  },
  actions: {
    fetchDashboards({ commit }) {
      axios({
        method: "GET",
        url: `${BASE_URL}/v1/dashboards`,
      }).then((res) => {
        commit("SET_DASHBOARDS", res.data);
      });
    },
    fetchDashboard({ commit }, id) {
      axios({
        method: "GET",
        url: `${BASE_URL}/v1/dashboards/${id}`,
      }).then((res) => {
        commit("SET_ACTIVE_DASHBOARD", res.data);
      });
    },
    addDashboard({ commit }, dashboard) {
      axios({
        method: "POST",
        url: `${BASE_URL}/v1/dashboards`,
        data: dashboard,
      }).then((res) => {
        commit("SET_ACTIVE_DASHBOARD", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Dashboard added successfully!",
        });
        commit("SET_STATUS_CODE", res.status);
      });
    },
    updateDashboard({ commit }, dashboard) {
      axios({
        method: "PATCH",
        url: `${BASE_URL}/v1/dashboards/${dashboard.id}`,
        data: dashboard,
      }).then((res) => {
        commit("SET_ACTIVE_DASHBOARD", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Dashboard updated successfully!",
        });
      });
    },
    deleteDashboard({ commit }, id) {
      axios({
        method: "DELETE",
        url: `${BASE_URL}/v1/dashboards/${id}`,
      }).then(() => {
        commit("SET_SNACKBAR", {
          show: true,
          message: "Dashboard successfully deleted.",
        });
      });
    },
  },
  mutations: {
    SET_DASHBOARDS: (state, dashboards) => (state.dashboards = dashboards),
    SET_ACTIVE_DASHBOARD: (state, dashboard) =>
      (state.active_dashboard = dashboard),
  },
  getters: {
    dashboards: (state) => state.dashboards,
    activeDashboard: (state) => state.active_dashboard,
  },
};
