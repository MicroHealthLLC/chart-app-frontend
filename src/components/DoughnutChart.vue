<script>
import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
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
        "rgba(255, 69, 0, 0.75)", // Red (OrangeRed)
        "rgba(255, 165, 0, 0.75)", // Yellow (Orange)
        "rgba(154, 205, 50, 0.75)", // Green (YellowGreen)
        "rgba(30, 144, 255, 0.75)", // Blue (DodgerBlue)

        "rgba(255, 99, 71, 0.75)", // Red (Tomato)
        "rgba(255, 215, 0, 0.75)", // Yellow (Gold)
        "rgba(102, 205, 170, 0.75)", // Green (MediumAquaMarine)
        "rgba(65, 105, 225, 0.75)", // Blue (RoyalBlue)

        "rgba(255, 127, 80, 0.75)", // Red (Coral)
        "rgba(238, 232, 170, 0.75)", // Yellow (PaleGoldenrod)
        "rgba(32, 178, 170, 0.75)", // Green (LightSeaGreen)
        "rgba(100, 149, 237, 0.75)", // Blue (CornflowerBlue)

        "rgba(178, 34, 34, 0.75)", // Red (FireBrick)
        "rgba(255, 218, 185, 0.75)", // Yellow (PeachPuff)
        "rgba(144, 238, 144, 0.75)", // Green (LightGreen)
        "rgba(70, 130, 180, 0.75)", // Blue (SteelBlue)

        "rgba(255, 0, 0, 0.75)", // Red (Red)
        "rgba(255, 255, 0, 0.75)", // Yellow (Yellow)
        "rgba(50, 205, 50, 0.75)", // Green (LimeGreen)
        "rgba(176, 196, 222, 0.75)", // Blue (LightSteelBlue)

        "rgba(220, 20, 60, 0.75)", // Red (Crimson)
        "rgba(240, 230, 140, 0.75)", // Yellow (Khaki)
        "rgba(60, 179, 113, 0.75)", // Green (MediumSeaGreen)
        "rgba(135, 206, 250, 0.75)", // Blue (LightSkyBlue)
      ],
      index: 0,
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
