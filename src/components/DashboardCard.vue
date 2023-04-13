<template>
  <v-card class="dashboard-card" @click="toDashboard">
    <v-card-title>
      <v-icon class="mr-4" color="info"> mdi-monitor-dashboard </v-icon>
      <span class="text-subtitle-2 font-weight-bold">
        {{ dashboard.title }}
      </span>
    </v-card-title>
    <v-card-text>
      <ul class="mb-4 text-caption">
        <li><strong>Channel:</strong> {{ dashboard.channel.title }}</li>
        <li><strong>Reports:</strong> {{ dashboard.reports.length }}</li>
      </ul>
      <v-chip
        v-for="(tag, index) in dashboard.tags"
        :key="index"
        class="mr-1"
        x-small
        color="info"
      >
        {{ tag.title }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DashboardCard",
  props: {
    dashboard: {
      type: Object,
    },
  },
  methods: {
    toDashboard() {
      this.$router.push(
        `/channels/${this.dashboard.channel.id}/dashboards/${this.dashboard.id}`
      );
    },
  },
};
</script>

<style scoped>
.dashboard-card ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.dashboard-card {
  border: 1px solid lightgray;
  border-left: 3px solid #1976d2 !important;
  margin-bottom: 10px;
}
.dashboard-card:hover {
  transform: scale(1.05);
  cursor: pointer;
}
.v-card__title {
  word-break: normal;
  line-height: 1.5rem;
  flex-wrap: unset;
}
</style>
