<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3 v-if="activeReport.title">{{ activeReport.title }}</h3>
        <h3 v-else class="placeholder-title">(Report Title)</h3>
        <div>
          <v-btn
            class="px-5 mr-2 mb-2"
            color="primary"
            @click="saveReport"
            depressed
            small
            >Save</v-btn
          >
          <v-btn class="mb-2" @click="$router.go(-1)" outlined small
            >Back</v-btn
          >
        </div>
      </div>

      <v-divider class="mb-4"></v-divider>

      <v-alert
        v-if="!formValid && submitAttempted"
        type="error"
        dense
        dismissible
        >Please fix highlighted fields below before sumbitting Report</v-alert
      >

      <v-card class="pa-4 mb-4">
        <v-btn @click="fullscreenReport" class="chart-menu" icon>
          <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <!-- Chart -->
        <Component
          v-if="activeReport.id || activeReport.data_set.id"
          ref="chart"
          :is="graphType"
          :chartData="activeReport.data_set.data"
          :graphType="activeReport.chart_type"
          :height="350"
          :title="activeReport.title"
          class="mb-4"
        >
        </Component>
        <!-- Placeholder -->
        <div
          v-else
          class="place-holder d-flex justify-center align-center ma-4"
        >
          <p class="text-center placeholder-text mb-0">
            <v-icon class="placeholder-icon">mdi-chart-areaspline</v-icon>
            Please load a data set to view preview...
          </p>
        </div>
        <!-- Category Toggle Button -->
        <div class="d-flex justify-end mb-4">
          <v-btn
            v-if="
              activeReport.data_set.data[0] &&
              Object.keys(activeReport.data_set.data[0]).length > 2 &&
              circleChart
            "
            @click="changeChartData"
            outlined
            small
            >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
      </v-card>

      <h3>Report Details</h3>
      <v-divider class="mb-8"></v-divider>
      <!-- Form Fields -->
      <v-form v-model="formValid" ref="form"
        ><div class="grid">
          <div>
            <v-text-field
              v-model="activeReport.title"
              label="Title"
              dense
              required
              :rules="[(v) => !!v || 'Title is required']"
            ></v-text-field>
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
              v-model="activeReport.channel_id"
              :items="channels"
              item-text="title"
              item-value="id"
              label="Channel"
              dense
              required
              :rules="[(v) => !!v || 'Channel is required']"
              :readonly="newChannelReport"
            ></v-select>
          </div>
          <div>
            <v-text-field
              value="Christopher Calderon"
              label="Last Updated By"
              dense
            ></v-text-field>
          </div>
          <div>
            <v-select
              v-model="activeReport.data_set_id"
              :items="dataSets"
              item-text="title"
              item-value="id"
              label="Data Set"
              dense
              @change="updateChartData"
              required
              :rules="[(v) => !!v || 'Data Set is required']"
            ></v-select>
          </div>
          <div>
            <v-select
              v-model="activeReport.chart_type"
              :items="chartTypes"
              item-text="text"
              item-value="value"
              label="Chart Type"
              dense
            ></v-select>
          </div>
          <div class="description">
            <v-textarea
              v-model="activeReport.description"
              label="Description"
              rows="1"
              auto-grow
              dense
            ></v-textarea>
          </div>
          <div class="tags">
            <v-select
              v-model="activeReport.tags"
              :items="tags"
              item-text="title"
              item-value="id"
              chips
              color="info"
              label="Tags"
              multiple
              deletable-chips
              return-object
              dense
            >
            </v-select>
          </div></div
      ></v-form>
      <!-- Delete Button -->
      <div v-if="activeReport.id" class="d-flex justify-end mt-4">
        <v-btn
          @click="deleteDialog = true"
          small
          color="error"
          depressed
          outlined
          >Delete Report</v-btn
        >
      </div>
      <!-- Delete Prompt -->
      <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
          <v-card-title>Delete {{ activeReport.title }}?</v-card-title>
          <v-divider class="mx-4 mb-2"></v-divider>
          <v-card-text
            >Are you sure you would like to delete this report?</v-card-text
          >
          <v-card-actions class="d-flex justify-end">
            <v-btn
              @click="deleteDialog = false"
              small
              outlined
              color="secondary"
              >Cancel</v-btn
            >
            <v-btn @click="removeReport" small depressed color="error"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Fullscreen Report Modal -->
      <v-dialog v-model="fullscreen" fullscreen eager>
        <v-card>
          <v-toolbar class="px-5" color="info" dark>
            <h3>{{ activeReport.title }}</h3>
            <v-spacer></v-spacer>
            <v-btn @click="fullscreen = false" icon
              ><v-icon>mdi-close-thick</v-icon></v-btn
            >
          </v-toolbar>
          <Component
            v-show="fullscreen"
            ref="fullscreenchart"
            :is="graphType"
            :chartData="activeReport.data_set.data"
            :graphType="activeReport.chart_type"
            :height="screenHeight"
            :title="activeReport.title"
            class="pa-6"
          >
          </Component>
          <!-- Category Toggle Button -->
          <div class="d-flex justify-end pr-6">
            <v-btn
              v-if="
                activeReport.data_set.data[0] &&
                Object.keys(activeReport.data_set.data[0]).length > 2 &&
                circleChart
              "
              @click="changeChartData"
              outlined
              small
              >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
            >
          </div>
        </v-card>
      </v-dialog>
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
  name: "Report",
  data() {
    return {
      formValid: true,
      submitAttempted: false,
      deleteDialog: false,
      fullscreen: false,
      chartTypes: [
        { text: "Line", value: "line" },
        { text: "Curve", value: "curve" },
        { text: "Area", value: "area" },
        { text: "Bar", value: "bar" },
        { text: "Radar", value: "radar" },
        { text: "Donut", value: "donut" },
        { text: "Pie", value: "pie" },
        { text: "Polar Area", value: "polar-area" },
        { text: "Table", value: "table" },
      ],
    };
  },
  methods: {
    ...mapActions([
      "fetchDataSets",
      "fetchReport",
      "fetchTags",
      "addReport",
      "updateReport",
      "deleteReport",
    ]),
    ...mapMutations([
      "SET_ACTIVE_REPORT",
      "SET_REPORT_DATA_SET",
      "SET_STATUS_CODE",
    ]),
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);

      this.$refs.fullscreenchart.index =
        (this.$refs.fullscreenchart.index + 1) %
        (Object.keys(this.$refs.fullscreenchart.chartData[0]).length - 1);
    },
    saveReport() {
      this.$refs.form.validate();
      this.submitAttempted = true;

      if (this.formValid) {
        let data = {
          title: this.activeReport.title,
          description: this.activeReport.description,
          channel_id: this.activeReport.channel_id,
          chart_type: this.activeReport.chart_type,
          data_set_id: this.activeReport.data_set_id,
          tag_ids: this.activeReport.tags.map((tag) => tag.id),
        };

        if (this.activeReport.id) {
          data.id = this.activeReport.id;
          this.updateReport(data);
        } else {
          this.addReport(data);
        }
      }
    },
    updateChartData() {
      let dataSet = this.dataSets.find(
        (dataSet) => dataSet.id == this.activeReport.data_set_id
      );
      this.SET_REPORT_DATA_SET(dataSet);
    },
    removeReport() {
      this.deleteReport(this.activeReport.id);
      this.$router.push(`/channels/${this.$route.params.channelId}/reports`);
    },
    fullscreenReport() {
      this.fullscreen = true;
      setTimeout(() => {
        this.$refs.fullscreenchart.loadChart();
      }, 100);
    },
  },
  computed: {
    ...mapGetters([
      "activeDataSet",
      "activeReport",
      "channels",
      "channelReports",
      "dataSets",
      "tags",
      "statusCode",
    ]),
    graphType() {
      if (this.activeReport.chart_type === "line") {
        return LineChart;
      } else if (this.activeReport.chart_type === "bar") {
        return BarChart;
      } else if (this.activeReport.chart_type === "radar") {
        return RadarChart;
      } else if (this.activeReport.chart_type === "donut") {
        return DoughnutChart;
      } else if (this.activeReport.chart_type === "pie") {
        return PieChart;
      } else if (this.activeReport.chart_type === "polar-area") {
        return PolarAreaChart;
      } else if (this.activeReport.chart_type === "table") {
        return Table;
      } else {
        return LineChart;
      }
    },
    circleChart() {
      return (
        this.activeReport.chart_type == "donut" ||
        this.activeReport.chart_type == "pie" ||
        this.activeReport.chart_type == "polar-area"
      );
    },
    newChannelReport() {
      return this.$route.params.reportId == "new";
    },
    screenHeight() {
      return window.innerHeight - 200;
    },
  },
  beforeMount() {
    if (this.$route.name == "Report" && this.$route.params.reportId != "new") {
      this.fetchReport(this.$route.params.reportId);
    } else if (this.$route.name == "Report") {
      this.SET_ACTIVE_REPORT({
        title: "",
        description: "",
        chart_type: "line",
        data_set: { data: [] },
        channel_id: parseInt(this.$route.params.channelId),
        tags: [],
      });
    } else {
      this.SET_ACTIVE_REPORT({
        title: "",
        description: "",
        chart_type: "line",
        data_set: { data: [] },
        tags: [],
      });
    }
    // TODO: Combine API calls below into one
    this.fetchDataSets();
    this.fetchTags();

    // this.chartOptions.title.text[0] = this.activeReport.title;
  },
  watch: {
    statusCode() {
      if (this.statusCode == 201) {
        this.$router.push(
          `/channels/${this.$route.params.channelId}/reports/${this.activeReport.id}`
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
.description,
.tags {
  grid-column: 1 / span 2;
}
.placeholder-title {
  color: gray;
}
.place-holder {
  height: 300px;
}
.placeholder-text,
.placeholder-icon {
  color: #1976d2;
}
.chart-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
