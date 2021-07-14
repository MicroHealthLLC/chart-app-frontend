<template>
  <v-row>
    <v-col class="col-9">
      <!-- PUBLIC REPORTS -->
      <h3><router-link to="/public-reports">Public Reports</router-link></h3>
      <v-divider class="mb-4"></v-divider>

      <div
        class="
          d-flex
          flex-row flex-wrap
          justify-space-between
          align-content-space-between
        "
      >
        <ReportCard
          v-for="(report, index) in publicReports"
          :report="report"
          :key="index"
        ></ReportCard>

        <v-btn
          v-if="publicReports.length >= 6"
          class="ml-auto"
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

      <div
        class="
          d-flex
          flex-row flex-wrap
          justify-space-between
          align-content-space-between
        "
      >
        <ReportCard
          v-for="(report, index) in personalReports"
          :report="report"
          :key="index"
        ></ReportCard>

        <v-btn
          v-if="personalReports.length >= 6"
          class="ml-auto"
          color="primary"
          text
          >View All</v-btn
        >
      </div>
      <!-- GROUP REPORTS -->
      <h3 class="mt-4">
        <router-link to="/group-reports">Group Reports</router-link>
      </h3>
      <v-divider class="mb-4"></v-divider>

      <div
        class="
          d-flex
          flex-row flex-wrap
          justify-space-between
          align-content-space-between
        "
      >
        <ReportCard
          v-for="(report, index) in groupReports"
          :report="report"
          :key="index"
        ></ReportCard>

        <v-btn
          v-if="groupReports.length >= 6"
          class="ml-auto"
          color="primary"
          text
          >View All</v-btn
        >
      </div>
    </v-col>
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

      <v-btn class="float-right" to="/news" color="primary" text>More News</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import ReportCard from "./../components/ReportCard";

export default {
  name: "Home",
  components: {
    ReportCard,
  },
  data() {
    return {
      publicReports: [
        {
          title: "Report 1",
          data_set: "Data Set 1",
          channel: "Channel 1",
          date: "June 15, 2021",
          tags: ["Employee Data", "Company Reports"],
          chart_type: "line",
        },
        {
          title: "Report 2",
          data_set: "Data Set 2",
          channel: "Channel 2",
          date: "June 16, 2021",
          tags: ["Monthly", "Sales"],
          chart_type: "pie",
        },
        {
          title: "Report 3",
          data_set: "Data Set 3",
          channel: "Channel 3",
          date: "June 17, 2021",
          tags: ["Weekly", "Sales"],
          chart_type: "bar",
        },
        {
          title: "Report 4",
          data_set: "Data Set 4",
          channel: "Channel 4",
          date: "June 10, 2021",
          tags: ["Employee Data"],
          chart_type: "donut",
        },
        {
          title: "Report 5",
          data_set: "Data Set 5",
          channel: "Channel 5",
          date: "June 15, 2021",
          tags: ["Company Reports", "Weekly"],
          chart_type: "table",
        },
        {
          title: "Report 6",
          data_set: "Data Set 6",
          channel: "Channel 6",
          date: "June 18, 2021",
          tags: ["Performance", "Sales", "Monthly"],
          chart_type: "curve",
        },
      ],
      personalReports: [
        {
          title: "Report 7",
          data_set: "Data Set 7",
          channel: "Channel 7",
          date: "June 1, 2021",
          tags: ["Performance", "Sales", "Monthly"],
          chart_type: "curve",
        },
        {
          title: "Report 8",
          data_set: "Data Set 8",
          channel: "Channel 8",
          date: "June 3, 2021",
          tags: ["Sales", "Monthly"],
          chart_type: "donut",
        },
        {
          title: "Report 9",
          data_set: "Data Set 9",
          channel: "Channel 9",
          date: "June 3, 2021",
          tags: ["Sales", "Weekly"],
          chart_type: "pie",
        },
      ],
      groupReports: [
        {
          title: "Report 10",
          data_set: "Data Set 10",
          channel: "Channel 10",
          date: "June 29, 2021",
          tags: ["Employee Data", "Monthly"],
          chart_type: "pie",
        },
      ],
    };
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
</style>
