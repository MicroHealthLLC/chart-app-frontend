<template>
  <div>
    <fullscreen v-if="!fullscreen" v-model="fullscreenG">
      <span class="d-flex">
        <h4 class="pa-4">{{ gauge.title }}</h4>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-0 mt-2"
              icon
              v-bind="attrs"
              @click.prevent="toGauge(gauge.id)"
              v-on="on"
              ><v-icon small>fa-solid fa-up-right-from-square</v-icon>
            </v-btn>
          </template>
          <span>Go to KPI Gauge</span>
        </v-tooltip>
        <v-tooltip v-if="!isReadOnly" top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-4 mt-2"
              icon
              v-bind="attrs"
              @click.prevent="$emit('deleteItem', gauge.id)"
              v-on="on"
              ><v-icon small color="red">fa-trash</v-icon>
            </v-btn>
          </template>
          <span>Remove from Dashboard</span>
        </v-tooltip>
      </span>
      <!-- <fullscreen v-if="!fullscreen" v-model="fullscreenG"> -->
      <span v-if="fullscreenG">
        <v-btn class="chart-menu" icon @click="fullscreenGauge">
          <v-icon>mdi-fullscreen-exit</v-icon>
        </v-btn>

        <div class="d-flex gauge-wrap">
          <KPIGauge
            :gauge="gauge"
            :width="1200"
            :height="650"
            :segment-stops="activeSteps"
            ring-width="150"
            class="pb-10 ml-10"
          />
          <v-card
            v-if="gauge.notes"
            class="mr-2"
            style="height: 100%"
            max-width="190"
            elevation="1"
          >
            <v-card-text v-html="gauge.notes" />
          </v-card>
        </div>
      </span>
      <span v-else>
        <v-btn class="chart-menu" icon @click="fullscreenGauge">
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>

        <div class="d-flex gauge-wrap">
          <KPIGauge
            :gauge="gauge"
            :width="gauge.notes ? parentWidth - 200 : parentWidth - 70"
            :height="parentHeight - 144"
            :segment-stops="activeSteps"
            :ring-width="dashboardRingWidth"
            class="pb-10 mr-2"
          />
          <v-card
            v-if="gauge.notes"
            class="mr-2"
            style="height: 100%"
            max-width="190"
            elevation="1"
          >
            <v-card-text v-html="gauge.notes" />
          </v-card>
        </div>
      </span>
    </fullscreen>
    <span v-else>
      <span class="d-flex">
        <h4 class="pa-4">{{ gauge.title }}</h4>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ml-0 mt-2"
              icon
              v-bind="attrs"
              @click.prevent="toGauge(gauge.id)"
              v-on="on"
              ><v-icon small>fa-solid fa-up-right-from-square</v-icon>
            </v-btn>
          </template>
          <span>Go to KPI Gauge</span>
        </v-tooltip>
      </span>
      <!-- <v-btn @click="fullscreenDialog" class="chart-menu" icon>
        <v-icon>mdi-arrow-expand</v-icon>
      </v-btn> -->
      <div class="d-flex gauge-wrap">
        <KPIGauge
          :gauge="gauge"
          :width="parentWidth - 320"
          :height="(parentWidth - 270) / 2"
          :segment-stops="activeSteps"
          :ring-width="dashboardRingWidth"
          class="pb-9 px-2 mr-2"
        />
        <v-card
          v-if="gauge.notes"
          style="height: 100%"
          max-width="190"
          elevation="1"
        >
          <v-card-text v-html="gauge.notes" />
        </v-card>
      </div>
    </span>
    <!-- <div v-else-if="fullscreen && fullscreenD">
      <v-btn @click="fullscreenDialog" class="chart-menu" icon>
        <v-icon>mdi-arrow-collapse</v-icon>
      </v-btn>
      <div class="d-flex gauge-wrap">
        <KPIGauge :gauge="gauge" :width="parentWidth - 100" :height="parentHeight - 50" :segmentStops="activeSteps"
          :ringWidth="dashboardRingWidth" class="pb-10 px-2 mr-2" />
        <v-card v-if="gauge.notes" style="height: 100%" max-width="190" elevation="1">
          <v-card-text v-html="gauge.notes"></v-card-text>
        </v-card>
      </div>

    </div> -->
    <!-- <v-card v-else height="100vh">
          <v-toolbar class="px-5" color="info" dark>
            <h3>{{ gauge.title }}</h3>
            <v-spacer></v-spacer>
            <v-btn @click="fullscreenG = false" icon
              ><v-icon>mdi-close-thick</v-icon></v-btn
            >
          </v-toolbar>
          <div class="d-flex justify-space-around">
            <KPIGauge
              :gauge="gauge"
              :width="dashboardGaugeWidth + 800"
              :height="dashboardGaugeWidth + 800 / 2"
              :segmentStops="activeSteps"
              :ringWidth="180"
              class="pb-4 mt-4"
            />
            <v-card v-if="gauge.notes" class="mr-15 mt-10" style="height: 100%" max-width="500" elevation="1">
              <v-card-text v-html="gauge.notes"> </v-card-text>
            </v-card>
          </div>
        </v-card> -->
  </div>
