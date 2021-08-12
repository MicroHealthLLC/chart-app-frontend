<template>
  <v-row>
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3>Add Dashboard</h3>
        <div>
          <v-btn class="px-5 mr-2 mb-2" color="primary" depressed small
            >Save</v-btn
          >
          <v-btn class="mb-2" small outlined>Cancel</v-btn>
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
      <v-card class="pa-4 mb-4">
        <Component
          :is="graphType(report)"
          :chartData="report.data_set.data"
          :options="chartOptions"
          :graphType="report.chart_type"
          :height="350"
          :index="dataIndex"
          class="mb-4"
        >
        </Component>
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
import { mapActions, mapGetters } from "vuex";
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ["", ""],
        },
        // bezierCurve: false,
      },
      dataIndex: 0,
      layouts: [
        { text: "Layout 1", value: "layout-1" },
        { text: "Layout 2", value: "layout-2" },
        { text: "Layout 3", value: "layout-3" },
      ],
    };
  },
  computed: {
    ...mapGetters(["activeDashboard", "channel", "channels"]),
  },
  methods: {
    ...mapActions(["fetchChannel", "fetchDashboard"]),
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
  },
  beforeMount() {
    if (this.$route.params.dashboardId != "new") {
      this.fetchDashboard(this.$route.params.dashboardId);
    }

    this.fetchChannel(this.$route.params.channelId);
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
</style>
