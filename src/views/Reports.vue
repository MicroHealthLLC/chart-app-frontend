<template>
  <v-row>
    <v-dialog v-model="showReportGroupForm" width="30%">
      <v-card class="px-4 py-4">
        <v-text-field
          v-model="reportGroup.title"
          label="Folder Name"
          placeholder="Enter Folder Name"
          outlined
        />
        <!-- <span  v-if="channelReports.filter(t => !t.reportGroupId).length > 0">
     <v-divider></v-divider>  
     <v-select        
        v-model="reportGroup.reports"       
        item-text="title"       
        item-value="id"  
        multiple        
        chips
        :items="channelReports.filter(t => !t.reportGroupId)"
        :disabled="!channelReports.length > 1"
        label="Select Reports"
        outlined
      ></v-select>
     </span>        -->

        <!-- <span v-else>No Reports to save</span> -->
        <v-btn
          color="primary"
          large
          class="d-block margin-auto"
          @click.prevent="saveReportGroup"
        >
          Save Folder
        </v-btn>
      </v-card>
      <!-- <span v-else>NO DATA</span> -->
    </v-dialog>
    <v-dialog v-model="showAddReportForm" width="50%">
      <v-card class="px-4 py-4">
        <ReportForm @closeAddReportForm="closeAddReportForm" />
      </v-card>
    </v-dialog>
    <v-col class="col-11">
      <div class="d-flex justify-space-between">
        <h3>
          <v-icon class="mr-2 pb-2" color="orange darken-2">
            mdi-chart-box-outline </v-icon
          >Reports
        </h3>
        <span>
          <v-btn
            class="mb-2 mr-1"
            color="primary"
            small
            @click.prevent="toNewReport"
            >Add Report <v-icon small>mdi-plus</v-icon></v-btn
          >
          <v-btn
            class="mb-2"
            color="success"
            small
            @click.prevent="createReportGroup"
            >Create Folder
            <v-icon small class="pl-1">mdi-folder-multiple</v-icon></v-btn
          >
        </span>
      </div>
      <v-divider class="mb-4" />
      <h4>Folders</h4>
      <div
        v-if="channelReportGroups && channelReportGroups.length > 0"
        class="grid"
      >
        <span
          v-for="item in channelReportGroups"
          :key="item.id"
          :load="log(channelReportGroups)"
        >
          <v-list-group :value="false" no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  <span
                    v-if="
                      sortedReports.filter((t) => t.reportGroupId == item.id)
                        .length > 0
                    "
                  >
                    <v-icon
                      x-large
                      class="pr-1 file-icon"
                      color="yellow darken-2"
                      >mdi-folder-open-outline</v-icon
                    >
                  </span>
                  <span v-else>
                    <v-icon
                      x-large
                      class="pr-1 file-icon"
                      color="yellow darken-2"
                      >mdi-folder-outline</v-icon
                    >
                  </span>
                  {{ item.title }} ({{
                    sortedReports.filter((t) => t.reportGroupId == item.id)
                      .length
                  }})
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="report in sortedReports.filter(
                (t) => t.reportGroupId == item.id
              )"
              :key="report.id"
              link
            >
              <v-list-item-icon>
                <v-icon color="orange darken-2">mdi-file-chart-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title
                @click.prevent="toReport(report.id)"
                v-text="report.title"
              />
            </v-list-item>
          </v-list-group>
        </span>
      </div>
      <div v-else class="mt-4 mb-4">No Folders in this Channel</div>
      <v-divider class="mb-4 mt-4" />
      <h4 class="mb-3">Reports</h4>
      <div v-if="sortedReports.length > 0" class="singleReportGrid pl-5">
        <span v-for="report in sortedReports" :key="report.id">
          <span class="click" @click.prevent="toSingleReport(report.id)">
            <v-icon x-large class="pl-2 file-icon" color="orange darken-2"
              >mdi-file-chart-outline</v-icon
            >
            {{ report.title }}
            <small
              v-if="report.reportGroup && report.reportGroup.title"
              class="d-inline blu"
              >({{ report.reportGroup.title }})</small
            >
          </span>
        </span>
        <!-- <div class="d-flex justify-end btn-container">
          <v-btn
            v-if="reports.length >= 6"
            to="/public-reports"
            class="d-flex-end"
            color="primary"
            text
            >View All</v-btn
          >
        </div> -->
      </div>
      <div
        v-else
        class="placeholder d-flex flex-column justify-center align-center"
      >
        <p class="font-weight-light">No Reports on this Channel yet...</p>
        <v-btn text small color="primary" :to="`reports/add-report`">
          Add a Report
        </v-btn>
      </div>
    </v-col>
    <span class="views">
      <v-icon x-large class="pl-2">mdi-view-dashboard-outline</v-icon>
      <v-icon x-large class="pl-2">mdi-view-list-outline</v-icon>
      <v-icon x-large class="pl-2">mdi-table-large</v-icon>
    </span>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ReportForm from "../components/ReportForm.vue";
