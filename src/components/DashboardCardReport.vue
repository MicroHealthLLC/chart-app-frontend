<template>
  <!-- <v-row > -->
  <!-- <v-col cols="12" sm="5" v-for="(report, i) in channelReports" :key="i"> -->
  <span>
    <!-- <v-skeleton-loader v-if="$store.getters.loading" class="mx-auto" type="card, article"></v-skeleton-loader> -->

    <span v-if="data && data.length > 0">
      <fullscreen v-if="!fullscreen" v-model="fullscreenR" :class="fullscreenR ? 'pa-6' : ''">
        <span class="d-flex align-center">
          <h4>{{ report.title }}</h4>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-4" icon @click.prevent="toReport(report.id)" v-bind="attrs" v-on="on">
                <v-icon small>fa-solid fa-up-right-from-square</v-icon>
              </v-btn>
            </template>
            <span>Go to Report</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-4" icon @click="reveal = true" v-bind="attrs" v-on="on"><v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </template>
            <span>See Notes</span>
          </v-tooltip>
          <v-tooltip top v-if="!isReadOnly">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-4" icon @click.prevent="$emit('deleteItem', report.id)" v-bind="attrs" v-on="on"><v-icon
                  small color="red">fa-trash</v-icon>
              </v-btn>
            </template>
            <span>Remove from Dashboard</span>
          </v-tooltip>
        </span>
        <!-- <fullscreen v-if="!fullscreen" v-model="fullscreenR"> -->
        <span v-if="fullscreenR">
          <v-btn @click="fullscreenReport" class="chart-menu" icon>
            <v-icon>{{ fullscreenR ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
          </v-btn>
          <Component ref="chart" :is="graphType(report)" :chartData="data" :chartColors="
            colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
          " :graphType="report.chartType" class="mb-4" :height="screenHeight">
          </Component>
          <div class="d-flex justify-end mb-4">
            <v-btn v-if="circleChart" @click="changeChartData" outlined small>Next Category<v-icon
                small>mdi-arrow-right</v-icon></v-btn>
          </div>
        </span>
        <span v-else>
          <v-btn @click="fullscreenReport" class="chart-menu" icon>
            <v-icon>{{ fullscreenR ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
          </v-btn>
          <Component ref="chart" :is="graphType(report)" :chartData="data" :chartColors="
            colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
          " :graphType="report.chartType" class="mb-4" :height="reportHeight">
          </Component>
          <div class="d-flex justify-end mb-4">
            <v-btn v-if="circleChart" @click="changeChartData" outlined small>Next Category<v-icon
                small>mdi-arrow-right</v-icon></v-btn>
          </div>
        </span>
      </fullscreen>
      
      <span v-else-if="fullscreen && !fullscreenD" >
        <span class="d-flex align-center">
        <h4>{{ report.title }}</h4>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-4" icon @click.prevent="toReport(report.id)" v-bind="attrs" v-on="on">
                <v-icon small>fa-solid fa-up-right-from-square</v-icon>
              </v-btn>
            </template>
            <span>Go to Report</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ml-4" icon @click="reveal = true" v-bind="attrs" v-on="on"><v-icon>mdi-chevron-up</v-icon>
              </v-btn>
            </template>
            <span>See Notes</span>
          </v-tooltip></span>
        <!-- <v-btn @click="fullscreenDialog" class="chart-menu" icon>
          <v-icon>mdi-arrow-expand</v-icon>
        </v-btn> -->
        <Component ref="chart" :is="graphType(report)" :chartData="data" :chartColors="
          colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
        " :graphType="report.chartType" class="mb-4" :height="reportHeight">
        </Component>
        <div class="d-flex justify-end mb-4">
          <v-btn v-if="circleChart" @click="changeChartData" outlined small>Next Category<v-icon
            small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </span>
        <!-- <v-dialog v-model="fullscreenD" fullscreen eager> -->

        <!-- </v-dialog> -->
      <!-- 
      <div v-else-if="fullscreen && fullscreenD"> -->
        <!-- <v-toolbar class="px-5" color="info" dark>
          <h3>{{ report.title }}</h3>
          <v-spacer></v-spacer>
          <v-btn @click="fullscreenD = false" icon><v-icon>mdi-close-thick</v-icon></v-btn>
        </v-toolbar> -->
        <!-- <v-btn @click="fullscreenD = false" class="chart-menu" icon>
          <v-icon>mdi-arrow-collapse</v-icon>
        </v-btn>
        <Component ref="fullscreenchart" :is="graphType(report)" :chartData="data" :chartColors="
          colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
        " :graphType="report.chartType" :title="report.title" class="pa-6">
        </Component>

        <div class="d-flex justify-end pr-6">
          <v-btn v-if="circleChart" @click="changeFSChartData" outlined small>Next Category <v-icon
              small>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </div> -->
      <!-- <v-card v-else height="100vh">
          <v-toolbar class="px-5" color="info" dark>
            <h3>{{ report.title }}</h3>
            <v-spacer></v-spacer>
            <v-btn @click="fullscreenR = false" icon><v-icon>mdi-close-thick</v-icon></v-btn>
          </v-toolbar>
          <Component v-if="fullscreenR" ref="fullscreenchart" :is="graphType(report)" :chartData="data" :chartColors="
            colors.find((scheme) => scheme.id == report.colorSchemeId).scheme
          " :graphType="report.chartType" :height="screenHeight" :title="report.title" class="pa-6">
          </Component>
          
          <div class="d-flex justify-end pr-6">
            <v-btn v-if="circleChart" @click="changeFSChartData" outlined small>Next Category fullscreenReport<v-icon
                small>mdi-arrow-right</v-icon></v-btn>
          </div>
        </v-card> -->
    </span>

    <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal" style="height: 100%">
      <v-card-text class="pb-0">
        {{ report.description }}
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ml-0 mt-2" icon @click="reveal = false" v-bind="attrs"
              v-on="on"><v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <span>Hide Notes</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </span>
  <!-- </v-col> -->
  <!-- </v-row> -->
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
import datasetMixin from "../mixins/dataset-mixin";
import reportMixin from "../mixins/report-mixin";

export default {
  name: "DashboardCardReport",
  props: {
    report: Object,
    isReadOnly: Boolean,
    fullscreen: Boolean,
  },
  data() {
    return {
      formValid: true,
      showForm: false,
      hhh: [],
      submitAttempted: false,
      deleteDialog: false,
      fullscreenR: false,
      fullscreenD: false,
      reportHeight: 0,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
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
      //report: {},
      colorScheme: [],
      data: [],
      reveal: false,
    };
  },
  mixins: [datasetMixin, reportMixin],
  computed: {
    ...mapGetters([
      "activeDataSet",
      "activeReport",
      "channels",
      "currentChannel",
      "currentChannels",
      "currentChannel",
      "colors",
      "reports",
      "channelDataSets",
      "dataSets",
      "dataSet",
      "reportLoaded",
      "tags",
      "statusCode",
      "user",
    ]),
    circleChart() {
      return (
        this.report.chartType == "donut" ||
        this.report.chartType == "pie" ||
        this.report.chartType == "polar-area"
      );
    },
    newChannelReport() {
      return this.$route.params.reportId == "new";
    },
    screenHeight() {
      console.log(window)
      return window.innerHeight - 110;
    },
  },
  methods: {
    ...mapActions([
      "fetchReport",
      "fetchReports",
      "fetchDataSets",
      "fetchDataSet",
      "fetchTags",
      "addReport",
      "updateReportById",
      "deleteReport",
      "updateChannelById",
    ]),
    ...mapMutations(["SET_REPORT_DATASET", "SET_STATUS_CODE", "SET_REPORT"]),
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    toReport(id) {
      this.$router.replace(`/${this.currentChannels[0].name}/reports/${id}`);
    },
    addDashboard() {
      this.showForm = true;
    },
    // log(e){
    // console.log(e)
    // },
    changeFSChartData() {
      this.$refs.fullscreenchart.index =
        (this.$refs.fullscreenchart.index + 1) %
        (Object.keys(this.$refs.fullscreenchart.chartData[0]).length - 1);
    },
    resetAndGoBack() {
      this.$router.go(-1);
      this.$refs.form.reset();
    },
    graphType(report) {
      if (report.chartType === "line") {
        return LineChart;
      } else if (report.chartType === "bar") {
        return BarChart;
      } else if (report.chartType === "radar") {
        return RadarChart;
      } else if (report.chartType === "donut") {
        return DoughnutChart;
      } else if (report.chartType === "pie") {
        return PieChart;
      } else if (report.chartType === "polar-area") {
        return PolarAreaChart;
      } else if (report.chartType === "table") {
        return Table;
      } else {
        return LineChart;
      }
    },
    saveReport() {
      this.$refs.form.validate();
      this.submitAttempted = true;
      if (this.formValid) {
        let data = {
          title: this.activeReport.title,
          description: this.activeReport.description,
          channelId: this.currentChannel.id,
          chartType: this.activeReport.chartType,
          dataSetId: this.activeReport.dataSetId,
          // dataSet: this.activeReport.dataSet,
          // tag_ids: this.activeReport.tags.map((tag) => tag.id),
          colorSchemeId: this.activeReport.colorSchemeId,
          // last_updated_by: `${this.user.first_name} ${this.user.last_name}`,
        };

        if (this.activeReport.id) {
          data.id = this.activeReport.id;
          this.updateReportById(data);

          // this.updateChannelById({
          //  id:  this.activeReport.channelId,
          //  reports: [this.activeReport]
          // });
        } else {
          console.log(data);
          // data.user_id = this.user.id;
          this.addReport(data);
        }
      }
    },
    async updateChartData() {
      /* if (this.channelReports && this.channelReports.length) {
        console.log(this.dataSet)
        let dataSetIds = this.channelReports.map(t => t.dataSetId)
        console.log(dataSetIds)
        
        for (var i = 0; i < this.channelReports.length; i++) { */
      await this.fetchDataSet(this.report.dataSetId);
      let ds = this.dataSet;
      let headers = Object.keys(ds.dataValues.items[0].data[0]);
      //console.log(headers)
      headers.forEach((k, j) => {
        if (k == this.report.xAxis) {
          /* console.log(k)
          console.log("true", this.report.xAxis) */
          this.arrayMove(headers, j, 0);
        }
      });
      let newHeaders = [];
      //console.log(this.report)
      if (this.report.columns && this.report.columns.length > 0) {
        newHeaders = JSON.parse(this.report.columns);
      } else {
        newHeaders = headers.map((item) => ({
          text: item,
          value: item,
        }));
      }
      /* newHeaders = headers.map((item) => ({
        text: item,
        value: item,
      })); */
      //console.log(newHeaders)
      this.data = this.createMasterData(ds.dataValues.items);
      this.data = this.filterData(newHeaders, this.data);
      this.SET_REPORT_DATASET(ds);
      //}

      //}
    },
    fullscreenReport() {
      this.fullscreenR = this.fullscreenR ? false : true;
      /* setTimeout(() => {
        this.$refs.fullscreenchart.loadChart();
      }, 100); */
    },
    fullscreenDialog() {
      this.fullscreenD = true
    },
    updateColors(selectedSchemeId) {
      this.colorScheme = this.colors.find(
        (color) => selectedSchemeId == color.id
      ).scheme;
    },
  },
  mounted() {
    // this.updateChartData();
    this.fetchReports();
    this.fetchDataSets();
    this.updateChartData();
    console.log(this)
    setTimeout(() => {
        if (this.$parent.$parent.$el.clientHeight != 0) {
          this.reportHeight = this.$parent.$parent.$el.clientHeight - 100
        }
        
        console.log(this.reportHeight)
      }, 100);
  },
  watch: {
    dataSets() {
      this.dataSetChoices = [...this.dataSets];
    },
    data() {
      if (this.data.length > 0) {
        return this.data;
      }
    },
    report() {
      this.updateChartData();
    },
    fullscreenR() {
      console.log(this.fullscreenR)
      /* if (this.fullscreenR) {
        this.reportHeight = this.screenHeight
      } else {
        this.reportHeight = 400
      } */
      this.updateChartData()
    },
    reportHeight() {
      //this.updateChartData();
    }
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 80vh;

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

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 350px;
  min-height: 180px;
}

.no-content-msg {
  font-size: larger;
  font-style: italic;
  font-weight: 400;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.margin-auto {
  margin: auto !important;
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
}</style>
