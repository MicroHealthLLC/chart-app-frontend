import { API, graphqlOperation } from "aws-amplify";
import { createGauge } from "@/graphql/mutations";
import { updateGauge } from "@/graphql/mutations";
import { deleteGauge } from "@/graphql/mutations";
import { getGauge } from "@/graphql/queries";
import { listGauges } from "@/graphql/queries";


export default {
  state: {
    gauges: [],
    gauge: {},
    heatMaps: [],
    heatMap: {}
  },
  actions: {
    async addGauge({ commit, dispatch }, gauge) {
      console.log(gauge)
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
    async updateGaugeById({ commit, dispatch }, gauge ) {
      console.log(gauge)
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
    async fetchGauges({ commit }) {
      try {     
       const res = await API.graphql(graphqlOperation(listGauges));
        commit("SET_GAUGES", res.data.listGauges.items);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchGauge({ commit } , id) {
      commit("TOGGLE_LOADING", true);
      try {     
       const res = await API.graphql(graphqlOperation(getGauge, { id: id }));    
        commit("SET_GAUGE", res.data.getGauge);
      } catch (error) {
        console.log(error);
      }
      commit("TOGGLE_LOADING", false);
    },
  },
  mutations: {
    ADD_GAUGE: (state, gauge) => state.gauges.push(gauge),
    SET_GAUGES: (state, gauges) => (state.gauges = gauges),
    SET_GAUGE: (state, gauge) => (state.gauge = gauge),
  },
  getters: {
    gauges: (state) => state.gauges, 
    gauge: (state) => state.gauge, 
  },
};