// import NewsCard from "../components/NewsCard";
// import ReportCard from "./../components/ReportCard";

export default {
  name: "Home",
  components: {
    ReportForm,
  },
  data() {
    return {
      showReportGroupForm: false,
      showAddReportForm: false,
      viewAllReports: true,
    };
  },
  computed: {
    ...mapGetters([
      "channels",
      "news",
      "reports",
      "user",
      "dataSets",
      "currentChannel",
      "currentChannels",
      "reportGroups",
      "reportGroup",
    ]),
    reportCount() {
      return this.reports.length;
    },
    channelReportGroups() {
      if (this.reportGroups && this.reportGroups.length > 0) {
        return this.reportGroups.filter(
          (t) => t.channelId == this.currentChannels[0].channelId
        );
      } else return [];
    },
    channelReports() {
      if (this.reports && this.reports.length > 0 && this.viewAllReports) {
        return this.reports.filter(
          (t) => t.channelId == this.currentChannels[0].channelId
        );
      } else
        return this.reports.filter(
          (t) =>
            t.channelId == this.currentChannels[0].channelId && !t.reportGroupId
        );
    },
    sortedReports() {
      return this.channelReports
        .filter((t) => t && !t.reportGroupId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    ...mapActions([
      "fetchNews",
      "fetchReports",
      "fetchCurrentUser",
      "fetchDataSets",
      "fetchReportGroups",
      "addReportGroup",
    ]),
    ...mapMutations(["SET_REPORT"]),
    toNewReport() {
      this.showAddReportForm = true;
      //this.$router.push("reports/add-report");
    },
    closeAddReportForm() {
      this.showAddReportForm = false;
    },
    log(e) {
      //console.log("Report Folders:")
      console.log(e);
    },
    toReport(reportId) {
      this.$router.push(`reports/${reportId}`);
    },
    toSingleReport(reportId) {
      this.$router.push(`reports/${reportId}`);
    },
    async saveReportGroup() {
      let data = {
        title: this.reportGroup.title,
        channelId: this.currentChannels[0].channelId,
      };
      //console.log(data)
      await this.addReportGroup(data);
      this.reportGroup.title = "";
      this.reportGroup.reports = null;
      this.showReportGroupForm = false;
    },
    createReportGroup() {
      this.showReportGroupForm = true;
    },
  },
  watch: {
    reports() {
      //console.log(this.channelReports)
      //console.log(this.reportGroups)
    },
    reportGroup() {
      //console.log(this.reportGroup.title)
    },
  },
  mounted() {
    this.fetchReports();
    this.fetchReportGroups();
    this.fetchDataSets();
    //  console.log(this.user)
  },
};
</script>

<style scoped>
.blu {
  color: #1976d2;
}
.file-icon {
  font-size: 100px !important;
}

.views {
  position: absolute;
  bottom: 2.5%;
  right: 5%;
}

.v-application a {
  text-decoration: none;
  color: unset;
}

.click {
  cursor: pointer;
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

.warn {
  color: #e4a11b !important;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

.singleReportGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 4rem;
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
