<template>
  <v-row>
    <!-- Title -->
    <v-col>
      <div class="d-flex justify-space-between">
        <h3 v-if="gauge.id">Update {{ gauge.title }}</h3>
        <h3 v-else>Add KPI</h3>
        <div>
          <v-btn
            @click="saveGauge"
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            >Save</v-btn
          >
          <v-btn class="mb-2" @click="resetAndGoBack" small outlined
            >Close</v-btn
          >
        </div>
      </div>
      <v-divider class="mb-4"></v-divider>
      <v-card  class="pa-4 mb-4">
        <KPIGauge :gauge="gauge" />
      </v-card>
      <v-alert
        v-if="!formValid && submitAttempted"
        type="error"
        dense
        dismissible
        >Please fix highlighted fields below before sumbitting KPI</v-alert
      >
      <!-- Form Fields -->
      <v-form v-model="formValid" ref="form">
        <div class="grid">
          <div>
            <v-text-field
              v-model="gauge.title"
              label="Title"
              dense
              required
              :rules="[(v) => !!v || 'Title is required']"
            ></v-text-field>
          </div>
          <div>
            <v-select
              v-model="gauge.chartType"
              label="Chart Type"
              :items="['Traditional', 'Middle']"
              dense
              @change="setChartType"
            ></v-select>
          </div>
          <div>
            <v-text-field
              v-model.number="gauge.value"
              label="Value"
              dense
              required
              :rules="[v => Number.isInteger(Number(v)) || 'The value must be an integer number']"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model.number="gauge.minValue"
              label="Minimum Value"
              dense
              required
              :rules="[v => Number.isInteger(Number(v)) || 'The value must be an integer number']"
            ></v-text-field>
          </div>
          <div>
            <v-text-field
              v-model.number="gauge.maxValue"
              label="Maximum Value"
              dense
              required
              :rules="[v => Number.isInteger(Number(v)) || 'The value must be an integer number']"
            ></v-text-field>

          </div>
        </div>
      </v-form>
      <div v-if="gauge && gauge.id" class="d-flex justify-end mt-4">
        <v-btn
          @click="deleteDialog = true"
          small
          color="error"
          depressed
          outlined
          >Delete KPI</v-btn
        >
      </div>
      <v-dialog v-model="deleteDialog" max-width="400">
        <v-card>
          <v-card-title>Delete this KPI?</v-card-title>
          <v-divider class="mx-4 mb-2"></v-divider>
          <v-card-text
            >Are you sure you would like to delete this KPI?</v-card-text
          >
          <v-card-actions class="d-flex justify-end">
            <v-btn
              @click="deleteDialog = false"
              small
              outlined
              color="secondary"
              >Cancel</v-btn
            >
            <v-btn @click="deleteGauge" small depressed color="error"
              >Delete</v-btn
            >
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
      deleteDialog: false
    };
  },
  computed: {
    ...mapGetters(["currentChannels", "gauge", "gauges", "user"]),
    
  },
  methods: {
    ...mapActions(["addGauge", "updateGaugeById", "fetchGauge", "removeGauge"]),
    ...mapMutations([]),
    resetAndGoBack(){
      this.clear()
      if (this.$route.path === `/${this.currentChannels[0].name}/gauges`){
        this.$emit("closeGaugeForm")
      } else {
        this.$router.push(`/${this.currentChannels[0].name}/gauges`)
      }
    },
    clear() {
      this.$refs.form.reset();
    },
    async saveGauge() {
      this.$refs.form.validate();
      if (this.formValid) {
        let data = {
          title: this.gauge.title,
          value: parseInt(this.gauge.value),
          maxValue: parseInt(this.gauge.maxValue),
          minValue: parseInt(this.gauge.minValue),
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
            this.gauge.minValue = 0
            this.gauge.maxValue = 100
            if (this.gauge.value < this.gauge.minValue && this.gauge.value > this.gauge.maxValue) {
              this.gauge.value = 75
            }
            break;
          case "Middle":
          this.gauge.minValue = -100
            this.gauge.maxValue = 100
            if (this.gauge.value < this.gauge.minValue && this.gauge.value > this.gauge.maxValue) {
              this.gauge.value = 0
            }
            break;
          default:
          // code block
        }
      }
    }
  },
  async mounted() {
    if (this.$route.path === `/${this.currentChannels[0].name}/gauges`){ 
      this.gauge.id = ""
      this.clear()
    }
    console.log(this.gauge)
  },
  watch: {
    gauge() {
      if (!this.gauge) {
        this.SET_GAUGE(this.newGauge)
        console.log("No Active Gauge")
      }
      if (this.$route.path === `/${this.currentChannels[0].name}/gauges`){ 
      this.gauge.id = ""
      this.clear()
    }
    }
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
div >>> .v-select__selections {
  padding-top: 5px;
  padding-bottom: 5px;
}
div >>> .v-select__selections .v-chip {
  color: white;
  background-color: #2196F3;
}
div >>> .v-select__selections .v-chip .v-icon {
  color: white;
}
</style>
