<template>
  <v-row>
    <!-- Title -->
    <v-col>
      <div class="d-flex justify-space-between">
        <h3 v-if="gauge.id">Update {{ gauge.title }}</h3>
        <h3 v-else>Add KPI</h3>
        <div>
          <v-btn @click="saveGauge" class="px-5 mr-2 mb-2" color="primary" depressed small>Save</v-btn>
          <v-btn class="mb-2" @click="resetAndGoBack" small outlined>Close</v-btn>
        </div>
      </div>
      <v-divider class="mb-4"></v-divider>
      <v-row justify="center">
        <v-col cols="11">
          <v-card class="pa-4 mb-4">
            <v-row>
              <v-col cols="8">
                <KPIGauge :gauge="gauge" :height="gaugeHeight" :width="gaugeWidth" :segmentStops="activeSteps"
                  :ringWidth="ringWidth" />
              </v-col>
              <v-col cols="4">
                <v-textarea v-model="gauge.notes" solo auto-grow background-color="grey lighten-4" label="Enter notes here" rows="4"></v-textarea>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-alert v-if="!formValid && submitAttempted" type="error" dense dismissible>Please fix highlighted fields below before sumbitting KPI</v-alert>

      <!-- Form Fields -->
      <v-form v-model="formValid" ref="form" class="px-4 mx-4">
        <v-container class="px-4 mx-4">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="gauge.title" label="Title" dense required
                :rules="[(v) => !!v || 'Title is required']"></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select v-model="gauge.chartType" label="Gauge Type" :items="['Traditional', 'Middle', 'Left']" dense @change="setChartType"
               ></v-select>
            </v-col>
          </v-row>
          
          <v-row>
            <v-col cols="2">
              <v-text-field v-model="activeSteps[0]" label="Minimum Value" dense required
                :rules="[v => !Number.isNaN(Number(v)) || 'The value must be a number']"></v-text-field>
            </v-col>
            <v-col cols="2" v-if="gauge.chartType == 'Traditional' || gauge.chartType == 'Middle' || gauge.chartType == 'Left'">
              <v-text-field v-model="activeSteps[1]" label="1st Stop" dense required
                :rules="[v => !Number.isNaN(Number(v)) || 'The value must be a number']"></v-text-field>
            </v-col>
            <v-col cols="2" v-if="gauge.chartType == 'Traditional' || gauge.chartType == 'Middle' || gauge.chartType == 'Left'">
              <v-text-field v-model="activeSteps[2]" label="2nd Stop" dense required
                :rules="[v => !Number.isNaN(Number(v)) || 'The value must be a number']"></v-text-field>
            </v-col>
            <v-col cols="2" v-if="gauge.chartType == 'Middle'">
              <v-text-field v-model="activeSteps[3]" label="3rd Stop" dense required
                :rules="[v => !Number.isNaN(Number(v)) || 'The value must be a number']"></v-text-field>
            </v-col>
            <v-col cols="2" v-if="gauge.chartType == 'Middle'">
              <v-text-field v-model="activeSteps[4]" label="4th Stop" dense required
                :rules="[v => !Number.isNaN(Number(v)) || 'The value must be a number']"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="activeSteps[activeSteps.length - 1]" label="Maximum Value" dense required :rules="[v => !Number.isNaN(Number(v)) || 'The value must be a number']"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-text-field v-model.number="gauge.value" label="KPI Value" dense required
                :rules="[v => !Number.isNaN(Number(v)) || 'The value must be a number']"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>

      <div v-if="gauge && gauge.id" class="d-flex justify-end mt-4">
        <v-btn @click="deleteDialog = true" small color="error" depressed outlined>Delete KPI</v-btn>
      </div>

      <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
          <v-card-title>Delete this KPI?</v-card-title>
          <v-divider class="mx-4 mb-2"></v-divider>
          <v-card-text>Are you sure you would like to delete this KPI?</v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn @click="deleteDialog = false" small outlined color="secondary">Cancel</v-btn>
            <v-btn @click="deleteGauge" small depressed color="error">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import gaugeMixin from "../mixins/gauge-mixin";
