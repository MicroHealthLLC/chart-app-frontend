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


    <!-- DETAILS -->
    <!-- <v-col class="col-3">
      <h3>Details</h3>
      <v-divider class="mb-4"></v-divider>
      <ul class="text-caption details">
        <li>
          <strong
            ><v-icon small>mdi-file-chart-outline</v-icon> Total
            Reports:</strong
          >
          {{ reportCount }}
        </li>
        <li>
          <strong><v-icon small>mdi-menu</v-icon> Channels:</strong>
          {{ channels.length }}
        </li>
        <li>
          <strong
            ><v-icon small>mdi-account-group</v-icon> Active Users:</strong
          >
          1
        </li>
      </ul> -->
      <!-- NEWS -->
      <!-- <h3 class="mt-4"><router-link to="/news">News</router-link></h3>

      <v-divider class="mb-4"></v-divider>

      <NewsCard
        v-for="(newsReport, index) in news"
        :key="index"
        :newsReport="newsReport"
      ></NewsCard>

      <v-btn class="float-right" to="/news" color="primary" text
        >More News</v-btn
      >
    </v-col> -->
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
    ...mapGetters(["channels", "news", "reports", "user", "dataSets"]),
    reportCount() {
      return (
        this.reports.length
      );
    },
  },
  methods: {
    ...mapActions(["fetchNews", "fetchChannels", "fetchCurrentUser", "fetchDataSets"]),
  },
  beforeMount() {
  this.fetchChannels();  
   console.log(this.user)
  },
  watch:{
    reports(){
      console.log(this.reports)
    },
    dataSets() {
      console.log(this.dataSets)
    },
  }

};
</script>

<style scoped>
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
