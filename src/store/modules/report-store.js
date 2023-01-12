import { API, graphqlOperation } from "aws-amplify";
import { createReport } from "@/graphql/mutations";
import { updateReport } from "@/graphql/mutations";
import { deleteReport } from "@/graphql/mutations";
import { getReport } from "@/graphql/queries";
import { listReports } from "@/graphql/queries";
import { createReportGroup } from "@/graphql/mutations";
import { updateReportGroup } from "@/graphql/mutations";
import { deleteReportGroup } from "@/graphql/mutations";
import { getReportGroup } from "@/graphql/queries";
import { listReportGroups } from "@/graphql/queries";



export default {
  state: {
    reports: [],
    report_group: [],
    report_groups: [],
    active_report: {},
  },
  actions: {
    async addReport({ commit, dispatch }, active_report) {
      console.log(active_report);
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createReport, { input: active_report }));
        dispatch("fetchReports");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log("loser");
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async addReportGroup({ commit, dispatch }, report_group) {
      console.log(report_group);
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createReportGroup, { input: report_group }));
        dispatch("fetchReportGroups");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report Group Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log("loser");
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateReportById({ commit, dispatch }, active_report ) {
      console.log(active_report);
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateReport, { input: active_report }));
        dispatch("fetchReports");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateReportGroupById({ commit, dispatch }, report_group ) {
      console.log(report_group);
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateReportGroup, { input: report_group }));
        dispatch("fetchReportGroups");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report Group name successfully updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeReport({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteReport, { input: id }));
        dispatch("fetchReports");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async removeReportGroup({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteReportGroup, { input: id }));
        dispatch("fetchReportGroups");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Report Group Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchReports({ commit }) {
      commit("TOGGLE_LOADING", true)
      try {     
       const res = await API.graphql(graphqlOperation(listReports));
        commit("SET_REPORTS", res.data.listReports.items);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false)
    },
    async fetchReportGroups({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listReportGroups));
        commit("SET_REPORT_GROUPS", res.data.listReportGroups.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchReport({ commit }, id) {
      //console.log(id);
      commit("TOGGLE_LOADING", true)
      try { 
          
       const res = await API.graphql(graphqlOperation(getReport, { id: id }));
       if (res.data.getReport.columns && typeof res.data.getReport.columns == 'string') {
        res.data.getReport.columns = JSON.parse(res.data.getReport.columns)
       }
        commit("SET_REPORT", res.data.getReport);
        console.log(res.data.getReport);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false)
    },
    async fetchReportGroup({ commit }, id) {
      console.log(id);
      try {     
       const res = await API.graphql(graphqlOperation(getReportGroup, { id: id }));
        commit("SET_REPORT_GROUP", res.data.getReportGroup);
        console.log(res.data.getReportGroup);
      } catch (error) {
        console.log(error);
      }
    },
  },
  
  mutations: {
    ADD_REPORT: (state, active_report) => state.reports.push(active_report),
    ADD_REPORT_GROUP: (state, report_group) => state.report_groups.push(report_group),
    SET_REPORTS: (state, reports) => (state.reports = reports),
    SET_REPORT: (state, active_report) => (state.active_report = active_report),
    SET_REPORT_DATASET: (state, dataSet) => (state.active_report.dataSet = dataSet),
    SET_REPORT_GROUP: (state, report_group) => (state.report_group = report_group),
    SET_REPORT_GROUPS: (state, report_groups) => (state.report_groups = report_groups),
  },
  getters: {
    reports: (state) => state.reports,  
    reportGroup: (state) => state.report_group,
    reportGroups: (state) => state.report_groups,    
    activeReport: (state) => state.active_report, 
  },
};

