<template>
  <v-container>
    <v-row>
      <!-- Title -->
      <v-col cols="11">
        <div class="d-flex justify-space-between">
          <h3 v-if="heatMap.id">Update {{ heatMap.title }}</h3>
          <h3 v-else>Add Heat Map</h3>
          <div>
            <v-btn
              class="px-5 mr-2 mb-2"
              color="primary"
              depressed
              small
              @click="saveHeatMap"
            >
              Save
            </v-btn>
            <v-btn class="mb-2" small outlined @click="resetAndGoBack">
              Close
            </v-btn>
          </div>
        </div>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="11">
        <v-alert
          v-if="!formValid && submitAttempted"
          type="error"
          dense
          dismissible
        >
          Please fix highlighted fields below before submitting Heat Map
        </v-alert>
        <!-- Form Fields -->
        <v-form ref="form" v-model="formValid" class="mt-2">
          <div class="grid">
            <div>
              <v-text-field
                v-model="heatMap.title"
                label="Title"
                dense
                required
                :rules="[(v) => !!v || 'Title is required']"
              />
            </div>
            <div>
              <v-select
                v-model="heatMap.dataSet"
                :items="dataSetChoices"
                item-text="title"
                item-value="id"
                label="Data Set"
                dense
                required
                :rules="[(v) => !!v || 'Data Set is required']"
                @change="loadTable"
              />
            </div>
            <div>
              <v-select
                v-model="selectedHeaders"
                :items="headers"
                label="Target Columns"
                multiple
                small
                dense
                return-object
                @change="onChangeSelected"
              />
            </div>
            <div>
              <v-select
                v-model="leadCol"
                :items="leadColKeys"
                label="Lead Column"
                dense
                @change="onChangeAxis"
              />
            </div>
            <div class="expansion">
              <v-expansion-panels @change="isExpanded">
                <v-expansion-panel>
                  <v-expansion-panel-header>{{
                    !expanded ? "Show notes" : "Hide notes"
                  }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <vue-editor
                      v-model="heatMap.notes"
                      placeholder="Enter notes here"
                      :editor-toolbar="toolbarOptions"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>
    <!-- <v-row>
      <vue-editor v-model="heatMap.notes" placeholder="Enter notes here" :editor-toolbar="toolbarOptions" ></vue-editor>
    </v-row> -->
    <v-row justify="start">
      <v-col
        v-if="heatMap.dataSet && heatMap.options && heatMap.options.cols"
        class="mt-2 mb-4"
        cols="5"
      >
        <KPIHeatMap
          :heat-map="heatMap"
          :headers="selectedHeaders"
          :data-items="items"
        />
        <!-- :options="options" -->
      </v-col>
      <v-divider class="my-6" vertical></v-divider>
      <v-col
        v-if="heatMap.dataSet && heatMap.options && heatMap.options.cols"
        cols="6" class="mt-6 ml-4" 
      >
        <v-row>
          <v-col
            v-for="(col, i) in heatMap.options.cols"
            :key="i"
            xl="2"
            md="3"
            sm="5"
            xs="6"
            class="ml-2 col-opts"
          >
            <h5 class="mb-4">{{ col.name }}</h5>
            <v-text-field
              v-model="heatMap.options.cols[i].gre"
              solo
              class="text-green"
              dense
              required
              type="number"
              :rules="[(v) => !!v || 'required']"
              @change="updateTableColors"
            >
              <v-icon slot="prepend-inner" color="green lighten-1" class="mr-1">
                {{
                  !heatMap.options.cols[i].abs
                    ? "mdi-greater-than-or-equal"
                    : "mdi-less-than-or-equal"
                }}
              </v-icon>
            </v-text-field>
            <v-text-field
              v-model="heatMap.options.cols[i].yel"
              solo
              class="text-yellow"
              :prepend-inner-icon="
                !heatMap.options.cols[i].abs
                  ? 'mdi-greater-than-or-equal'
                  : 'mdi-less-than-or-equal'
              "
              type="number"
              dense
              required
              :rules="[(v) => !!v || 'required']"
              @change="updateTableColors"
            >
              <v-icon slot="prepend-inner" color="amber lighten-1" class="mr-1">
                {{
                  !heatMap.options.cols[i].abs
                    ? "mdi-greater-than-or-equal"
                    : "mdi-less-than-or-equal"
                }}
              </v-icon>
            </v-text-field>
            <v-text-field
              v-model="heatMap.options.cols[i].yel"
              solo
              class="text-red"
              :prepend-inner-icon="
                !heatMap.options.cols[i].abs
                  ? 'mdi-less-than'
                  : 'mdi-greater-than'
              "
              dense
              required
              type="number"
              :rules="[(v) => !!v || 'required']"
              @change="updateTableColors"
            >
              <v-icon slot="prepend-inner" color="red lighten-1" class="mr-1">
                {{
                  heatMap.options.cols[i].abs
                    ? "mdi-greater-than"
                    : "mdi-less-than"
                }}
              </v-icon>
            </v-text-field>
            <v-checkbox 
              small
              v-model="heatMap.options.cols[i].abs"
              label="Use Absolute Value"
              @change="updateTableColors"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Delete Button -->
    <div v-if="heatMap && heatMap.id" class="d-flex justify-end mt-4">
      <v-btn
        small
        color="error"
        depressed
        outlined
        @click="deleteDialog = true"
      >
        Delete Heat Map
      </v-btn>
    </div>
    <!-- Delete Prompt -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>Delete this Heat Map?</v-card-title>
        <v-divider class="mx-4 mb-2" />
        <v-card-text>
          Are you sure you would like to delete this heat map?
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn small outlined color="secondary" @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn small depressed color="error" @click="deleteHeatMap">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import KPIHeatMap from "./KPIHeatMap.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import datasetMixin from "../mixins/dataset-mixin";
import { VueEditor } from "vue2-quill-editor";

export default {
  name: "HeatMapForm",
  components: {
    KPIHeatMap,
    VueEditor,
  },
  mixins: [datasetMixin],
  data() {
    return {
      submitAttempted: false,
      deleteDialog: false,
      formValid: true,
      expanded: false,
      headers: [],
      dataHeaders: [],
      selectedHeaders: [],
      leadColKeys: [],
      leadCol: "",
      items: [],
      toolbarOptions: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ font: [] }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ],
    };
  },
  computed: {
    ...mapGetters([
      "heatMap",
      "currentChannels",
      "dataSets",
      "dataSet",
      "statusCode",
      "user",
    ]),
    dataSetChoices() {
      if (this.dataSets) {
        return this.dataSets.filter(
          (d) => d.channelId == this.currentChannels[0].channelId
        );
      }
      return "";
    },
  },
  methods: {
    ...mapActions([
      "fetchDataSets",
      "fetchDataSet",
      "fetchHeatMaps",
      "fetchHeatMap",
      "addHeatMap",
      "updateHeatMapById",
      "removeHeatMap",
    ]),
    ...mapMutations(["SET_DATA_SET", "SET_HEAT_MAP"]),
    log(e) {
      console.log(e);
    },
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    resetAndGoBack() {
      this.clear();
      this.$refs.form.reset();
      if (this.$route.path === `/${this.currentChannels[0].name}/gauges`) {
        this.$emit("closeHeatMapForm");
      } else {
        this.$router.go(-1);
        //this.$router.push(`/${this.currentChannels[0].name}/gauges`)
      }
    },
    clear() {
      this.$refs.form.reset();
      this.headers = [];
      this.items = [];
      this.SET_DATA_SET({});
      //this.options.cols = []
      this.SET_HEAT_MAP({});
    },
    async saveHeatMap() {
      this.submitAttempted = true;
      this.$refs.form.validate();
      if (this.formValid) {
        let data = {
          title: this.heatMap.title,
          //dataSetId: this.heatMap.dataSet,
          options: JSON.stringify(this.heatMap.options),
          leadCol: this.leadCol,
          columns: JSON.stringify(this.selectedHeaders),
          notes: this.heatMap.notes,
          channelId: this.currentChannels[0].channelId,
        };
        if (this.heatMap.id) {
          data.id = this.heatMap.id;
          data.updatedBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
          data.dataSetId = this.heatMap.dataSet.id;
          await this.updateHeatMapById(data);
        } else {
          data.createdBy = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
          data.dataSetId = this.heatMap.dataSet;
          await this.addHeatMap(data);
        }
      }
    },
    deleteHeatMap() {
      this.removeHeatMap({ id: this.heatMap.id });
      this.$router.push(`/${this.$route.params.channelId}/gauges`);
    },
    clearInput(type) {
      this.$refs.form.inputs.forEach((input) => {
        if (input.type == type) {
          input.reset();
        }
      });
    },
    /* async showDataChart() {
      await this.fetchHeatMap(this.$route.params.heatMapId)
      console.log(this.heatMap)
      console.log(this.createMasterData(this.heatMap.dataSet.dataValues.items))
      this.uploadData(this.createMasterData(this.heatMap.dataSet.dataValues.items))
    }, */

    onChangeSelected() {
      this.selectedHeaders.forEach((s, i) => {
        if (typeof s == "string") {
          this.selectedHeaders[i] = { text: s, value: s };
        }
      });
      /* if (this.dataHeaders != this.selectedHeaders) {
        this.dataHeaders = this.selectedHeaders.shift()
      } */
      this.leadColKeys = this.selectedHeaders.map((h) => h.text || h);
      if (this.leadCol) {
        this.onChangeAxis();
      }
      this.items = this.filterData(
        this.selectedHeaders,
        this.createMasterData(this.dataSet.dataValues.items)
      );
      //console.log(this.items)
    },
    onChangeAxis() {
      this.leadColKeys = this.selectedHeaders.map((h) => h.text || h);
      this.moveArrByKey(this.leadColKeys, this.leadCol);
      this.selectedHeaders = this.leadColKeys.map((x) => ({
        text: x,
        value: x,
      }));
      //console.log(this.selectedHeaders)
      //console.log(this.dataSet.dataValues.items)
      this.items = this.filterData(
        this.selectedHeaders,
        this.createMasterData(this.dataSet.dataValues.items)
      );
      this.setLegend();
    },
    moveArrByKey(keys, selected) {
      keys.forEach((k, i) => {
        if (k == selected) {
          this.arrayMove(keys, i, 0);
        }
      });
    },
    setLegend() {
      if (this.selectedHeaders) {
        let legendSelect = [];
        if (this.heatMap && !this.heatMap.options) {
          let newHM = this.heatMap;
          newHM.options = {
            cols: [],
          };
          this.SET_HEAT_MAP(newHM);
        }
        console.log(this.heatMap.options);
        this.selectedHeaders.slice(1).forEach((h, i) => {
          let attr = {};
          if (this.heatMap.options && this.heatMap.options.cols[i]) {
            attr = {
              name: h.text,
              gre: this.heatMap.options.cols[i].gre,
              yel: this.heatMap.options.cols[i].yel,
              abs: this.heatMap.options.cols[i].abs,
            };
          } else {
            attr = {
              name: h.text,
              gre: 0,
              yel: 0,
              abs: false,
            };
          }
          legendSelect.push(attr);
        });
        this.heatMap.options.cols = legendSelect;
      }
    },
    uploadData(data) {
      this.items = data;
      //console.log(this.heatMap.options)

      //this.options = this.heatMap.options
      //this.selected = data;
      const keys = Object.keys(data[0]);
      this.headers = keys.map((key) => ({
        text: key,
        value: key,
      }));
    },
    loadTable() {
      this.fetchDataSet(this.heatMap.dataSet).then(() => {
        this.uploadData(this.createMasterData(this.dataSet.dataValues.items));
      });
      console.log(this);
    },
    updateTableColors() {
      console.log(this.headers);
      this.items = this.createMasterData(this.dataSet.dataValues.items);
    },
    populateData() {
      if (this.heatMap.id) {
        if (this.heatMap.columns) {
          this.selectedHeaders = this.heatMap.columns;
          this.onChangeSelected();
        }
        if (this.heatMap.leadCol) {
          this.leadCol = this.heatMap.leadCol;
          this.onChangeAxis();
        }
        /* if (this.heatMap.options && this.heatMap.options.cols && this.heatMap.options.cols.length > 0) {
          console.log(this.heatMap.options)
          this.options = this.heatMap.options
        } */
      }
    },
    isExpanded(event) {
      return event == 0 ? (this.expanded = true) : (this.expanded = false);
    },
  },
  watch: {
    headers() {
      //console.log(this.options)
      //console.log(this.selectedHeaders)
    },
    /* heatMap() {
      console.log(this.heatMap)
      if (this.heatMap.id){
        if (this.heatMap.columns) {
        this.selectedHeaders = this.heatMap.columns
        this.onChangeSelected()
        
      } 
        if (this.heatMap.leadCol) {
        this.leadCol = this.heatMap.leadCol
        this.onChangeAxis()
        }
      if (this.heatMap.options && this.heatMap.options.cols && this.heatMap.options.cols.length > 0) {
        console.log(this.heatMap.options)
        this.options = this.heatMap.options
      }  
      }
      
    }, */
    heatMap() {
      if (this.heatMap.dataSet) {
        console.log(this.heatMap.dataSet);
      }
    },
    selected() {
      if (this.selected && this.selected.length > 0) {
        //console.log(this.selected)
      } else console.log("no SELECTED data");
    },
    statusCode() {
      if (this.statusCode == 201) {
        this.$router.push(`/heatMaps/${this.heatMap.id}`);
        this.SET_STATUS_CODE(0);
      }
    },
  },
  async mounted() {
    if (this.$route.path === `/${this.currentChannels[0].name}/gauges`) {
      this.heatMap.id = "";
      //this.clear()
    } else {
      await this.fetchHeatMap(this.$route.params.heatMapId);
      await this.fetchDataSets();
      await this.fetchDataSet(this.heatMap.dataSetId);
      this.uploadData(this.createMasterData(this.dataSet.dataValues.items));
      if (!this.heatMap.user) {
        this.heatMap.user = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
      }
      this.populateData();
    }
  },
};
</script>

<style scoped>
.col-opts {
  background-color: whitesmoke;
}
.placeholder-text,
.placeholder-icon {
  color: #1976d2;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
.expansion {
  grid-column: 1 / span 1;
}

div >>> .v-select__selections {
  padding-top: 5px;
  padding-bottom: 5px;
}

div >>> .v-select__selections .v-chip {
  color: white;
  background-color: #2196f3;
}

div >>> .v-select__selections .v-chip .v-icon {
  color: white;
}
</style>
