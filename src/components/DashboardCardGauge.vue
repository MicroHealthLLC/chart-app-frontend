<template>
  <KPIGauge :gauge="gauge" :fluidWidth="true" :height="gaugeHeight" :segmentStops="activeSteps" :ringWidth="ringWidth" />
</template>
    
<script>
import KPIGauge from './KPIGauge.vue';
import gaugeMixin from '../mixins/gauge-mixin';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "DashboardCardGauge",
  props: {
    gauge: Object
  },
  components: {
    KPIGauge
  },
  data() {
    return {
      activeSteps: []
    };
  },
  mixins: [gaugeMixin],
  computed: {
    ...mapGetters([
      "currentChannels",
      "user",
    ]),
  },
  methods: {
    ...mapActions([
    ]),
    setChartType() {
      if (this.gauge && this.gauge.chartType) {
        switch (this.gauge.chartType) {
          case "Traditional":
            if (!this.gauge.segmentStops) {
              this.activeSteps = [0, 70, 85, 100]
            } else {
              this.activeSteps = this.gauge.segmentStops.split(',').map(x => parseFloat(x))
            }
            break;
          case "Middle":
            if (!this.gauge.segmentStops) {
              this.activeSteps = [-100, -60, -25, 25, 60, 100]
            } else {
              this.activeSteps = this.gauge.segmentStops.split(',').map(x => parseFloat(x))
            }
            break;
          case "Left":
            if (!this.gauge.segmentStops) {
              this.activeSteps = [0, 25, 75, 100]
            } else {
              this.activeSteps = this.gauge.segmentStops.split(',').map(x => parseFloat(x))
            }
            //console.log(this.activeSteps)
            break;
          default:
          // code block
        }
      }
    }
  },
  async mounted() {
    if (this.gauge) {
      this.setChartType()
    }
  },
  watch: {

  }
}
</script>
    
<style></style>