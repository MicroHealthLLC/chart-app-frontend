<template>
  <div>
    <span class="d-flex">
      <h4 class="pa-4">{{ gauge.title }}</h4>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-0 mt-2"
            icon
            @click.prevent="toGauge(gauge.id)"
            v-bind="attrs"
            v-on="on"
            ><v-icon small>fa-solid fa-up-right-from-square</v-icon>
          </v-btn>
        </template>
        <span>Go to KPI Gauge</span>
      </v-tooltip>
      <!-- <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ml-0 mt-2" icon @click="reveal = true" v-bind="attrs" v-on="on"><v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <span>See Notes</span>
      </v-tooltip> -->
    </span>
    <v-btn @click="fullscreenGauge" class="chart-menu" icon>
      <v-icon>mdi-fullscreen</v-icon>
    </v-btn>

    <div class="d-flex">
      <KPIGauge
        :gauge="gauge"
        :width="parentWidth - 220"
        :height="parentWidth / 2"
        :segmentStops="activeSteps"
        :ringWidth="dashboardRingWidth"
        class="pb-4 mr-2"
      />
      <v-card v-if="gauge.notes" style="height: 100%" max-width="190">
        <v-card-text v-html="gauge.notes"></v-card-text>
      </v-card>
    </div>
    <!-- <KPIGauge :gauge="gauge" :width="parentWidth - 100" :height="parentWidth / 2" :segmentStops="activeSteps" :ringWidth="ringWidth" class="pb-4" /> -->
    <v-dialog v-model="fullscreen" fullscreen eager>
      <v-card>
        <v-toolbar class="px-5" color="info" dark>
          <h3>{{ gauge.title }}</h3>
          <v-spacer></v-spacer>
          <v-btn @click="fullscreen = false" icon
            ><v-icon>mdi-close-thick</v-icon></v-btn
          >
        </v-toolbar>
        <div class="d-flex justify-space-around">
          <KPIGauge
            :gauge="gauge"
            :width="dashboardGaugeWidth"
            :height="dashboardGaugeWidth / 2"
            :segmentStops="activeSteps"
            :ringWidth="ringWidth"
            class="pb-4"
          />
          <v-card v-if="gauge.notes" class="mr-15 mt-10" style="height: 100%" max-width="500">
            <v-card-text v-html="gauge.notes"> </v-card-text>
          </v-card>
        </div>
      </v-card>
    </v-dialog>
    <!-- <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%;">
      <v-card-text class="pb-0" v-html="gauge.notes">
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ml-0 mt-2" icon @click="reveal = false" v-bind="attrs" v-on="on"><v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <span>Hide Notes</span>
        </v-tooltip>
      </v-card-actions>
    </v-card> -->
  </div>
</template>

<script>
import KPIGauge from "./KPIGauge.vue";
import gaugeMixin from "../mixins/gauge-mixin";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardCardGauge",
  props: {
    gauge: Object,
    staged: Array,
    isReadOnly: Boolean
  },
  components: {
    KPIGauge,
  },
  data() {
    return {
      activeSteps: [],
      parentHeight: 0,
      parentWidth: 0,
      fullscreen: false,
      reveal: false,
    };
  },
  mixins: [gaugeMixin],
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
      } else  return 10
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
      if (this.$parent.$el.clientHeight) {
        this.parentHeight = this.$parent.$el.clientHeight;
      }
      if (this.$parent.$el.clientWidth) {
        this.parentWidth = this.$parent.$el.clientWidth;
      }
    },
    toGauge(id) {
      this.$router.replace(`/${this.currentChannels[0].name}/gauges/${id}`);
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
  watch: {
    staged() {
      if (this.staged && this.staged.length > 0) {
        this.setChartType();
        this.setParentDims();
      }
    },
    isReadOnly() {
      console.log("here")
      this.setParentDims();
    }
  },
};
</script>

<style>
.chart-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
