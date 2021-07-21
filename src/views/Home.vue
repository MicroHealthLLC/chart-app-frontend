<template>
  <v-row>
    <v-col class="col-9">
      <!-- PUBLIC REPORTS -->
      <h3><router-link to="/public-reports">Public Reports</router-link></h3>
      <v-divider class="mb-4"></v-divider>

      <div class="grid">
        <ReportCard
          v-for="(report, index) in latestReports.public"
          :report="report"
          :key="index"
        ></ReportCard>
      </div>
      <div class="d-flex justify-end">
        <v-btn
          v-if="latestReports.public.length >= 6"
          to="/public-reports"
          class="d-flex-end"
          color="primary"
          text
          >View All</v-btn
        >
      </div>
      <!-- PERSONAL REPORTS -->
      <h3 class="mt-4">
        <router-link to="/personal-reports">Personal Reports</router-link>
      </h3>
      <v-divider class="mb-4"></v-divider>

      <div class="grid">
        <ReportCard
          v-for="(report, index) in latestReports.personal"
          :report="report"
          :key="index"
        ></ReportCard>
        <div class="d-flex justify-end">
          <v-btn
            v-if="latestReports.personal.length >= 6"
            to="/personal-reports"
            class="ml-auto"
            color="primary"
            text
            >View All</v-btn
          >
        </div>
      </div>
      <!-- GROUP REPORTS -->
      <h3 class="mt-4">
        <router-link to="/group-reports">Group Reports</router-link>
      </h3>
      <v-divider class="mb-4"></v-divider>

      <div class="grid">
        <ReportCard
          v-for="(report, index) in latestReports.group"
          :report="report"
          :key="index"
        ></ReportCard>
        <div class="d-flex justify-end">
          <v-btn
            v-if="latestReports.group.length >= 6"
            to="/group-reports"
            class="ml-auto"
            color="primary"
            text
            >View All</v-btn
          >
        </div>
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
          105
        </li>
        <li>
          <strong><v-icon small>mdi-menu</v-icon> Channels:</strong> 52
        </li>
        <li>
          <strong
            ><v-icon small>mdi-account-group</v-icon> Active Users:</strong
          >
          12
        </li>
      </ul>
      <h3 class="mt-4">News</h3>
      <v-divider class="mb-4"></v-divider>
      <v-card class="mb-2" color="info" dark
        ><v-card-title class="d-flex flex-row flex-nowrap"
          ><v-icon class="mr-3">mdi-account-circle</v-icon>
          <span
            ><h5>News Title 3</h5>
            <p class="text-caption mb-0">Christopher Calderon</p>
            <p class="text-caption mb-0">1 Month ago</p></span
          ></v-card-title
        ><v-divider></v-divider
        ><v-card-text class="text-caption"
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non eveniet
          dolore magnam delectus soluta quis, deserunt quod quisquam
          reprehenderit quam exercitationem quas commodi officia porro harum
          pariatur repellat sed minus!</v-card-text
        ></v-card
      ><v-card class="mb-2" color="info" dark
        ><v-card-title class="d-flex flex-row flex-nowrap"
          ><v-icon class="mr-3">mdi-account-circle</v-icon>
          <span
            ><h5>News Title 2</h5>
            <p class="text-caption mb-0">Christopher Calderon</p>
            <p class="text-caption mb-0">1 Month ago</p></span
          ></v-card-title
        ><v-divider></v-divider
        ><v-card-text class="text-caption"
          >Non eveniet dolore magnam delectus soluta quis, deserunt quod
          quisquam reprehenderit quam exercitationem quas commodi officia porro
          harum pariatur repellat sed minus!</v-card-text
        ></v-card
      >
      <v-card class="mb-2" color="info" dark
        ><v-card-title class="d-flex flex-row flex-nowrap"
          ><v-icon class="mr-3">mdi-account-circle</v-icon>
          <span
            ><h5>News Title 1</h5>
            <p class="text-caption mb-0">Christopher Calderon</p>
            <p class="text-caption mb-0">5 Month ago</p></span
          ></v-card-title
        ><v-divider></v-divider
        ><v-card-text class="text-caption"
          >Non eveniet dolore magnam delectus soluta quis, deserunt quod
          quisquam reprehenderit quam exercitationem quas commodi officia porro
          harum pariatur repellat sed minus!</v-card-text
        ></v-card
      >

      <v-btn class="float-right" to="/news" color="primary" text
        >More News</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import ReportCard from "./../components/ReportCard";

export default {
  name: "Home",
  components: {
    ReportCard,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["latestReports"]),
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
</style>
