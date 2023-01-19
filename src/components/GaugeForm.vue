<template>
  <v-row>
    <!-- Title -->
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <!-- <h3 v-if="(!isReadOnly && dataSet.id)">Update {{ dataSet.title }}</h3>
        <h3 v-else-if="dataSet.id">View {{ dataSet.title }}</h3> -->
        <h3 >Add KPI</h3>
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
    </v-col>
    <v-col>
      <v-alert
        v-if="!formValid && submitAttempted"
        type="error"
        dense
        dismissible
        >Please fix highlighted fields below before sumbitting Report</v-alert
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
            <v-text-field
              v-model="gauge.value"
              label="Value"
              dense
              required
              :rules="[v => Number.isInteger(Number(v)) || 'The value must be an integer number']"
            ></v-text-field>
          </div>
        </div>
      </v-form>
    </v-col> 
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import gaugeMixin from "../mixins/gauge-mixin";

export default {
  name: "GaugeForm",
  components: {
    
  },
  mixins: [gaugeMixin],
  data() {
    return {
      formValid: true,
      submitAttempted: false
    };
  },
  computed: {
    ...mapGetters(["currentChannels", "gauge", "gauges", "user"]),
    
  },
  methods: {
    ...mapActions(["addGauge", "updateGaugeById", "fetchGauge"]),
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
    }
  },
  mounted() {
    
  },
  watch: {
    gauge() {
      if (!this.gauge) {
        this.SET_GAUGE(this.newGauge)
        console.log("No Active Gauge")
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
