import { API, graphqlOperation } from "aws-amplify";
import { createDataSet } from "@/graphql/mutations";
import { updateDataSet } from "@/graphql/mutations";
import { deleteDataSet } from "@/graphql/mutations";
import { getDataSet } from "@/graphql/queries";
import { listDataSets } from "@/graphql/queries";


export default {
  state: {
    dataSets: [],
    dataSet: {},
  },
  actions: {
    async addDataSet({ commit, dispatch }, dataSet) {
      console.log(dataSet)
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createDataSet, { input: dataSet }));
        dispatch("fetchDataSets");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DataSet Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateDataSetById({ commit, dispatch }, dataSet ) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateDataSet, { input: dataSet }));
        dispatch("fetchDataSets");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DataSet Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeDataSet({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteDataSet, { input: id }));
        dispatch("fetchDataSets");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DataSet Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataSets({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listDataSets));
        commit("SET_DATA_SETS", res.data.listDataSets.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataSet(id) {
      console.log(id)  
      try {
           
       const res = await API.graphql(graphqlOperation(getDataSet, { id: id }));
        console.log(res.data);
        //commit("SET_DATA_SET", res.data.getDataSet);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_DATA_SET: (state, dataSet) => state.dataSets.push(dataSet),
    SET_DATA_SETS: (state, dataSets) => (state.dataSets = dataSets),
    SET_DATA_SET: (state, dataSet) => (state.dataSet = dataSet),
  },
  getters: {
    dataSets: (state) => state.dataSets,  
    dataSet: (state) => state.dataSet, 
  },
};


