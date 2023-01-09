<template>
  <div>  
    <v-row class="mt-3">
      <v-divider></v-divider>
    <v-col class="col-12 text-center">
      <h4 class="mhOrange">Welcome to </h4>
      <span class="rmsLogoFont">
        mRMS
      </span>
      <v-icon color="orange darken-2" class="pb-5" x-large>mdi-chart-box-outline</v-icon>
   </v-col>
   </v-row>
  <v-row>
    <v-col class="col-12">
      <div v-if=" channels && channels.length > 0" class="grid">
       <v-card class="report-card" @click="toChannel">      
      <v-card-title>
        <!-- <v-icon class="mr-4" color="info">{{ chartIcon }}</v-icon> -->
        <span class="text-h6 font-weight-bold"  color="var(--mh-blue)">
          <v-icon color="green darken-2" class="pb-2 pr-1">mdi-television-classic</v-icon>All My Channels
        </span>
      </v-card-title>
      <v-divider></v-divider> 
    
      <v-list class="transparent px-2">
        <v-list-item    
      >
        <v-list-item-title>
          <v-icon color="blue darken-2">mdi-equalizer</v-icon>
          Datasets: </v-list-item-title>
        <v-list-item-subtitle class="text-right text-h6 text--primary" >
          <span class="pill px-2"> {{this.dataSets.length}}</span> 
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item    
      >
        <v-list-item-title>
          <v-icon color="orange darken-2">mdi-chart-box-outline</v-icon>
          Reports: </v-list-item-title>
        <v-list-item-subtitle class="text-right text-h6" v-if="this.reports">
      <span class="pill px-2"> {{this.reports.length}}</span>
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item    
      >
        <v-list-item-title>
          <v-icon color="cyan">mdi-monitor-dashboard</v-icon>
          Dashboard Items: </v-list-item-title>
        <v-list-item-subtitle class="text-right text-h6 text--primary">
          <span class="pill px-2">  0</span>
        </v-list-item-subtitle>
      </v-list-item>
     
    </v-list>
       </v-card>
        <ChannelCard
          v-for="(ch, index) in channels"
          :channel="ch"
          :key="index"
        ></ChannelCard>
        <div class="d-flex justify-end btn-container">
          <v-btn
            v-if="channels.length >= 6"
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
        <p class="font-weight-light">No Public Reports to show...</p>
        <v-btn text small color="primary" to="/add-report">Add a Report</v-btn>
      </div>
    </v-col>
  </v-row>
  </div>
 
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import NewsCard from "../components/NewsCard";
import ChannelCard from "./../components/ChannelCard";

export default {
  name: "Home",
  components: {
    ChannelCard,
    // NewsCard,
  },
  computed: {
    ...mapGetters(["channels", "news", "reports", "user", "dataSets", "currentChannels"]),
    reportCount() {
      return (
        this.reports.length
      );
    },
  },
  methods: {
    ...mapActions(["fetchNews", "fetchChannels", "fetchCurrentUser", "fetchDataSets", "fetchCurrentChannels", "removeCurrentChannel"]),
  },
  beforeMount() {
  this.fetchChannels(); 
  this.fetchCurrentChannels()
  },
  watch:{
    currentChannels(){
      if(this.currentChannels && this.currentChannels > 0 && this.currentChannels[0]){      
        console.log(this.currentChannels)  
       this.removeCurrentChannel({id: this.currentChannels[0].id})     
       }
    },
    // reports(){
    //   console.log(this.reports)
    // },
    // dataSets() {
    //   console.log(this.dataSets)
    // },
  }

};
</script>

<style scoped>
.report-card {
  width: 90%;
  border: 1px solid lightgray;
  border-left: 5px solid #dd9036 !important;
  margin-bottom: 10px;
}
.pill {
  background-color: #6c757d;
  border-radius: 50%;
  color: whitesmoke;
}

.rmsLogoFont{
  color: #1D336F;
  font-weight: 900;
  font-size: 2.8rem;
  font-style: italic;
  line-height: .8;
}
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
.mhOrange{
  color: #DD9036 !important;
  font-weight: 400;
  font-style: italic;
}
.v-card__title {
  line-height: 1;
  word-break: normal;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
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
