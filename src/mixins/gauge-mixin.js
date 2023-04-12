import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      newGauge: {
        title: "",
        value: 0,
        chartType: "Traditional",
        notes: "",
        //segmentStops: [0, 70, 90, 100]
      },
    };
  },
  methods: {
    ...mapActions(["fetchGauge", "fetchHeatMap"]),
    toGauge(gaugeId) {
      this.fetchGauge(gaugeId);
      this.$router.push(`gauges/${gaugeId}`);
    },
    toHeatMap(heatMapId) {
      this.fetchHeatMap(heatMapId);
      this.$router.push(`heatMaps/${heatMapId}`);
    },
  },
  mounted() {},
  computed: {
    ...mapGetters(["gauges", "currentChannels", "heatMaps"]),
    gaugeWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 200;
        case "sm":
          return 250;
        case "md":
          return 300;
        case "lg":
          return 500;
        case "xl":
          return 800;
      }
    },
    gaugeHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 130;
        case "sm":
          return 155;
        case "md":
          return 180;
        case "lg":
          return 280;
        case "xl":
          return 430;
      }
    },

    ringWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 40;
        case "sm":
          return 50;
        case "md":
          return 60;
        case "lg":
          return 100;
        case "xl":
          return 150;
      }
    },
    channelGauges() {
      if (
        this.gauges &&
        this.gauges.length > 0 &&
        this.currentChannels &&
        this.currentChannels[0].channelId
      ) {
        return this.gauges
          .filter((t) => t.channelId == this.currentChannels[0].channelId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else return [];
    },
    channelHeatMaps() {
      if (
        this.heatMaps &&
        this.heatMaps.length > 0 &&
        this.currentChannels &&
        this.currentChannels[0].channelId
      ) {
        return this.heatMaps
          .filter((t) => t.channelId == this.currentChannels[0].channelId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else return [];
    },
  },
  watch: {},
};
