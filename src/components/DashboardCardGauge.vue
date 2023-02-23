<template>
  <div>
    <h4 class="pa-4">{{ gauge.title }}</h4>
    <KPIGauge :gauge="gauge" :width="parentWidth - 100" :height="parentWidth / 2" :segmentStops="activeSteps" :ringWidth="60" class="pb-4" />
  </div>
</template>
    
<script>
import KPIGauge from './KPIGauge.vue';
import gaugeMixin from '../mixins/gauge-mixin';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "DashboardCardGauge",
  props: {
    gauge: Object,
    staged: Array,
  },
  components: {
    KPIGauge
  },
  data() {
    return {
      activeSteps: [],
      parentHeight: 0,
      parentWidth: 0
    };
  },
  mixins: [gaugeMixin],
  computed: {
    ...mapGetters([
      "currentChannels",
      "user",
    ]),
    dashboardGaugeHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 130
        case 'sm': return 155
        case 'md': return 180
        case 'lg': return 280
        case 'xl': return 430
      }
      return 150
    },
    dashboardGaugeWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 200
        case 'sm': return 250
        case 'md': return 300
        case 'lg': return 500
        case 'xl': return 800
      }
      return 300
    },
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
    },
  },
  /* afterMount() {
    if (this.$parent.$el.clientHeight) { 
      this.parentHeight = this.$parent.$el.clientHeight
    }
    if (this.$parent.$el.clientWidth) {
      this.parentWidth = this.$parent.$el.clientWidth
    }
  }, */
  async mounted() {
    if (this.gauge) {
      this.setChartType()
    }
    if (this.$parent.$el.clientHeight) { 
          this.parentHeight = this.$parent.$el.clientHeight
        }
        if (this.$parent.$el.clientWidth) {
          this.parentWidth = this.$parent.$el.clientWidth
        }
  },
  watch: {
    staged() {
      if (this.staged && this.staged.length > 0) {
        if (this.$parent.$el.clientHeight) { 
          this.parentHeight = this.$parent.$el.clientHeight
        }
        if (this.$parent.$el.clientWidth) {
          this.parentWidth = this.$parent.$el.clientWidth
        }
      }
    }
  }
}
</script>
    
<style></style>