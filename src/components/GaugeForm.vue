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
        <v-divider></v-divider>
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
          </div>
        </v-form>
      </v-col> 
    </v-row>
  </template>
  
  <script>
  import { mapActions, mapGetters, mapMutations } from "vuex";
  
  export default {
    name: "GaugeForm",
    components: {
      
    },
    data() {
      return {
        gauge: {
            title: ''
        },
        formValid: true,
        submitAttempted: false
      };
    },
    computed: {
      ...mapGetters(["currentChannels"]),
      
    },
    methods: {
      ...mapActions([]),
      ...mapMutations([]),
      onChange(event) {
        this.file = event.target.files ? event.target.files[0] : null;
      },
      resetAndGoBack(){
        this.clear()
        this.$refs.form.reset();
        if (this.$route.path === "/it_apps/gauges"){
          this.$emit("closeGaugeForm")
        } else {
          this.$router.push(`/${this.currentChannels[0].name}/gauges`)
        }
      },
      cancelForm() {
        this.$route.path === '/it_apps/gauges' ? this.resetAndGoBack() : this.isReadOnly = true
      },
      clear() {
        this.$refs.form.reset();
      },
      saveGauge() {

      }
    },
    mounted() {
      
    },
    watch: {
      
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
  