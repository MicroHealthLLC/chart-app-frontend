<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    graphType: {
      type: String,
    },
  },
  data() {
    return {
      colors: [
        "rgba(0, 18, 25, 0.75)",
        "rgba(0, 95, 115, 0.75)",
        "rgba(10, 147, 150, 0.75)",
        "rgba(148, 210, 189, 0.75)",
        "rgba(233, 216, 166, 0.75)",
        "rgba(238, 155, 0, 0.75)",
        "rgba(202, 103, 2, 0.75)",
        "rgba(174, 32, 18, 0.75)",
      ],
    };
  },
  methods: {
    loadChart() {
      const labels = this.chartData.map((item) => Object.values(item)[0]);

      const keys = Object.keys(this.chartData[0]).slice(1);

      const dataSets = [];
      const lineTension = this.graphType == "curve" ? 0.25 : 0;

      keys.forEach((item, index) => {
        const data = this.chartData.map(
          (item) => Object.values(item)[index + 1]
        );

        dataSets.push({
          label: item,
          data: data,
          backgroundColor: this.colors[index],
          borderColor: this.colors[index],
          lineTension: lineTension,
          fill: true,
        });
      });

      this.renderChart(
        {
          labels: labels,
          datasets: [...dataSets],
        },
        this.options
      );
    },
  },
  computed: {},
  mounted() {
    this.loadChart();
  },
  watch: {
    options() {
      console.log("Options Changed...");
    },
    graphType() {
      this.loadChart();
    },
    chartData() {
      this.loadChart();
    },
  },
};
</script>
