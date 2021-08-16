import axios from "axios";

export default {
  state: {
    dashboards: [],
    active_dashboard: {
      title: "",
      description: "",
      reports: [],
      tags: [],
      layout: "layout-1",
    },
  },
  actions: {
    fetchDashboards({ commit }) {
      axios({
        method: "GET",
        url: "http://localhost:3000/v1/dashboards",
      }).then((res) => {
        commit("SET_DASHBOARDS", res.data);
      });
    },
    fetchDashboard({ commit }, id) {
      axios({
        method: "GET",
        url: `http://localhost:3000/v1/dashboards/${id}`,
      }).then((res) => {
        commit("SET_ACTIVE_DASHBOARD", res.data);
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
