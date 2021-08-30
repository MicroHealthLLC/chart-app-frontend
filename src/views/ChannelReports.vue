<template>
  <v-row>
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

      <ul class="text-caption details">
        <li>
          <strong>Category: </strong>
          <span class="category">{{ channel.category }}</span>
        </li>
        <li>
          <strong
            ><v-icon small>mdi-file-chart-outline</v-icon> Total
            Reports:</strong
          >
          {{ channel.reports.length }}
        </li>
        <li>
          <strong> <v-icon small>mdi-text</v-icon> Description:</strong>
          {{ channel.description }}
        </li>
      </ul>
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
      <v-card>
        <v-toolbar color="info" dark>Edit Channel Details</v-toolbar>
        <v-card-text>
          <v-form v-model="formValid" ref="form" class="mt-4">
            <v-text-field
              v-model="title"
              label="Title"
              required
              :rules="[(v) => !!v || 'Title is required']"
            ></v-text-field>
            <v-select
              v-model="category"
              label="Channel Type"
              :items="[
                { title: 'Public', value: 'public' },
                { title: 'Personal', value: 'personal' },
                { title: 'Group', value: 'group' },
              ]"
              item-text="title"
              item-value="value"
            ></v-select>
            <v-textarea
              v-model="description"
              label="Description"
              background-color="grey lighten-5"
              outlined
              auto-grow
              required
              :rules="[(v) => !!v || 'Description is required']"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="closeForm" outlined small>Close</v-btn>
          <v-btn @click="editChannel" color="primary" depressed small
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ReportCard from "./../components/ReportCard";

export default {
  name: "ChannelReports",
  data() {
    return {
      formValid: true,
      showForm: false,
      title: "",
      category: "",
      description: "",
    };
  },
  components: {
    ReportCard,
  },
  computed: {
    ...mapGetters(["channel", "dashboards"]),
  },
  methods: {
    ...mapActions(["fetchChannel", "fetchDashboards", "updateChannel"]),
    openForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    editChannel() {
      this.$refs.form.validate();

      if (this.formValid) {
        this.updateChannel({
          id: this.channel.id,
          title: this.title,
          category: this.category,
          description: this.description,
        });
      }
    },
  },
  beforeMount() {
    this.fetchChannel(this.$route.params.channelId);
    this.fetchDashboards();
  },
  watch: {
    $route() {
      this.fetchChannel(this.$route.params.channelId);
    },
    channel() {
      this.title = this.channel.title;
      this.category = this.channel.category;
      this.description = this.channel.description;
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
.category {
  text-transform: capitalize;
}
</style>
