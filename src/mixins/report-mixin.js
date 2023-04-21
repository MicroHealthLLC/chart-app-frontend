import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      newReport: {
        title: "",
        description: "",
        chartType: "line",
        dataSet: { dataValues: [] },
        dataSetId: 1,
        colorSchemeId: 1,
        updated_at: "",
      },
    };
  },
  methods: {
    ...mapActions([]),
    reportIcon(chartType) {
      //console.log(chartType);
      switch (chartType) {
        case "line":
          return "mdi-chart-line";
        case "curve":
          return "mdi-chart-bell-curve-cumulative";
        case "bar":
          return "mdi-chart-bar";
        case "pie":
          return "mdi-chart-pie";
        case "donut":
          return "mdi-chart-donut";
        case "area":
          return "mdi-chart-areaspline-variant";
        case "radar":
          return "mdi-radar"
        case "table":
          return "mdi-table"   
        default:
          return 'mdi-file-chart-outline';
      }
    },
  },
  mounted() {
    //    this.fetchChannelTypes()
  },
  computed: {
    ...mapGetters([]),
  },
  watch: {},
};
