<template>
  <v-row>
    <v-col class="col-9">
      <h3>{{ channel.title }}</h3>
      <v-divider class="mb-4"></v-divider>
      <div class="grid">
        <ReportCard
          v-for="(report, index) in reports"
          :report="report"
          :key="index"
        >
        </ReportCard>
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
          10
        </li>
        <li>
          <strong
            ><v-icon small>mdi-account-group</v-icon> Active Users:</strong
          >
          3
        </li>
        <li>
          <strong><v-icon small>mdi-text</v-icon> Description:</strong>
          {{ channel.description }}
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import ReportCard from "../components/ReportCard";

export default {
  name: "Channel",
  components: {
    ReportCard,
  },
  data() {
    return {
      channel: {},
    };
  },
  computed: {
    ...mapGetters(["channels", "channelReports"]),
    reports() {
      return this.channelReports.filter(
        (report) => report.channel_id == this.$route.params.channelId
      );
    },
  },
  mounted() {
    let allChannels = [
      ...this.channels.public,
      ...this.channels.personal,
      ...this.channels.group,
    ];
    this.channel = allChannels.find(
      (channel) => channel.id == this.$route.params.channelId
    );
  },
  watch: {
    $route: {
      handler() {
        let allChannels = [
          ...this.channels.public,
          ...this.channels.personal,
          ...this.channels.group,
        ];
        this.channel = allChannels.find(
          (channel) => channel.id == this.$route.params.channelId
        );
      },
    },
  },
};
</script>

<style scoped>
.details {
  list-style: none;
  margin: 0;
  padding: 0;
  transition: ease;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
</style>
