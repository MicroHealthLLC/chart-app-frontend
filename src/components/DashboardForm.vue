<template>
  <v-row>
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3>Add Dashboard</h3>
        <div>
          <v-btn
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            @click="saveDashboard"
          >
            Save
          </v-btn>
          <v-btn class="mb-2" small outlined @click="resetAndGoBack">
            Close
          </v-btn>
        </div>
      </div>

      <v-divider />

      <v-alert
        v-if="!formValid && submitAttempted"
        class="mt-2 mb-0"
        type="error"
        dense
        dismissible
      >
        Please fix highlighted fields below before submitting Dashboard
      </v-alert>
    </v-col>

    <v-col class="col-12">
      <!-- <h3>Dashboard Details</h3>
      <v-divider class="mb-4"></v-divider> -->
      <v-form ref="form" v-model="formValid" @submit.prevent="saveDashboard">
        <v-text-field
          v-model="dashboard.title"
          outlined
          label="Title"
          dense
          :rules="[(v) => !!v || 'Title is required']"
        />
      </v-form>

      <!-- Delete Button -->
      <!-- <div v-if="dashboard.id" class="d-flex justify-end mt-4">
        <v-btn
          @click="deleteDialog = true"
          small
          color="error"
          depressed
          outlined
          >Delete Dashboard</v-btn
        >
      </div> -->

      <!-- Delete Prompt -->
      <!-- <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
          <v-card-title>Delete {{ dashboard.title }}?</v-card-title>
          <v-divider class="mx-4 mb-2"></v-divider>
          <v-card-text
            >Are you sure you would like to delete this dashboard?</v-card-text
          >
          <v-card-actions class="d-flex justify-end">
            <v-btn
              @click="deleteDialog = false"
              small
              outlined
              color="secondary"
              >Cancel</v-btn
            >
            <v-btn @click="removeDashboard" small depressed color="error"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import gaugeMixin from "../mixins/gauge-mixin";

export default {
  mixins: [gaugeMixin],
  data() {
    return {
      formValid: true,
      submitAttempted: false,
      deleteDialog: false,
    };
  },
  computed: {
    ...mapGetters([
      "reports",
      "gauges",
      "heatMaps",
      "dashboard",
      "dashboards",
      "currentChannels",
      "user",
    ]),
    channelReports() {
      if (
        this.reports &&
        this.reports.length > 0 &&
        this.currentChannels &&
        this.currentChannels[0]
      ) {
        let reports = this.reports.filter(
          (t) => t.channelId == this.currentChannels[0].channelId
        );
        return reports;
      } else return [];
    },
  },
  methods: {
    ...mapActions(["addDashboard", "fetchDashboards"]),
    ...mapMutations(["SET_DASHBOARD"]),
    async saveDashboard() {
      this.$refs.form.validate();
      this.submitAttempted = true;

      if (this.formValid) {
        let data = {
          title: this.dashboard.title,
          description: this.dashboard.description,
          channelId: this.currentChannels[0].channelId,
        };
        if (this.dashboard.id) {
          //Update dashboard
        } else {
          data.createdBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
          await this.addDashboard(data);
        }
        this.resetAndGoBack();
      }
    },
    resetAndGoBack() {
      this.$refs.form.reset();
      if (this.$route.path === `/${this.currentChannels[0].name}/dashboards`) {
        this.$emit("closeDashboardForm");
      } else {
        this.$router.push(`/${this.currentChannels[0].name}/dashboards`);
      }
    },
  },
  watch: {},
  mounted() {
    //console.log(this.currentChannels[0].channelId)
  },
  beforeMount() {
    this.SET_DASHBOARD({
      id: "",
      title: "",
      description: "",
    });
    /* if (this.$route.params.dashboardId != "new") {
      this.fetchDashboard(this.$route.params.dashboardId);
    } else {
      this.SET_DASHBOARD({
        title: "",
        description: "",
      });
    } */
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
.reports,
.description,
.tags {
  grid-column: 1 / span 2;
}
.chart-card {
  height: 350px;
}
.chart-menu {
  position: absolute;
  top: 10px;
  right: 10px;
}
.description-tooltip {
  max-width: 300px;
}
.place-holder {
  height: 400px;
}
.placeholder-text,
.placeholder-icon {
  color: #1976d2;
}
</style>
