<template>
  <v-container>
  <v-row align="center" justify="center">
    <v-col>
      <vue-speedometer class="mx-5" :value="gauge.value" :width="width" :height="height" needleColor="black" :paddingVertical="20" :minValue="segmentStops[0]" :maxValue="segmentStops[segmentStops.length - 1]" :segmentColors="setSegments(gauge.chartType, 'color')" :maxSegmentLabels="setSegments(gauge.chartType, 'label')" :forceRender="true" :customSegmentStops="segmentStops" /> 
        
    </v-col>
  </v-row>
</v-container>
</template>
    
<script>
import VueSpeedometer from 'vue-speedometer';

export default {
  name: "KPIGauge",
  components: {
    VueSpeedometer,
  },
  props: {
    height: Number,
    width: Number,
    gauge: Object,
    segmentStops: Array 
  },
  methods: {
    setSegments(chartType, prop) {
      if (chartType == "Traditional") {
        return prop == 'color' ? ['tomato', 'gold', 'limegreen']
          : (prop == 'label') ? 4
            : (prop == 'segments') ? 3
            /* : (prop == 'stops') ? [0, 70, 85, 100] */ : ''
      } else if (chartType == "Middle") {
        return prop == 'color' ? ['tomato', 'gold', 'limegreen', 'gold', 'tomato']
          : (prop == 'label') ? 6
            : (prop == 'segments') ? 5
            /* : (prop == 'stops') ? [-100, -60, -25, 25, 60, 100] */ : ''
      } else {
        return prop == 'color' ? ['tomato', 'gold', 'limegreen']
          : (prop == 'segments') ? 3
            : (prop == 'label') ? 4
            /* : (prop == 'stops') ? [] */ : ''
      }
    },
  },
  watch: {
    gauge() {
      if (this.gauge) {
        console.log(this.gauge)
        
      }
    },
    segmentStops() {
      console.log(this.segmentStops)
    },
    customSegmentStops() {
      console.log(this.customSegmentStops)
    }
  },
  mounted() {
  }
};
</script>
    
<style scoped>

</style>