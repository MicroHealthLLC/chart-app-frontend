<template>
    <v-row>
      <v-col class="col-11">
          <div class="d-flex justify-space-between">
            <h3><v-icon class="mr-2 pb-2" color="orange darken-2">mdi-chart-box-outline</v-icon>Reports</h3>
            <v-btn class="mb-2" color="primary" small @click.prevent="toNewReport">Add Report <v-icon
              small>mdi-plus</v-icon></v-btn>
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
      // NewsCard,
    },
    computed: {
      ...mapGetters(["channels", "news", "reports", "user", "dataSets", "currentChannel", "currentChannels"]),
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
      ...mapActions(["fetchNews", "fetchReports", "fetchCurrentUser", "fetchDataSets"]),
      ...mapMutations(["SET_REPORT"]),
      toNewReport(){
        this.$router.push("reports/add-report"); 
      },
    },
    mounted() {
      this.fetchReports();
      this.fetchDataSets();
    //  console.log(this.user)
    },
    watch:{
    reports(){
        console.log(this.channelReports)
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
  