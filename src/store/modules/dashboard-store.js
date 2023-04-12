import { API, graphqlOperation } from "aws-amplify";
import { createDashboard } from "@/graphql/mutations";
import { updateDashboard } from "@/graphql/mutations";
import { deleteDashboard } from "@/graphql/mutations";
import { getDashboard } from "@/graphql/queries";
import { listDashboards } from "@/graphql/queries";

export default {
  state: {
    dashboards: [],
    dashboard: {
      title: "",
      description: "",
      reports: [],
      gauges: [],
      heatMaps: [],
    },
    /* dashboardReports: [],
    dashboardReport: {},
    dashboardGauges: [],
    dashboardGauge: {}, */
  },
  actions: {
    async addDashboard({ commit, dispatch }, dashboard) {
      console.log(dashboard);
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(
          graphqlOperation(createDashboard, { input: dashboard })
        );
        dispatch("fetchDashboards");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Dashboard Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateDashboardById({ commit, dispatch }, dashboard) {
      console.log(dashboard);
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(
          graphqlOperation(updateDashboard, { input: dashboard })
        );
        dispatch("fetchDashboards");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Dashboard Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeDashboard({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteDashboard, { input: id }));
        dispatch("fetchDashboards");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Dashboard Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDashboards({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listDashboards));
        console.log(res.data.listDashboards);
        commit("SET_DASHBOARDS", res.data.listDashboards.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDashboard({ commit }, id) {
      commit("TOGGLE_LOADING", true);
      try {
        const res = await API.graphql(
          graphqlOperation(getDashboard, { id: id })
        );
        if (
          res.data.getDashboard.cards &&
          typeof res.data.getDashboard.cards == "string"
        ) {
          res.data.getDashboard.cards = JSON.parse(res.data.getDashboard.cards);
        }
        commit("SET_DASHBOARD", res.data.getDashboard);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    },

    // manyToMany Dashboard relationships

    /* DashboardReports */
    /* async addDashboardReports({ commit, dispatch }, dashboardReports) {
      console.log(dashboardReports)
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createDashboardReports, { input: dashboardReports }));
        dispatch("fetchDashboardReports");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DashboardReports Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateDashboardReportById({ commit, dispatch }, dashboardReports ) {
      console.log(dashboardReports)
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateDashboardReports, { input: dashboardReports }));
        dispatch("fetchDashboardReports");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DashboardReports Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeDashboardReport({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteDashboardReports, { input: id }));
        dispatch("fetchDashboardReports");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DashboardReports Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDashboardReports({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listDashboardReports));
       console.log(res.data.listDashboardReports)
        commit("SET_DASHBOARD_REPORTS", res.data.listDashboardReports.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDashboardReport({ commit } , id) {
      commit("TOGGLE_LOADING", true);
      try {     
       const res = await API.graphql(graphqlOperation(getDashboardReports, { id: id }));    
        commit("SET_DASHBOARD_REPORT", res.data.getDashboardReports);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    }, */

    /* DashboardGauges */
    /* async addDashboardGauges({ commit, dispatch }, dashboardGauges) {
      console.log(dashboardGauges)
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createDashboardGauges, { input: dashboardGauges }));
        dispatch("fetchDashboardGauges");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DashboardGauges Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateDashboardGaugesById({ commit, dispatch }, dashboardGauges ) {
      console.log(dashboardGauges)
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateDashboardGauges, { input: dashboardGauges }));
        dispatch("fetchDashboardGauges");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DashboardGauges Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeDashboardGauges({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteDashboardGauges, { input: id }));
        dispatch("fetchDashboardGauges");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DashboardGauges Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDashboardGauges({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listDashboardGauges));
       console.log(res.data.listDashboardGauges)
        commit("SET_DASHBOARD_GAUGES", res.data.listDashboardGauges.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDashboardGauge({ commit } , id) {
      commit("TOGGLE_LOADING", true);
      try {     
       const res = await API.graphql(graphqlOperation(getDashboardGauges, { id: id }));    
        commit("SET_DASHBOARD_GAUGE", res.data.getDashboardGauges);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    }, */
  },
  mutations: {
    SET_DASHBOARDS: (state, dashboards) => (state.dashboards = dashboards),
    SET_DASHBOARD: (state, dashboard) => (state.dashboard = dashboard),
    /* SET_DASHBOARD_REPORTS: (state, dashboardReports) => (state.dashboardReports = dashboardReports),
    SET_DASHBOARD_REPORT: (state, dashboardReport) =>
      (state.dashboardReport = dashboardReport),
    SET_DASHBOARD_GAUGES: (state, dashboardGauges) => (state.dashboardGauges = dashboardGauges),
    SET_DASHBOARD_GAUGE: (state, dashboardGauge) =>
      (state.dashboardGauge = dashboardGauge), */
  },
  getters: {
    dashboards: (state) => state.dashboards,
    dashboard: (state) => state.dashboard,
    /* dashboardReports: (state) => state.dashboardReports,
    dashboardReport: (state) => state.dashboardReport,
    dashboardGauges: (state) => state.dashboardGauges,
    dashboardGauge: (state) => state.dashboardGauge, */
  },
};
