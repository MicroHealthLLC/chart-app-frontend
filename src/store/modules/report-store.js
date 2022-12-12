import { API, graphqlOperation } from "aws-amplify";
import { createReport } from "@/graphql/mutations";
import { updateReport } from "@/graphql/mutations";
import { deleteReport } from "@/graphql/mutations";
import { getReport } from "@/graphql/queries";
import { listReports } from "@/graphql/queries";



export default {
  state: {
    reports: [],
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
    async fetchReports({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listReports));
        commit("SET_REPORTS", res.data.listReports.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchReport({ commit }, id) {
      console.log(id);
      try {     
       const res = await API.graphql(graphqlOperation(getReport, { id: id }));
        commit("SET_REPORT", res.data.getReport);
        console.log(res.data.getReport);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_REPORT: (state, active_report) => state.reports.push(active_report),
    SET_REPORTS: (state, reports) => (state.reports = reports),
    SET_REPORT: (state, active_report) => (state.active_report = active_report),
    SET_REPORT_DATASET: (state, dataSet) =>
    (state.active_report.dataSet = dataSet),
  },
  getters: {
    reports: (state) => state.reports,  
    activeReport: (state) => state.active_report, 
  },
};





// export default {
//   state: {
//     active_report: {
//       title: "",
//       description: "",
//       chart_type: "line",
//       data_set: { data: [] },
//       tags: [],
//       color_scheme_id: 1,
//       user: {
//         first_name: "",
//         last_name: "",
//       },
//       last_updated_by: "",
//       updated_at: "",
//     },
//     channel_reports: [],
//     reports: {
//       public: [],
//       personal: [],
//       group: [],
//     },
//     latest_reports: {},
//     report_loaded: true,
//   },
//   actions: {
//     fetchReports({ commit }) {
//       axios({
//         method: "GET",
//         url: `${BASE_URL}/v1/reports`,
//       }).then((res) => {
//         commit("SET_REPORTS", res.data);
//       });
//     },
//     fetchPublicReports({ commit }) {
//       axios({
//         method: "GET",
//         url: `${BASE_URL}/v1/public_reports`,
//       }).then((res) => {
//         commit("SET_PUBLIC_REPORTS", res.data);
//       });
//     },
//     fetchPersonalReports({ commit }) {
//       axios({
//         method: "GET",
//         url: `${BASE_URL}/v1/personal_reports`,
//       }).then((res) => {
//         commit("SET_PERSONAL_REPORTS", res.data);
//       });
//     },
//     fetchGroupReports({ commit }) {
//       axios({
//         method: "GET",
//         url: `${BASE_URL}/v1/group_reports`,
//       }).then((res) => {
//         commit("SET_GROUP_REPORTS", res.data);
//       });
//     },
//     fetchReport({ commit }, id) {
//       commit("TOGGLE_REPORT_LOADED", false);
//       axios({
//         method: "GET",
//         url: `${BASE_URL}/v1/reports/${id}`,
//       })
//         .then((res) => {
//           commit("SET_ACTIVE_REPORT", res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//           commit("SET_STATUS_CODE", err.response.status);
//         });
//       commit("TOGGLE_REPORT_LOADED", true);
//     },
//     addReport({ commit }, report) {
//       axios({
//         method: "POST",
//         url: `${BASE_URL}/v1/reports`,
//         data: report,
//       }).then((res) => {
//         commit("SET_ACTIVE_REPORT", res.data);
//         commit("SET_SNACKBAR", {
//           show: true,
//           message: "Report added successfully!",
//         });
//         commit("SET_STATUS_CODE", res.status);
//       });
//     },
//     updateReport({ commit }, report) {
//       axios({
//         method: "PATCH",
//         url: `${BASE_URL}/v1/reports/${report.id}`,
//         data: report,
//       }).then((res) => {
//         commit("SET_ACTIVE_REPORT", res.data);
//         commit("SET_SNACKBAR", {
//           show: true,
//           message: "Report updated successfully!",
//         });
//       });
//     },
//     deleteReport({ commit }, id) {
//       axios({
//         method: "DELETE",
//         url: `${BASE_URL}/v1/reports/${id}`,
//       }).then(() => {
//         commit("SET_SNACKBAR", {
//           show: true,
//           message: "Report successfully deleted.",
//         });
//       });
//     },
//   },
//   mutations: {
//     SET_REPORTS: (state, reports) => (state.reports = reports),
//     SET_PUBLIC_REPORTS: (state, reports) => (state.reports.public = reports),
//     SET_PERSONAL_REPORTS: (state, reports) =>
//       (state.reports.personal = reports),
//     SET_GROUP_REPORTS: (state, reports) => (state.reports.group = reports),
//     SET_ACTIVE_REPORT: (state, report) => (state.active_report = report),
//     SET_REPORT_DATA_SET: (state, dataSet) =>
//       (state.active_report.data_set = dataSet),
//     TOGGLE_REPORT_LOADED: (state, isLoaded) => (state.report_loaded = isLoaded),
//   },
//   getters: {
//     activeReport: (state) => state.active_report,
//     channelReports: (state) => state.channel_reports,
//     reports: (state) => state.reports,
//     latestReports: (state) => state.latest_reports,
//     reportLoaded: (state) => state.report_loaded,
//   },
// };
