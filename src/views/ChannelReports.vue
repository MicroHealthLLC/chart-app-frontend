<template>
  <v-row v-if="channel.reports">
    <v-col class="col-9">
      <div class="d-flex justify-space-between">
        <h3>
          {{ channel.title }}
        </h3>
        <v-btn
          class="px-5 mb-2"
          depressed
          color="primary"
          small
          :to="`/channels/${$route.params.channelId}/reports/new`"
          >New Report <v-icon right dark>mdi-plus</v-icon></v-btn
        >
      </div>

      <v-divider class="mb-4"></v-divider>

      <div v-if="channel.reports.length > 0" class="grid">
        <ReportCard
          v-for="(report, index) in channel.reports"
          :report="report"
          :key="index"
        ></ReportCard>
      </div>
      <div
        v-else
        class="placeholder d-flex flex-column justify-center align-center"
      >
        <p class="font-weight-light">No Reports to show...</p>
        <v-btn
          text
          small
          color="primary"
          :to="`/channels/${$route.params.channelId}/reports/new`"
          >Add a Report</v-btn
        >
      </div>
    </v-col>
    <!-- Details -->
    <v-col class="col-3">
      <div class="d-flex justify-space-between">
        <h3 class="mb-2">Details</h3>
        <v-btn @click="openForm" small color="primary" icon class="btn-bg"
          ><v-icon small>mdi-pencil</v-icon></v-btn
        >
      </div>

      <v-divider class="mb-4"></v-divider>

      <ChannelDetails
        :reportCount="channel.reports.length"
        :description="channel.description"
        :category="channel.category"
        :createdBy="`${channel.user.first_name} ${channel.user.last_name}`"
        :members="channel.members"
      />
      <!-- Dashboards -->
      <div class="d-flex justify-space-between mt-4">
        <h3 class="mb-2">
          <router-link :to="`/channels/${$route.params.channelId}/dashboards`"
            >Dashboards</router-link
          >
        </h3>
        <v-btn
          class="btn-bg"
          small
          icon
          color="primary"
          :to="`/channels/${$route.params.channelId}/dashboards/new`"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </div>

      <v-divider class="mb-4"></v-divider>

      <ul>
        <li v-for="(dashboard, index) in channel.dashboards" :key="index">
          <router-link
            :to="`/channels/${$route.params.channelId}/dashboards/${dashboard.id}`"
            ><v-icon small color="primary">mdi-monitor-dashboard</v-icon>
            {{ dashboard.title }}</router-link
          >
        </li>
      </ul>

      <v-btn
        class="mt-4"
        outlined
        small
        block
        :to="`/channels/${$route.params.channelId}/dashboards`"
        >All Dashboards</v-btn
      >
    </v-col>
    <!-- Modal Form -->
    <v-dialog v-model="showForm" width="50%">
      <ChannelModalForm @closeform="closeForm" />
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChannelDetails from "../components/ChannelDetails.vue";
import ChannelModalForm from "../components/ChannelModalForm";
import ReportCard from "./../components/ReportCard";

export default {
  name: "ChannelReports",
  data() {
    return {
      showForm: false,
    };
  },
  components: {
    ReportCard,
    ChannelModalForm,
    ChannelDetails,
  },
  computed: {
    ...mapGetters(["channel"]),
  },
  methods: {
    ...mapActions(["fetchChannel", "fetchUsers"]),
    openForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
  },
  beforeMount() {
    this.fetchChannel(this.$route.params.channelId);
    this.fetchUsers();
  },
  watch: {
    $route() {
      this.fetchChannel(this.$route.params.channelId);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
.placeholder {
  height: 150px;
}
h3 a,
a {
  text-decoration: none;
  color: unset;
}
h3 a:hover {
  color: #1976d2;
}
.btn-bg {
  background-color: lightgray;
}
</style>
