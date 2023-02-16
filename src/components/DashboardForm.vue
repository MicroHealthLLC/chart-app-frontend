<template>
  <v-row>
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3>Add Dashboard</h3>
        <div>
          <v-btn
            class="px-5 mr-2 mb-2"
            @click="saveDashboard"
            color="primary"
            depressed
            small
            >Save</v-btn
          >
          <v-btn class="mb-2" small outlined
            >Close</v-btn
          >
        </div>
      </div>

      <v-divider></v-divider>

      <v-alert
        v-if="!formValid && submitAttempted"
        class="mt-2 mb-0"
        type="error"
        dense
        dismissible
        >Please fix highlighted fields below before submitting Dashboard</v-alert
      >
    </v-col>

    <v-col class="col-12">
      <!-- <h3>Dashboard Details</h3>
      <v-divider class="mb-4"></v-divider> -->
      <v-form v-model="formValid" ref="form">
        <v-text-field outlined label="Title" dense v-model="dashboard.title">
        </v-text-field>
        <!-- <v-textarea name="dbDesc" outlined label="Description" dense two-line v-model="dashboard.description"></v-textarea> -->
       <!-- <v-select
          v-if="dashboard.id"
          v-model="dashboard.reports"       
          item-text="title"
          item-value="id"
          multiple        
          chips
          :items="channelReports"
          :disabled="!channelReports.length > 1"
          label="Select Reports"
          outlined
        ></v-select>
        <v-select
          v-if="dashboard.id"
          v-model="dashboard.gauges"       
          item-text="title"
          item-value="id"
          multiple        
          chips
          :items="channelGauges"
          :disabled="!channelGauges.length > 1"
          label="Select Gauges"
          outlined
        ></v-select>
        <v-select
          v-if="dashboard.id"
          v-model="dashboard.heatMaps"       
          item-text="title"
          item-value="id"
          multiple        
          chips
          :items="channelHeatMaps"
          :disabled="!channelHeatMaps.length > 1"
          label="Select Heat Maps"
          outlined
        ></v-select> -->
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
  data() {
    return {
      formValid: true,
      submitAttempted: false,
      deleteDialog: false,
    };
  },
  mixins: [gaugeMixin],
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
      if (this.reports && this.reports.length > 0 && this.currentChannels && this.currentChannels[0]) {
        let reports = this.reports.filter(t => t.channelId == this.currentChannels[0].channelId)
        /* if (this.switch1) {
          reports.filter(r => r.createdBy == `${this.user.given_name} ${this.user.family_name}`)
        } */
        return reports
      } else return []
    },
    /* createdBy() {
      if (this.dashboard.id) {
        return `${this.dashboard.user.first_name} ${
          this.dashboard.user.last_name
        } on ${new Date(this.dashboard.created_at).toLocaleString()}`;
      } else {
        return `${this.dashboard.user.first_name} ${this.dashboard.user.last_name}`;
      }
    },
    updatedBy() {
      if (this.dashboard.id) {
        return `${this.dashboard.last_updated_by} on ${new Date(
          this.dashboard.updated_at
        ).toLocaleString()}`;
      } else {
        return `${this.dashboard.user.first_name} ${this.dashboard.user.last_name}`;
      }
    }, */
  },
  methods: {
    ...mapActions([
      "addDashboard", "fetchDashboards",
    ]),
    ...mapMutations(["SET_DASHBOARD"]),
    async saveDashboard() {
      this.$refs.form.validate();
      this.submitAttempted = true;

      if (this.formValid) {
        let data = {
          title: this.dashboard.title,
          description: this.dashboard.description,
          channelId: this.currentChannels[0].channelId,
          /* reports: this.dashboard.reports,
          gauges: this.dashboard.gauges,
          heatMaps: this.dashboard.heatMaps */
        };        

        /* await this.fetchDashboards()
          let oldDashboardIds = this.dashboards.filter(d => this.currentChannels[0].channelId == d.channelId).map(f => f.id) */

        if (this.dashboard.id) {
          //data.id = this.dashboard.id;
          //this.updateDashboard(data);
        } else {
          console.log("here")
          
          data.createdBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
          await this.addDashboard(data);
          /* this.fetchDashboards().then(() => {
            let lastAdded = this.dashboards.filter(d => this.currentChannels[0].channelId == d.channelId).filter(d => !oldDashboardIds.includes(d.id))
            console.log(lastAdded)
            let id = lastAdded[0].id */
            /* this.$router.push(`/data-sets/${id}`) */
            //this.$router.push(`/${this.currentChannels[0].channelId}/dashboards/${id}`)
            //console.log(this.selected)
            /* console.log(this.selected)
            this.fetchDashboardThenAddDataValue(id, this.selected) */

            //this.dashboard.id = id
          //})
        }
        
      }
    },
    /* removeDashboard() {
      this.deleteDashboard(this.dashboard.id);
      this.$router.push(`/channels/${this.$route.params.channelId}/dashboards`);
    }, */
  },
  mounted() {
    console.log(this.currentChannels[0].channelId)
  },
  beforeMount() {
/*     if (this.$route.params.dashboardId != "new") {
      this.fetchDashboard(this.$route.params.dashboardId);
    } else { */
      /* this.SET_DASHBOARD({
        title: "",
        description: "",
        reports: [],
        gauges: [],
        heatMaps: [],
      }); */
    /* } */
  },
  watch: {
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