import KPIGauge from "./KPIGauge.vue";

export default {
  name: "GaugeForm",
  components: {
    KPIGauge
  },
  mixins: [gaugeMixin],
  data() {
    return {
      formValid: true,
      submitAttempted: false,
      deleteDialog: false,
      defaultStops: [],
      minVal: 0,
      maxValue: 100,
      activeSteps: []
    };
  },
  props:{
    showAddGaugeForm: Boolean
  },
  computed: {
    ...mapGetters(["currentChannels", "gauge", "gauges", "user"]),
    
  },
  methods: {
    ...mapActions(["addGauge", "updateGaugeById", "fetchGauge", "removeGauge"]),
    ...mapMutations(["SET_GAUGE"]),
    resetAndGoBack() {
      this.clear()
      if (this.$route.path === `/${this.currentChannels[0].name}/gauges` && this.showAddGaugeForm) {
        this.$emit("closeGaugeForm")
      } else {
        this.$router.go(-1)
        //this.$router.push(`/${this.currentChannels[0].name}/gauges`)
      }
    },
    clear() {
      this.gauge.id = ""
      this.gauge.chartType = "Traditional"
      this.activeSteps = []
      this.gauge.notes = ''
      this.$refs.form.reset();
      
    },
    async saveGauge() {
      this.$refs.form.validate();
      if (this.formValid) {
        let data = {
          title: this.gauge.title,
          notes: this.gauge.notes,
          value: parseFloat(this.gauge.value),
          segmentStops: this.activeSteps.toString(),
          chartType: this.gauge.chartType,
          channelId: this.currentChannels[0].channelId
        }
        console.log(data)
        if (this.gauge.id) {
          data.id = this.gauge.id
          data.updatedBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
          await this.updateGaugeById(data)
        } else {
          data.createdBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
          await this.addGauge(data)
        }
      }
    },
    deleteGauge() {
      this.removeGauge({ id: this.gauge.id });
      this.$router.push(`/${this.$route.params.channelId}/gauges`);
    },
    setChartType() {
      if (this.gauge && this.gauge.chartType) {
        switch (this.gauge.chartType) {
          case "Traditional":
            if (!this.gauge.segmentStops) {
              this.activeSteps = [0, 70, 85, 100]
            } else {
              this.activeSteps = this.gauge.segmentStops.split(',').map(x => parseFloat(x))
            }
            break;
          case "Middle":
            if (!this.gauge.segmentStops) {
              this.activeSteps = [-100, -60, -25, 25, 60, 100]
            } else {
              this.activeSteps = this.gauge.segmentStops.split(',').map(x => parseFloat(x))
            }
            break;
          case "Left":
            if (!this.gauge.segmentStops) {
              this.activeSteps = [0, 25, 75, 100]
            } else {
              this.activeSteps = this.gauge.segmentStops.split(',').map(x => parseFloat(x))
            }
            console.log(this.activeSteps)
            break;
          default:
          // code block
        }
      }
    }
  },
  async mounted() {
    if (this.$route.path === `/${this.currentChannels[0].name}/gauges` && this.showAddGaugeForm) {
      console.log("mount")
      await this.clear()
      this.SET_GAUGE(this.newGauge)
      this.setChartType()
    }
    if (this.$route.params.gaugeId) {
      await this.fetchGauge(this.$route.params.gaugeId)
    }
    console.log(this.gauge)
  },
  watch: {
    gauge() {
      /* if (this.$route.path === `/${this.currentChannels[0].name}/gauges` && this.showAddGaugeForm) {
        console.log("watch")
        this.clear()

      } */
      this.setChartType()
    },
  },
};
</script>

<style scoped>
/* .preview-container {
  height: 750px;
} */
.placeholder-text,
.placeholder-icon {
  color: #1976d2;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.channels,
.description {
  grid-column: 1 / span 2;
}

div>>>.v-select__selections {
  padding-top: 5px;
  padding-bottom: 5px;
}

div>>>.v-select__selections .v-chip {
  color: white;
  background-color: #2196F3;
}

div>>>.v-select__selections .v-chip .v-icon {
  color: white;
}
</style>
