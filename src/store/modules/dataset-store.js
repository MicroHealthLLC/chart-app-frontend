import axios from "axios";

export default {
  state: {
    active_data_set: {
      title: "",
      description: "",
      data: [],
    },
    data_sets: [],
  },
  actions: {
    fetchDataSet({ commit }, id) {
      axios({
        method: "GET",
        url: `http://localhost:3000/v1/data_sets/${id}`,
      }).then((res) => {
        commit("SET_ACTIVE_DATA_SET", res.data);
      });
    },
    fetchDataSets({ commit }) {
      axios({
        method: "GET",
        url: "http://localhost:3000/v1/data_sets",
      }).then((res) => {
        commit("SET_DATA_SETS", res.data);
      });
    },
    addDataSet({ commit }, dataSet) {
      axios({
        method: "POST",
        url: "http://localhost:3000/v1/data_sets",
        data: dataSet,
      }).then((res) => {
        commit("SET_ACTIVE_DATA_SET", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Data Set added successfully!",
        });
      });
    },
    updateDataSet({ commit }, dataSet) {
      axios({
        method: "PATCH",
        url: `http://localhost:3000/v1/data_sets/${dataSet.id}`,
        data: dataSet,
      }).then((res) => {
        commit("SET_ACTIVE_DATA_SET", res.data);
        commit("SET_SNACKBAR", {
          show: true,
          message: "Data Set updated successfully!",
        });
      });
    },
  },
  mutations: {
    SET_ACTIVE_DATA_SET: (state, dataSet) => (state.active_data_set = dataSet),
    SET_DATA_SETS: (state, dataSets) => (state.data_sets = dataSets),
  },
  getters: {
    activeDataSet: (state) => state.active_data_set,
    dataSets: (state) => state.data_sets,
  },
};
