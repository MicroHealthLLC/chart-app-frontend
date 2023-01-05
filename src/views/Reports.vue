<template>
    <v-row>
      <v-dialog v-model="showReportGroupForm" width="30%" >
      <v-card class="px-4 py-4 modal">  
          <v-text-field
            label="Report Group Name"
            v-model="reportGroup.title"
            placeholder="Report Group Name"
            outlined
          ></v-text-field>
        <v-divider></v-divider>  
        <v-select
          v-model="reportGroup.reports"       
          item-text="title"       
          item-value="id"  
          multiple        
          chips
          :items="channelReports"
          :disabled="!channelReports.length > 1"
          label="Select Reports"
          outlined
        ></v-select>
        <v-btn color="primary" large class="d-block margin-auto" @click.prevent="saveReportGroup">Save Report Group</v-btn>
      </v-card> 
      <!-- <span v-else>NO DATA</span> -->

    </v-dialog>
      <v-col class="col-11">
          <div class="d-flex justify-space-between">
            <h3><v-icon class="mr-2 pb-2" color="orange darken-2">mdi-chart-box-outline</v-icon>Reports</h3>
            <span><v-btn class="mb-2 mr-1" color="primary" small @click.prevent="toNewReport">Add Report <v-icon
              small>mdi-plus</v-icon></v-btn> <v-btn class="mb-2" color="success" small @click.prevent="createReportGroup">Create Report Group <v-icon
              small class="pl-1">mdi-folder-multiple</v-icon></v-btn></span>
          </div>  
        <v-divider class="mb-4"></v-divider>
        <div v-if="channelReports.length > 0" class="grid">
          <ReportCard
            v-for="(report, index) in channelReports"
            :report="report"
            :key="index"
          ></ReportCard>
          <div class="d-flex justify-end btn-container">
            <v-btn
              v-if="reports.length >= 6"
              to="/public-reports"
              class="d-flex-end"
              color="primary"
              text
              >View All</v-btn
            >
          </div>
        </div>
        <div
          v-else
          class="placeholder d-flex flex-column justify-center align-center"
        >
          <p class="font-weight-light">No Reports on this Channel yet...</p>
          <v-btn text small color="primary" :to="`reports/add-report`">Add a Report</v-btn>
        </div>
      </v-col>
    </v-row>
  </template>
  
  <script>
import { mapActions, mapGetters, mapMutations } from "vuex";
  // import NewsCard from "../components/NewsCard";
  import ReportCard from "./../components/ReportCard";
  
  export default {
    name: "Home",
    components: {
      ReportCard,  
    },
    data() {
    return {
      showReportGroupForm: false, 
    };
  },
    computed: {
      ...mapGetters(["channels", "news", "reports", "user", "dataSets", "currentChannel", "currentChannels", "reportGroups", "reportGroup"]),
       reportCount() {
        return (
          this.reports.length
        );
      },
      channelReports(){
        if (this.reports && this.reports.length > 0){
          return this.reports.filter(t => t.channelId == this.currentChannels[0].channelId)
        } else return []
      },
    },
    methods: {
      ...mapActions(["fetchNews", "fetchReports", "fetchCurrentUser", "fetchDataSets", "fetchReportGroups", "addReportGroup"]),
      ...mapMutations(["SET_REPORT"]),
      toNewReport(){
        this.$router.push("reports/add-report"); 
      },
      saveReportGroup() {  
        let data = {
          title: this.reportGroup.title,
          reports: [{id: this.reportGroup.reports[0]}]
        };     
        console.log(data)  
        this.addReportGroup(data);
      },
      createReportGroup(){
      this.showReportGroupForm = true
    },
    },
    mounted() {
      this.fetchReports();
      this.fetchReportGroups();
      this.fetchDataSets();
    //  console.log(this.user)
    },
    watch:{
    reports(){
        console.log(this.channelReports)
        console.log(this.reportGroups)
      },
    reportGroup(){
      console.log(this.reportGroup.title)
    }
    }
  
  };
  </script>
  
  <style scoped>
  .v-application a {
    text-decoration: none;
    color: unset;
  }
  .details {
    list-style: none;
    margin: 0;
    padding: 0;
    transition: ease;
  }
  .v-card__title {
    line-height: 1;
    word-break: normal;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  .btn-container {
    width: 100%;
  }
  .placeholder {
    height: 150px;
  }
  .btn-container {
    grid-column: 1 / span 3;
  }
  h3 a:hover {
    color: #1976d2;
  }
  </style>
  