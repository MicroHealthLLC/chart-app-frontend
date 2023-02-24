<template>
  <div>
    <span class="d-flex">
      <h4 class="pa-4">{{ gauge.title }}</h4>
      <v-btn class="ml-0 mt-2" icon @click.prevent="toGauge(gauge.id)"><v-icon small>fa-solid
          fa-up-right-from-square</v-icon></v-btn>
    </span>
    <v-btn @click="fullscreenGauge" class="chart-menu" icon>
      <v-icon>mdi-fullscreen</v-icon>
    </v-btn>
    <KPIGauge :gauge="gauge" :width="parentWidth - 100" :height="parentWidth / 2" :segmentStops="activeSteps"
      :ringWidth="ringWidth" class="pb-4" />
    <v-dialog v-model="fullscreen" fullscreen eager>
      <v-card>
        <v-toolbar class="px-5" color="info" dark>
          <h3>{{ gauge.title }}</h3>
          <v-spacer></v-spacer>
          <v-btn @click="fullscreen = false" icon><v-icon>mdi-close-thick</v-icon></v-btn>
        </v-toolbar>
        <KPIGauge :gauge="gauge" :width="dashboardGaugeWidth" :height="dashboardGaugeHeight" :segmentStops="activeSteps" :ringWidth="ringWidth" class="pb-4" />
      </v-card>
    </v-dialog>
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
      parentWidth: 0,
      fullscreen: false,
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
    dashboardGaugeWidth() {
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
    setParentDims() {
      if (this.$parent.$el.clientHeight) {
        this.parentHeight = this.$parent.$el.clientHeight
      }
      if (this.$parent.$el.clientWidth) {
        this.parentWidth = this.$parent.$el.clientWidth
      }
    },
    toGauge(id) {
      this.$router.replace(`/${this.currentChannels[0].name}/gauges/${id}`)
    },
    fullscreenGauge() {
      this.fullscreen = true;
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
    this.setParentDims()
  },
  created() {
    window.addEventListener("resize", this.setParentDims);
  },
  destroyed() {
    window.removeEventListener("resize", this.setParentDims);
  },
  watch: {
    staged() {
      if (this.staged && this.staged.length > 0) {
        this.setParentDims()
      }
    }
  }
}
</script>
    
<style>
.chart-menu {
	position: absolute;
	top: 10px;
	right: 10px;
}
</style>