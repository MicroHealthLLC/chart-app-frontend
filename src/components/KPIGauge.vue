<template>
  <!--   <v-row align="center" justify="center">
    <v-col> -->
  <vue-speedometer
    class="ml-3"
    :value="gauge.value"
    :width="width"
    :height="height"
    needle-color="black"
    :padding-vertical="20"
    :min-value="segmentStops[0]"
    :max-value="segmentStops[segmentStops.length - 1]"
    :segment-colors="setSegments(gauge.chartType, 'color')"
    :max-segment-labels="setSegments(gauge.chartType, 'label')"
    :force-render="true"
    :custom-segment-stops="segmentStops"
    :ring-width="ringWidth"
    :needle-height-ratio="needleHeightRatio"
  />
  <!--    </v-col>
  </v-row> -->
</template>

<script>
import VueSpeedometer from "vue-speedometer";

export default {
  name: "KPIGauge",
  components: {
    VueSpeedometer,
  },
  props: {
    height: Number,
    width: Number,
    gauge: Object,
    segmentStops: Array,
    ringWidth: Number,
    needleHeightRatio: Number,
  },
  data() {
    return {
      red: "#EF5350",
      yellow: "#FFCA28",
      green: "#66BB6A",
    };
  },
  watch: {
    gauge() {
      if (this.gauge) {
        //console.log(this.gauge)
      }
    },
    segmentStops() {
      //console.log(this.segmentStops)
    },
    customSegmentStops() {
      //console.log(this.customSegmentStops)
    },
  },
  mounted() {},
  methods: {
    setSegments(chartType, prop) {
      if (chartType == "Traditional") {
        return prop == "color"
          ? [this.red, this.yellow, this.green]
          : prop == "label"
          ? 4
          : prop == "segments"
          ? 3
          : /* : (prop == 'stops') ? [0, 70, 85, 100] */ "";
      } else if (chartType == "Middle") {
        return prop == "color"
          ? [this.red, this.yellow, this.green, this.yellow, this.red]
          : prop == "label"
          ? 6
          : prop == "segments"
          ? 5
          : /* : (prop == 'stops') ? [-100, -60, -25, 25, 60, 100] */ "";
      } else if (chartType == "Left") {
        return prop == "color"
          ? [this.green, this.yellow, this.red]
          : prop == "label"
          ? 4
          : prop == "segments"
          ? 3
          : /* : (prop == 'stops') ? [-100, -60, -25, 25, 60, 100] */ "";
      } else {
        return prop == "color"
          ? [this.red, this.yellow, this.green]
          : prop == "segments"
          ? 3
          : prop == "label"
          ? 4
          : /* : (prop == 'stops') ? [] */ "";
      }
    },
  },
};
</script>

<style scoped>
.current-value {
  margin-bottom: 10px !important;
}
</style>
