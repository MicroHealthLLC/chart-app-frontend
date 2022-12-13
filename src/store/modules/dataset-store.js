import { API, graphqlOperation } from "aws-amplify";
import { createDataSet, createDataValue } from "@/graphql/mutations";
import { updateDataSet } from "@/graphql/mutations";
import { deleteDataSet } from "@/graphql/mutations";
import { getDataSet } from "@/graphql/queries";
import { listDataSets, listDataValues } from "@/graphql/queries";
//import { onDeleteDataSet } from "../../graphql/subscriptions";


export default {
  state: {
    dataSets: [],
    dataValues: [],
    dataSet: {},
    channelDataSets: [],
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
    async addDataValue({ commit, dispatch }, dataValue) {
      console.log(dataValue)
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createDataValue, { input: dataValue }));
        dispatch("fetchDataValues");
        commit("SET_SNACKBAR", {
          show: true,
          message: "DataValue Successfully Added!",
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
    async fetchDataValues({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listDataValues));
        commit("SET_DATA_VALUES", res.data.listDataValues.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchDataSet({ commit } , id) {
      try {     
       const res = await API.graphql(graphqlOperation(getDataSet, { id: id }));    
       if (res.data.getDataSet.dataValues.items && res.data.getDataSet.dataValues.items.length > 0){
        for (let i = 0; i < res.data.getDataSet.dataValues.items.length; i++) {
          res.data.getDataSet.dataValues.items[i].data = JSON.parse(res.data.getDataSet.dataValues.items[i].data)
        } 
       } 
       console.log(res.data.getDataSet)
        commit("SET_DATA_SET", res.data.getDataSet);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    ADD_DATA_SET: (state, dataSet) => state.dataSets.push(dataSet),
    SET_DATA_SETS: (state, dataSets) => (state.dataSets = dataSets),
    SET_DATA_VALUES: (state, dataValues) => (state.dataValues = dataValues),
    SET_DATA_SET: (state, dataSet) => (state.dataSet = dataSet),
    SET_CHANNEL_DATA_SETS: (state, dataSets) =>
      (state.channelDataSets = dataSets),
  },
  getters: {
    dataSets: (state) => state.dataSets,
    dataValues: (state) => state.dataValues,  
    dataSet: (state) => state.dataSet, 
    channelDataSets: (state) => state.channelDataSets,
  },
};


