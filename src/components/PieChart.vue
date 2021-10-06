<script>
import { Pie, mixins } from "vue-chartjs";
import ChartDatalabels from "chartjs-plugin-datalabels";
const { reactiveProp } = mixins;

export default {
  extends: Pie,
  mixins: [reactiveProp],
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
        plugins: {
          datalabels: {
            color: "white",
            font: {
              size: 14,
            },
          },
        },
      },
      index: 0,
    };
  },
  methods: {
    loadChart() {
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
          backgroundColor: this.chartColors[0],
        });
      });

      this.options.title.text[0] = this.title;
      this.options.title.text[1] = keys[this.index];

      this.options.tooltips = {
        callbacks: {
          title: () => {
            return keys[this.index];
          },
        },
      };

      this.renderChart(
        {
          labels: labels,
          datasets: [...dataSets.slice(this.index, this.index + 1)],
        },
        this.options
      );
    },
  },
  mounted() {
    this.addPlugin(ChartDatalabels);
    this.loadChart();
  },
  beforeDestroy() {
    this.options.title.text[1] = "";
    this.options.tooltips = {};
  },
  watch: {
    index() {
      this.loadChart();
    },
    chartData() {
      this.index = 0;
      this.loadChart();
    },
    chartColors() {
      this.index = 0;
      this.loadChart();
    },
  },
};
</script>
