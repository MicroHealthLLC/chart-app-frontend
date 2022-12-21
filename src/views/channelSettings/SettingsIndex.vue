<template>
    <v-row :load="log(activeReport)">
      <v-col  class="col-11">     
        <div class="d-flex justify-space-between">
            <h3><v-icon  color="purple-grey darken-2 pr-2">mdi-cog-outline</v-icon>Channel Settings</h3>
            <!-- <v-btn class="mb-2" color="primary" small @click.prevent="toNewReport">Add Dashboard <v-icon
            small>mdi-plus</v-icon></v-btn> -->
        </div>  
        <v-divider class="mb-4"></v-divider>
        <v-card class="pa-4 mb-4 col-4">
         <v-icon  color="blue-grey darken-2" class="bigIcons">mdi-account</v-icon>
         PERSONAL INFO
        </v-card>       
        <v-card class="pa-4 mb-4 col-4">
        <v-icon  color="blue-grey darken-2" class="bigIcons">mdi-account-group</v-icon>
          USERS
        </v-card>
        <v-card class="pa-4 mb-4 col-4">
         <v-icon  color="blue-grey darken-2" class="bigIcons">mdi-account-lock</v-icon>
         PERMISSIONS & ROLES
        </v-card>   
        <v-card class="pa-4 mb-4 col-4">
        <v-icon  color="blue-grey darken-2" class="bigIcons">mdi-television-classic</v-icon>
         CHANNELS
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import { mapActions, mapGetters, mapMutations } from "vuex";
//   import LineChart from "../../components/LineChart.vue"
//   import BarChart from "../../components/BarChart";
//   import RadarChart from "../../components/RadarChart";
//   import DoughnutChart from "../../components/DoughnutChart";
//   import PieChart from "../../components/PieChart";
//   import PolarAreaChart from "../../components/PolarAreaChart";
//   import Table from "../../components/Table";
  import datasetMixin from "../../mixins/dataset-mixin";
  import reportMixin from "../../mixins/report-mixin";
  
  export default {
    name: "SettingsIndex",
    data() {
      return {     
      };
    },
    mixins: [datasetMixin, reportMixin],
    methods: {
      ...mapActions([
        "fetchReport",
        "fetchDataSets",
        "fetchDataSet",
        "fetchTags",
        "addReport",
        "updateReportById",
        "deleteReport",
        "updateChannelById"
      ]),
      ...mapMutations(["SET_REPORT_DATASET", "SET_STATUS_CODE", "SET_REPORT"]),
      log(e){
      console.log(e)
      }, 
     
   
    
    },
    computed: {
      ...mapGetters([
        "activeDataSet",
        "activeReport",
        "channels",
        "currentChannel",
        "channelReports",
        "currentChannel",
        "colors",
        "channelDataSets",
        "dataSets",
        "dataSet",
        "reportLoaded",
        "tags",
        "statusCode",
        "user",
      ]),
   
  
      createdBy() {
        if (this.activeReport && this.activeReport.id && this.user && this.user.attributes) {
          return `${this.user.attributes.given_name} ${this.user.attributes.family_name} on ${new Date(this.activeReport.createdAt).toLocaleString()}`;
        } else {
          return `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
        }
      },
      updatedBy() {
        if (this.activeReport && this.activeReport.id) {
          return `${this.user.attributes.given_name}  ${this.user.attributes.family_name} on ${new Date(this.activeReport.updatedAt).toLocaleString()}`;
        } else {
          return `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
        }
      },
    },
    async beforeMount() {
      if(this.dataSets && this.dataSets.length < 1){
        await this.fetchDataSets();
      } 
      
    },
    async mounted() {
      // this.colorScheme = this.colors.find(
      //   (scheme) => scheme.id == this.activeReport.colorSchemeId
      // ).scheme;
      if (this.activeReport && this.activeReport.id) {
        // await this.fetchReport(this.$route.params.reportId);
        this.updateChartData();
      }
      if (this.$route.name == "Report") {
        this.dataSetChoices = [...this.dataSets];
      } else {
        this.dataSetChoices = [...this.dataSets]; // was ...this.channelDataSets
      }
    },
    watch: {
      activeReport() {
        // this.colorScheme = this.colors.find((scheme) => scheme.id == this.activeReport.colorSchemeId).scheme;
        //console.log(this.activeReport.colorSchemeId)
        console.log(this.$route) 
  
          console.log(this.newReport)
          if(!this.activeReport){
           this.SET_REPORT(this.newReport)
            console.log("No Active Report")
          }
      },
      dataSets() {
        this.dataSetChoices = [...this.dataSets];
      },
    },
  };
  </script>
  
  <style scoped>

  .bigIcons {
    font-size: 2.8rem;
    padding-right: 10px;
  }
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