</template>

<script>
import KPIGauge from "./KPIGauge.vue";
import gaugeMixin from "../mixins/gauge-mixin";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardCardGauge",
  components: {
    KPIGauge,
  },
  mixins: [gaugeMixin],
  props: {
    gauge: Object,
    staged: Array,
    isReadOnly: Boolean,
    fullscreen: Boolean,
    resized: Boolean,
  },
  data() {
    return {
      activeSteps: [],
      parentHeight: 0,
      parentWidth: 0,
      fullscreenG: false,
      fullscreenD: false,
      reveal: false,
    };
  },
  computed: {
    ...mapGetters(["currentChannels", "user"]),
    dashboardGaugeHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 130;
        case "sm":
          return 155;
        case "md":
          return 180;
        case "lg":
          return 280;
        case "xl":
          return 430;
      }
      return 150;
    },
    dashboardGaugeWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 50;
        case "sm":
          return 100;
        case "md":
          return 200;
        case "lg":
          return 350;
        case "xl":
          return 600;
      }
      return 300;
    },
    dashboardRingWidth() {
      if (this.parentWidth > 1000) {
        return 150;
      } else if (this.parentWidth > 500) {
        return 80;
      } else if (this.parentWidth > 350) {
        return 30;
      } else return 10;
      /* switch (this.parentWidth) {
        case 'xs': return 40
        case 'sm': return 50
        case 'md': return 60
        case 'lg': return 100
        case 'xl': return 150
      }
      return 40 */
    },
  },
  methods: {
    ...mapActions([]),
    checkLog(e) {
      console.log(e);
    },
    setChartType() {
      if (this.gauge && this.gauge.chartType) {
        switch (this.gauge.chartType) {
          case "Traditional":
            if (!this.gauge.segmentStops) {
              this.activeSteps = [0, 70, 85, 100];
            } else {
              this.activeSteps = this.gauge.segmentStops
                .split(",")
                .map((x) => parseFloat(x));
            }
            break;
          case "Middle":
            if (!this.gauge.segmentStops) {
              this.activeSteps = [-100, -60, -25, 25, 60, 100];
            } else {
              this.activeSteps = this.gauge.segmentStops
                .split(",")
                .map((x) => parseFloat(x));
            }
            break;
          case "Left":
            if (!this.gauge.segmentStops) {
              this.activeSteps = [0, 25, 75, 100];
            } else {
              this.activeSteps = this.gauge.segmentStops
                .split(",")
                .map((x) => parseFloat(x));
            }
            //console.log(this.activeSteps)
            break;
          default:
          // code block
        }
      }
    },
    setParentDims() {
      setTimeout(() => {
        if (this.$parent.$parent.$el.clientHeight != 0) {
          this.parentHeight = this.$parent.$parent.$el.clientHeight;
        } else this.parentHeight = this.$parent.$el.clientHeight;
        if (this.$parent.$parent.$el.clientWidth != 0) {
          this.parentWidth = this.$parent.$parent.$el.clientWidth;
        } else {
          this.parentWidth = this.$parent.$el.clientWidth;
        }
      }, 100);
    },
    toGauge(id) {
      this.$router.replace(`/${this.currentChannels[0].name}/gauges/${id}`);
    },
    fullscreenGauge() {
      this.fullscreenG = this.fullscreenG ? false : true;
    },
    fullscreenDialog() {
      this.fullscreenD = this.fullscreenD ? false : true;
    },
  },
  watch: {
    staged() {
      if (this.staged && this.staged.length > 0) {
        this.setChartType();
        this.setParentDims();
      }
    },
    resized() {
      if (this.resized) {
        this.setParentDims();
      }
    },
    isReadOnly() {
      this.setParentDims();
    },
    fullscreen() {
      if (this.fullscreen) {
        this.setChartType();
        this.setParentDims();
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
  mounted() {
    if (this.gauge) {
      console.log(this.gauge);
      this.setChartType();
    }
    this.setParentDims();
  },

  created() {
    window.addEventListener("resize", this.setParentDims);
  },
  destroyed() {
    window.removeEventListener("resize", this.setParentDims);
  },
};
</script>

<style>
.chart-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}

.fullscreen {
  background: whitesmoke;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
