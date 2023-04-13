import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions([]),
    dashboardCols(staged, index) {
      if (staged && staged.length > 0) {
        if (staged.length == 2) {
          return 12;
        } else if (staged.length % 2 == 0) {
          return 6;
        } else {
          return index == 0 ? 12 : 6;
        }
      }
    },
    checkChartType(item) {
      console.log(item);
      let objs = Object.keys(item);
      if (objs.includes("reportGroup")) {
        return "report";
      } else if (objs.includes("segmentStops")) {
        return "gauge";
      } else return "heatMap";
    },
  },
  mounted() {},
  computed: {
    ...mapGetters([]),
  },
  watch: {},
};
