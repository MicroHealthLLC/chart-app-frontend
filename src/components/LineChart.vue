<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
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
      },
      colors: [
        [
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
        [
          "rgba(255, 69, 0, 0.25)", // Red (OrangeRed)
          "rgba(255, 165, 0, 0.25)", // Yellow (Orange)
          "rgba(154, 205, 50, 0.25)", // Green (YellowGreen)
          "rgba(30, 144, 255, 0.25)", // Blue (DodgerBlue)

          "rgba(255, 99, 71, 0.25)", // Red (Tomato)
          "rgba(255, 215, 0, 0.25)", // Yellow (Gold)
          "rgba(102, 205, 170, 0.25)", // Green (MediumAquaMarine)
          "rgba(65, 105, 225, 0.25)", // Blue (RoyalBlue)

          "rgba(255, 127, 80, 0.25)", // Red (Coral)
          "rgba(238, 232, 170, 0.25)", // Yellow (PaleGoldenrod)
          "rgba(32, 178, 170, 0.25)", // Green (LightSeaGreen)
          "rgba(100, 149, 237, 0.25)", // Blue (CornflowerBlue)

          "rgba(178, 34, 34, 0.25)", // Red (FireBrick)
          "rgba(255, 218, 185, 0.25)", // Yellow (PeachPuff)
          "rgba(144, 238, 144, 0.25)", // Green (LightGreen)
          "rgba(70, 130, 180, 0.25)", // Blue (SteelBlue)

          "rgba(255, 0, 0, 0.25)", // Red (Red)
          "rgba(255, 255, 0, 0.25)", // Yellow (Yellow)
          "rgba(50, 205, 50, 0.25)", // Green (LimeGreen)
          "rgba(176, 196, 222, 0.25)", // Blue (LightSteelBlue)

          "rgba(220, 20, 60, 0.25)", // Red (Crimson)
          "rgba(240, 230, 140, 0.25)", // Yellow (Khaki)
          "rgba(60, 179, 113, 0.25)", // Green (MediumSeaGreen)
          "rgba(135, 206, 250, 0.25)", // Blue (LightSkyBlue)
        ],
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
          backgroundColor: this.colors[1][index],
          borderColor: this.colors[0][index],
          lineTension: lineTension,
          fill: true,
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
    chartData() {
      this.loadChart();
    },
  },
};
</script>
