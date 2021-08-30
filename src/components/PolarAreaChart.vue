<script>
import { PolarArea, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: PolarArea,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Array,
    },
    title: {
      type: String,
      default: "",
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
          backgroundColor: this.colors,
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
  },
};
</script>
