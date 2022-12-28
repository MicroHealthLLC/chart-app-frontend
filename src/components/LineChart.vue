<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartData: {
      type: Array,
    },
    graphType: {
      type: String,
    },
    title: {
      type: String,
      default: "",
    },
    chartColors: {
      type: Array,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ["", ""],
        },
        // bezierCurve: false,
        tooltips: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          tooltip: {
            position: "nearest",
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    loadChart() {
      const labels = this.chartData.map((item) => Object.values(item)[0]);

      const keys = Object.keys(this.chartData[0]).slice(1);

      const dataSets = [];
      const lineTension = this.graphType == "curve" ? 0.25 : 0;
      const fill = this.graphType == "area" ? true : false;

      keys.forEach((item, index) => {
        const data = this.chartData.map(
          (item) => Object.values(item)[index + 1]
        );
        dataSets.push({
          label: item,
          data: data,
          backgroundColor: this.chartColors[1][index],
          borderColor: this.chartColors[0][index],
          lineTension: lineTension,
          fill: fill,
        });
      });

      this.options.title.text[0] = this.title;

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
    chartColors() {
      this.loadChart();
    },
    chartData() {
      this.loadChart();
    },
  },
};
</script>
