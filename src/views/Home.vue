<template>
  <v-row>
    <v-col class="col-9">
      <!-- PUBLIC REPORTS -->
      <h3><router-link to="/public-reports">Public Reports</router-link></h3>
      <v-divider class="mb-4"></v-divider>

      <div v-if="reports.public.length > 0" class="grid">
        <ReportCard
          v-for="(report, index) in reports.public"
          :report="report"
          :key="index"
        ></ReportCard>
        <div class="d-flex justify-end btn-container">
          <v-btn
            v-if="reports.public.length >= 6"
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
      <!-- PERSONAL REPORTS -->
      <h3 class="mt-4">
        <router-link to="/personal-reports">Personal Reports</router-link>
      </h3>
      <v-divider class="mb-4"></v-divider>

      <div v-if="reports.personal.length > 0" class="grid">
        <ReportCard
          v-for="(report, index) in reports.personal"
          :report="report"
          :key="index"
        ></ReportCard>
        <div class="d-flex justify-end btn-container">
          <v-btn
            v-if="reports.personal.length >= 6"
            to="/personal-reports"
            class="ml-auto"
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
        <p class="font-weight-light">No Personal Reports to show...</p>
        <v-btn text small color="primary" to="/add-report">Add a Report</v-btn>
      </div>
      <!-- GROUP REPORTS -->
      <h3 class="mt-4">
        <router-link to="/group-reports">Group Reports</router-link>
      </h3>
      <v-divider class="mb-4"></v-divider>

      <div v-if="reports.group.length > 0" class="grid">
        <ReportCard
          v-for="(report, index) in reports.group"
          :report="report"
          :key="index"
        ></ReportCard>
        <div class="d-flex justify-end btn-container">
          <v-btn
            v-if="reports.group.length >= 6"
            to="/group-reports"
            class="ml-auto"
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
        <p class="font-weight-light">No Group Reports to show...</p>
        <v-btn text small color="primary" to="/add-report">Add a Report</v-btn>
      </div>
    </v-col>
    <!-- DETAILS -->
    <v-col class="col-3">
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
      </ul>
      <!-- NEWS -->
      <h3 class="mt-4"><router-link to="/news">News</router-link></h3>

      <v-divider class="mb-4"></v-divider>

      <NewsCard
        v-for="(newsReport, index) in news"
        :key="index"
        :newsReport="newsReport"
      ></NewsCard>

      <v-btn class="float-right" to="/news" color="primary" text
        >More News</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NewsCard from "../components/NewsCard";
import ReportCard from "./../components/ReportCard";

export default {
  name: "Home",
  components: {
    ReportCard,
    NewsCard,
  },
  computed: {
    ...mapGetters(["channels", "news", "reports", "user"]),
    reportCount() {
      return (
        this.reports.public.length +
        this.reports.personal.length +
        this.reports.group.length
      );
    },
  },
  methods: {
    ...mapActions(["fetchNews", "fetchReports"]),
  },
  beforeMount() {
    // this.fetchReports();
    // this.fetchNews();
    // this.fetchCurrentUser();
    // console.log(this.user)
  },

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
