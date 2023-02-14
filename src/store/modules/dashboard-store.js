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
      heatMaps: []
    },
  },
  actions: {
    async addDashboard({ commit, dispatch }, dashboard) {
      console.log(dashboard)
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createDashboard, { input: dashboard }));
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
    async updateDashboardById({ commit, dispatch }, dashboard ) {
      console.log(dashboard)
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateDashboard, { input: dashboard }));
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
       console.log(res.data.listDashboards)
        commit("SET_DASHBOARDS", res.data.listDashboards.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDashboard({ commit } , id) {
      commit("TOGGLE_LOADING", true);
      try {     
       const res = await API.graphql(graphqlOperation(getDashboard, { id: id }));    
        commit("SET_DASHBOARD", res.data.getDashboard);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    },
  },
  mutations: {
    SET_DASHBOARDS: (state, dashboards) => (state.dashboards = dashboards),
    SET_DASHBOARD: (state, dashboard) =>
      (state.dashboard = dashboard),
  },
  getters: {
    dashboards: (state) => state.dashboards,
    dashboard: (state) => state.dashboard,
  },
};
