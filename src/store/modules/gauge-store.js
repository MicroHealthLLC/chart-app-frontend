import { API, graphqlOperation } from "aws-amplify";
import { createGauge, createHeatMap } from "@/graphql/mutations";
import { updateGauge, updateHeatMap } from "@/graphql/mutations";
import { deleteGauge, deleteHeatMap } from "@/graphql/mutations";
import { getGauge, getHeatMap } from "@/graphql/queries";
import { listGauges, listHeatMaps } from "@/graphql/queries";

export default {
  state: {
    gauges: [],
    gauge: {},
    heatMaps: [],
    heatMap: {},
  },
  actions: {
    async addGauge({ commit, dispatch }, gauge) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createGauge, { input: gauge }));
        dispatch("fetchGauges");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Gauge Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async addHeatMap({ commit, dispatch }, heatMap) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(createHeatMap, { input: heatMap }));
        dispatch("fetchHeatMaps");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Heat Map Successfully Added!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateGaugeById({ commit, dispatch }, gauge) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateGauge, { input: gauge }));
        dispatch("fetchGauges");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Gauge Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async updateHeatMapById({ commit, dispatch }, heatMap) {
      commit("TOGGLE_SAVING", true);
      try {
        await API.graphql(graphqlOperation(updateHeatMap, { input: heatMap }));
        dispatch("fetchHeatMaps");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Heat Map Successfully Updated!",
          color: "var(--mh-green)",
        });
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_SAVING", false);
    },
    async removeGauge({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteGauge, { input: id }));
        dispatch("fetchGauges");
        commit("SET_SNACKBAR", {
          show: true,
          message: "Gauge Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async removeHeatMap({ commit, dispatch }, id) {
      try {
        await API.graphql(graphqlOperation(deleteHeatMap, { input: id }));
        dispatch("fetchHeatMaps");
        commit("SET_SNACKBAR", {
          show: true,
          message: "HeatMap Successfully Removed",
          color: "var(--mh-orange)",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchGauges({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listGauges));
        commit("SET_GAUGES", res.data.listGauges.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchGauge({ commit }, id) {
      commit("TOGGLE_LOADING", true);
      try {
        const res = await API.graphql(graphqlOperation(getGauge, { id: id }));
        commit("SET_GAUGE", res.data.getGauge);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    },
    async fetchHeatMaps({ commit }) {
      try {
        const res = await API.graphql(graphqlOperation(listHeatMaps));
        commit("SET_HEAT_MAPS", res.data.listHeatMaps.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchHeatMap({ commit }, id) {
      commit("TOGGLE_LOADING", true);
      try {
        const res = await API.graphql(graphqlOperation(getHeatMap, { id: id }));
        if (
          res.data.getHeatMap.columns &&
          typeof res.data.getHeatMap.columns == "string"
        ) {
          res.data.getHeatMap.columns = JSON.parse(res.data.getHeatMap.columns);
        }
        if (
          res.data.getHeatMap.options &&
          typeof res.data.getHeatMap.options == "string"
        ) {
          res.data.getHeatMap.options = JSON.parse(res.data.getHeatMap.options);
        }
        commit("SET_HEAT_MAP", res.data.getHeatMap);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    },
  },
  mutations: {
    SET_GAUGES: (state, gauges) => (state.gauges = gauges),
    SET_GAUGE: (state, gauge) => (state.gauge = gauge),
    ADD_HEAT_MAP: (state, heatMap) => state.heatMaps.push(heatMap),
    SET_HEAT_MAPS: (state, heatMaps) => (state.heatMaps = heatMaps),
    SET_HEAT_MAP: (state, heatMap) => (state.heatMap = heatMap),
  },
  getters: {
    gauges: (state) => state.gauges,
    gauge: (state) => state.gauge,
    heatMaps: (state) => state.heatMaps,
    heatMap: (state) => state.heatMap,
  },
};
