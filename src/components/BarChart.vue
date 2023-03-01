<script>
import { Bar } from "vue-chartjs";
import ChartDatalabels from "chartjs-plugin-datalabels";

export default {
  extends: Bar,
  props: {
    chartData: {
      type: Array,
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
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        plugins: {
          datalabels: {
            color: "white",
            font: {
              size: 14,
            },
            align: "end",
            anchor: "start",
          },
        },
      },
    };
  },
  methods: {
    loadChart() {
      if (this.chartData && this.chartData[0]) {
        const labels = this.chartData.map((item) => Object.values(item)[0]);

        const keys = Object.keys(this.chartData[0]).slice(1);

        const dataSets = [];

        keys.forEach((item, index) => {
          const data = this.chartData.map(
            (item) => Object.values(item)[index + 1]
          );

          dataSets.push({
            label: item,
            data: data,
            backgroundColor: this.chartColors[0][index],
            borderColor: this.chartColors[0][index],
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
      }
    },
  },
  mounted() {
    this.addPlugin(ChartDatalabels);
    this.loadChart();
  },
  watch: {
    chartData() {
      this.loadChart();
    },
    chartColors() {
      this.loadChart();
    },
  },
};
</script>
