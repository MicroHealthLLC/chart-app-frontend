<template>
  <v-row>
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3 v-if="$route.params.dashboardId == 'new'">Add Dashboard</h3>
        <h3 v-else>{{ activeDashboard.title }}</h3>
        <div>
          <v-btn
            class="px-5 mr-2 mb-2"
            @click="saveDashboard"
            color="primary"
            depressed
            small
            >Save</v-btn
          >
          <v-btn class="mb-2" @click="$router.go(-1)" small outlined>Cancel</v-btn>
        </div>
      </div>

      <v-divider></v-divider>
    </v-col>
    <!-- Dashboard Preview -->
    <v-col
      :class="[
        {
          'col-md-12': index == 0 && activeDashboard.layout == 'layout-1',
        },
        {
          'col-md-12': activeDashboard.layout == 'layout-2',
        },
        {
          'col-md-6': activeDashboard.layout == 'layout-3',
        },
        'col-md-6',
      ]"
      v-for="(report, index) in activeDashboard.reports"
      :key="index"
    >
      <v-card class="pa-4 mb-4" height="100%">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }"
            ><v-btn class="chart-menu" icon v-bind="attrs" v-on="on"
              ><v-icon>mdi-dots-horizontal</v-icon></v-btn
            ></template
          >
          <v-card class="description-tooltip">
            <v-card-title class="text-subtitle-2">
              Description
            </v-card-title>
            <v-card-text>
              {{ report.description }}
            </v-card-text>
          </v-card>
        </v-menu>

        <Component
          :ref="'chart' + index"
          :is="graphType(report)"
          :chartData="report.data_set.data"
          :graphType="report.chart_type"
          :title="report.title"
          :height="350"
          class="mb-4"
        >
        </Component>
        <div class="d-flex justify-end">
          <v-btn
            v-show="['donut', 'pie', 'polar-area'].includes(report.chart_type)"
            @click="changeChartData($refs['chart' + index])"
            outlined
            small
            >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
      </v-card>
    </v-col>

    <v-col class="col-12">
      <h3>Dashboard Details</h3>
      <v-divider class="mb-4"></v-divider>

      <div class="grid">
        <div>
          <v-text-field v-model="activeDashboard.title" label="Title" dense>
          </v-text-field>
        </div>
        <div>
          <v-text-field
            value="Christopher Calderon"
            label="Created By"
            dense
          ></v-text-field>
        </div>
        <div>
          <v-select
            v-model="activeDashboard.channel_id"
            :items="channels"
            item-text="title"
            item-value="id"
            label="Channel"
            dense
          ></v-select>
        </div>
        <div>
          <v-select
            v-model="activeDashboard.layout"
            :items="layouts"
            item-text="text"
            item-value="value"
            label="Layout"
            dense
          ></v-select>
        </div>
        <div class="reports">
          <v-select
            v-model="activeDashboard.reports"
            :items="channel.reports"
            item-text="title"
            item-value="id"
            label="Reports"
            multiple
            return-object
            dense
          ></v-select>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import RadarChart from "../components/RadarChart";
import DoughnutChart from "../components/DoughnutChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import Table from "../components/Table";

export default {
  data() {
    return {
      layouts: [
        { text: "Layout 1", value: "layout-1" },
        { text: "Layout 2", value: "layout-2" },
        { text: "Layout 3", value: "layout-3" },
      ],
    };
  },
  computed: {
    ...mapGetters(["activeDashboard", "channel", "channels", "statusCode"]),
  },
  methods: {
    ...mapActions([
      "addDashboard",
      "fetchChannel",
      "fetchDashboard",
      "updateDashboard",
    ]),
    ...mapMutations(["SET_ACTIVE_DASHBOARD", "SET_STATUS_CODE"]),
    graphType(report) {
      if (report.chart_type === "line") {
        return LineChart;
      } else if (report.chart_type === "bar") {
        return BarChart;
      } else if (report.chart_type === "radar") {
        return RadarChart;
      } else if (report.chart_type === "donut") {
        return DoughnutChart;
      } else if (report.chart_type === "pie") {
        return PieChart;
      } else if (report.chart_type === "polar-area") {
        return PolarAreaChart;
      } else if (report.chart_type === "table") {
        return Table;
      } else {
        return LineChart;
      }
    },
    changeChartData(ref) {
      ref[0].index =
        (ref[0].index + 1) % (Object.keys(ref[0].chartData[0]).length - 1);
    },
    saveDashboard() {
      let data = {
        title: this.activeDashboard.title,
        description: this.activeDashboard.description,
        channel_id: this.activeDashboard.channel_id,
        layout: this.activeDashboard.layout,
        report_ids: this.activeDashboard.reports.map((report) => report.id),
        tags: this.activeDashboard.tags,
      };

      if (this.activeDashboard.id) {
        data.id = this.activeDashboard.id;
        this.updateDashboard(data);
      } else {
        this.addDashboard(data);
      }
    },
  },
  beforeMount() {
    if (this.$route.params.dashboardId != "new") {
      this.fetchDashboard(this.$route.params.dashboardId);
    } else {
      this.SET_ACTIVE_DASHBOARD({
        title: "",
        description: "",
        reports: [],
        tags: [],
        layout: "layout-1",
      });
    }

    this.fetchChannel(this.$route.params.channelId);
  },
  watch: {
    statusCode() {
      if (this.statusCode == 201) {
        this.$router.push(
          `/channels/${this.$route.params.channelId}/dashboards/${this.activeDashboard.id}`
        );
        this.SET_STATUS_CODE(0);
      }
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
.reports {
  grid-column: 1 / span 2;
}
.chart-card {
  height: 350px;
}
.chart-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}
.description-tooltip {
  max-width: 300px;
}
</style>
