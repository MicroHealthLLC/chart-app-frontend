<script>
import { Radar } from "vue-chartjs";

export default {
  extends: Radar,
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
      },
    };
  },
  watch: {
    chartData() {
      this.loadChart();
    },
    chartColors() {
      this.loadChart();
    },
  },
  mounted() {
    this.loadChart();
  },
  methods: {
    loadChart() {
      const labels = this.chartData.map((item) => Object.values(item)[0]);

      const keys = Object.keys(this.chartData[0]).slice(1);

      const dataSets = [];

      this.options.tooltips = {
        callbacks: {
          title: (tooltipItem, data) => data.labels[tooltipItem[0].index],
        },
      };

      keys.forEach((item, index) => {
        const data = this.chartData.map(
          (item) => Object.values(item)[index + 1]
        );

        dataSets.push({
          label: item,
          data: data,
          backgroundColor: this.chartColors[1][index],
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
    },
  },
};
</script>
