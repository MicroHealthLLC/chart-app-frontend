<script>
import { Pie, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Pie,
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
    index: {
      type: Number,
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
      // const label = Object.keys(this.chartData[0])[1];
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
      this.loadChart();
    },
  },
};
</script>
