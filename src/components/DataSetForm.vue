<template>
  <v-container fluid>
    <v-row>
      <!-- Title -->
      <v-col cols="12">
        <div class="d-flex justify-space-between">
          <h3 v-if="dataSet.id">Update {{ dataSet.title }}</h3>
          <h3 v-else>Add Data Set</h3>
          <div>
            <v-btn
              class="px-5 mr-2 mb-2"
              color="primary"
              depressed
              small
              @click="saveDataSet"
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
      <v-col cols="12">
        <v-alert
          v-if="!formValid && submitAttempted"
          type="error"
          dense
          dismissible
        >
          Please fix highlighted fields below before sumbitting Report
        </v-alert>
        <!-- Form Fields -->
        <v-form ref="form" v-model="formValid">
          <v-row justify="space-around">
            <v-col cols="3">
              <v-text-field
                v-model="dataSet.title"
                label="Title"
                dense
                required
                :rules="[(v) => !!v || 'Title is required']"
              />
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="dataSet.description"
                label="Description"
                dense
              />
              <!-- <v-select v-if="dataSet.id" :items="choices" label="Add a column" outlined></v-select> -->
            </v-col>
            <v-col cols="3">
              <div class="d-flex">
                <v-file-input
                  v-show="dataSet.id != ''"
                  placeholder="Please choose a file..."
                  type="file"
                  dense
                  @change.native="onChange"
                  @click:clear="clearInput('file')"
                >
                  <!-- Append item slot -->
                  <template v-slot:append>
                    <v-btn
                      v-if="dataSet.id"
                      :disabled="!file"
                      small
                      icon
                      class="mb-1"
                      @click="addNewDataValue"
                      title="Add Data"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-file-input>
                <xlsx-read :options="readOptions" :file="file">
                  <xlsx-json :options="readOptions" @parsed="setTableItems" />
                </xlsx-read>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-show="
          dataSet.id &&
          this.dataSet.dataValues &&
          this.dataSet.dataValues.items &&
          this.dataSet.dataValues.items.length > 0
        "
        cols="12"
      >
        <v-card
          class="d-flex flex-column preview-container justify-center mx-10"
        >
          <!-- Table Preview -->
          <!-- <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title> -->
          <!-- <v-card-title class="justify-center">
          <v-progress-circular v-if="$store.getters.loading" :size="70" indeterminate color="primary"
            class="m-2"></v-progress-circular>
        </v-card-title> -->
          <v-skeleton-loader
            v-if="$store.getters.loading || $store.getters.saving"
            class="mx-auto"
            type="table"
            width="100%"
          />

          <div v-else class="ma-4">
            <v-row justify="space-between" class="mb-4">
              <v-col cols="10">
                <FilterBar :filters="filters" :items="items" :dataSet="dataSet" :allKeys="allKeys" @changeFilteredItems="(items) => filteredItems = items" />
                <!-- <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>Filters</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row>
                        <v-col cols="6">
                          <v-select
                            v-model="selectedFilter"
                            :items="filters"
                            item-text="title"
                            @change="setFilter"
                            dense
                            outlined
                            clearable
                            return-object
                            label="Saved Filters"
                            class="mr-4"
                            @click:clear="clearFilter"
                          ></v-select>
                        </v-col>
                        <v-col cols="2">
                          <v-btn icon @click="addFilter" title="Add Filter">
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-if="showNewFilterForm">
                        <v-col cols="3">
                          <span class="d-flex">
                            <v-tooltip
                              left
                              v-if="
                                filterName ||
                                filterKey ||
                                filterOperation ||
                                filterMin ||
                                filterMax
                              "
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  x-small
                                  class="mr-2 mt-2"
                                  @click="clearFilter"
                                  v-bind="attrs"
                                  v-on="on"
                                  icon
                                  title="Clear Filter"
                                  ><v-icon>mdi-close</v-icon></v-btn
                                >
                              </template>
                              <span>Clear Filter</span>
                            </v-tooltip>
                            <v-text-field
                              v-model="filterName"
                              label="Filter Name"
                              dense
                              outlined
                            />
                          </span>
                        </v-col>
                        <v-col cols="3"
                          ><v-select
                            v-model="filterKey"
                            label="Filter By"
                            outlined
                            dense
                            :items="allKeys"
                          ></v-select
                        ></v-col>
                        <v-col cols="3">
                          <v-select
                            v-if="filterKey"
                            v-model="filterOperation"
                            label="Operation"
                            outlined
                            dense
                            @change="changeFilterOperation"
                            :items="filterOperationKeys"
                          >
                          </v-select>
                        </v-col>
                        <v-col
                          cols="2"
                          v-if="
                            [
                              'Equal To',
                              'Not Equal To',
                              'Greater Than',
                              'Greater Than or Equal To',
                              'Between',
                            ].includes(filterOperation)
                          "
                        >
                          <v-select
                            v-model="filterMin"
                            :label="
                              ['Equal To', 'Not Equal To'].includes(
                                filterOperation
                              )
                                ? 'Value'
                                : 'Min'
                            "
                            outlined
                            dense
                            @change="calcFilter"
                            :items="getItemValues(filterKey, items)"
                          ></v-select>
                        </v-col>
                        <v-col
                          cols="2"
                          v-if="
                            [
                              'Less Than',
                              'Less Than or Equal To',
                              'Between',
                            ].includes(filterOperation)
                          "
                        >
                          <v-select
                            v-model="filterMax"
                            label="Max"
                            outlined
                            dense
                            @change="calcFilter"
                            :items="getItemValues(filterKey, items)"
                          ></v-select>
                        </v-col>
                        <v-col cols="1">
                          <v-btn
                            v-if="
                              (filterName &&
                                filterKey &&
                                (filterOperation == 'Current Quarter' ||
                                  filterOperation == 'Last Quarter')) ||
                              ([
                                'Equal To',
                                'Not Equal To',
                                'Greater Than',
                                'Greater Than or Equal To',
                              ].includes(filterOperation) &&
                                filterMin) ||
                              (['Less Than', 'Less Than or Equal To'].includes(
                                filterOperation
                              ) &&
                                filterMax) ||
                              (filterOperation == 'Between' &&
                                filterMin &&
                                filterMax)
                            "
                            icon
                            @click="saveFilter"
                          >
                            <v-icon small color="primary"
                              >mdi-content-save</v-icon
                            >
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels> -->
              </v-col>
              <v-col cols="2">
                <span class="d-flex justify-end">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        class="mb-4 mr-4 mt-1 px-2"
                        @click="showAddColumn"
                        v-bind="attrs"
                        v-on="on"
                        title="Add Calculated Column"
                        ><v-icon>mdi-table-column-plus-after</v-icon>
                      </v-btn>
                    </template>
                    <span>Add Calculated Column</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        class="mr-6 mb-4 mt-1"
                        @click="showRemoveColumn"
                        v-bind="attrs"
                        v-on="on"
                        title="Remove Column"
                      >
                        <v-icon>mdi-table-column-remove</v-icon>
                      </v-btn>
                    </template>
                    <span>Remove Column</span>
                  </v-tooltip>
                </span>
              </v-col>
            </v-row>
            <vue-excel-editor
              v-if="renderComponent"
              ref="grid"
              v-model="filteredItems"
              readonly
              :free-select="true"
              no-header-edit
              @update="onUpdate"
            >
              <vue-excel-column
                v-for="(col, i) in allKeys"
                :key="i"
                auto-fill-width
                :field="col"
                :label="col"
                :type="checkColType(col, items)"
                text-align="left"
              />
            </vue-excel-editor>
            <!-- <v-data-table :headers="headers" :items="items" :single-select="false" :search="search"
            :loading="$store.getters.loading" loading-text="Loading... Please wait">
          </v-data-table> -->
          </div>
        </v-card>
      </v-col>
      <v-dialog v-model="columnForm" width="20%">
        <v-card class="pa-4">
          <h4 class="mb-4">Add Function Column</h4>
          <v-text-field
            v-model="newColumn.title"
            label="Column Name"
            outlined
            dense
            required
            :rules="[(v) => !!v || 'Column name is required']"
          />
          <v-select
            v-if="dataSet.id"
            v-model="newColumn.action"
            dense
            :items="mathChoices"
            label="Choose an action"
            outlined
          />
          <h5 class="mb-2">Choose columns to compare</h5>
          <div class="d-flex">
            <v-select
              v-if="dataSet.id"
              v-model="newColumn.col1"
              dense
              :items="allKeys.filter((k) => checkColType(k, items) != 'string')"
              label="First column"
              outlined
            />
            <h3 class="mx-2 mt-2">{{ actionSign }}</h3>
            <v-select
              v-if="dataSet.id"
              v-model="newColumn.col2"
              dense
              :items="allKeys.filter((k) => checkColType(k, items) != 'string')"
              label="Second column"
              outlined
            />
          </div>
          <span class="d-flex justify-end">
            <!-- <v-btn color="warning" class="mr-4" @click="cancelColumnForm" small>
            Cancel
          </v-btn> -->
            <v-btn class="mr-4" small outlined @click="cancelColumnForm"
              >Cancel</v-btn
            >
            <v-btn color="primary" small @click="addColumn"> Add Column </v-btn>
          </span>
        </v-card>
      </v-dialog>
      <v-dialog v-model="rmColForm" width="20%">
        <v-card class="pa-4">
          <h4 class="mb-4">Remove Columns</h4>
          <v-select
            v-model="colsToRemove"
            :items="allKeys"
            label="Select"
            multiple
            chips
            hint="Choose the columns you wish to remove"
            persistent-hint
            outlined
          />
          <span class="d-flex justify-end">
            <v-btn
              class="mr-4"
              small
              outlined
              @click="
                rmColForm = false;
                colsToRemove = [];
              "
              >Cancel</v-btn
            >
            <v-btn color="primary" small @click="removeColumns"> Remove </v-btn>
          </span>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { XlsxRead, XlsxJson } from "vue-xlsx";
import { mapActions, mapGetters, mapMutations } from "vuex";
import datasetMixin from "../mixins/dataset-mixin";
import FilterBar from "./FilterBar.vue";
import moment from "moment";

export default {
  name: "DataSetForm",
  components: {
    XlsxRead,
    XlsxJson,
    FilterBar,
  },
  mixins: [datasetMixin],
  data() {
    return {
      mathChoices: ["Sum", "Difference", "Product", "Quotient", "Average"],
      file: null,
      //data: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: ["", ""],
        },
        bezierCurve: false,
      },
      readOptions: {
        cellDates: true,
        raw: false,
        dateNF: "mm/dd/yyyy",
      },
      //headers: [],
      //selectedHeaders:[],
      value: [],
      items: [],
      filteredItems: [],
      //selected: [],
      xAxisKeys: [],
      xAxisValue: "",
      formValid: true,
      submitAttempted: false,
      dataValueInput: "",
      search: "",
      columnForm: false,
      rmColForm: false,
      newColumn: {
        title: "",
        action: "",
        col1: "",
        col2: "",
      },
      renderComponent: true,
      colsToRemove: [],
      filters: [],
      /* showNewFilterForm: false,
      
      selectedFilter: null,
      filterKey: "",
      filterName: "",
      filterMin: null,
      filterMax: null,
      filterOperation: "",
      filterOperationKeys: [
        "Equal To",
        "Not Equal To",
        "Greater Than",
        "Greater Than or Equal To",
        "Less Than",
        "Less Than or Equal To",
        "Between",
        "Current Quarter",
        "Last Quarter",
      ], */
    };
  },
  computed: {
    ...mapGetters([
      "dataSet",
      "dataSets",
      "dataValues",
      "channels",
      "currentChannels",
      "colors",
      "statusCode",
      "user",
    ]),
    allKeys() {
      if (this.items && this.items.length > 0) {
        let uniqueKeys = [];
        let newKeys = this.items.map((s) => Object.keys(s));
        newKeys.forEach((arr) => {
          arr.forEach((key) => {
            if (!uniqueKeys.includes(key)) {
              uniqueKeys.push(key);
            }
          });
        });
        console.log(uniqueKeys.filter((k) => k != "$id"));
        return uniqueKeys.filter((k) => k != "$id");
      } else return [];
    },
    actionSign() {
      if (this.newColumn.action) {
        switch (this.newColumn.action) {
          case "Sum":
            return "+";
          case "Difference":
            return "-";
          case "Product":
            return "x";
          case "Quotient":
            return "÷";
          case "Average":
            return "x̄";
          default:
            return "";
        }
      } else return "";
    },
  },
  methods: {
    ...mapActions([
      "addDataSet",
      "addDataValue",
      "updateDataSetById",
      "updateDataValueById",
      "fetchDataSet",
      "fetchDataSets",
      "fetchDataSetThenAddDataValue",
      "fetchChannels",
      "fetchDataValue",
      "fetchDataValues",
    ]),
    ...mapMutations(["SET_DATA_SET", "SET_STATUS_CODE"]),
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    resetAndGoBack() {
      this.clear();
      this.$refs.form.reset();
      if (this.$route.path === `/${this.currentChannels[0].name}/data-sets`) {
        this.$emit("closeDataSetForm");
      } else {
        this.$router.push(`/${this.currentChannels[0].name}/data-sets`);
      }
    },
    /* cancelForm() {
      this.$route.path === `/${this.currentChannels[0].name}/data-sets`
        ? this.resetAndGoBack()
        : (this.isReadOnly = true);
    }, */
    clear() {
      this.$refs.form.reset();
      this.file = null;
      this.data = [];
      //this.selected = [];
      //this.headers = [];
      this.items = [];
    },
    async saveDataSet() {
      this.$refs.form.validate();
      if (this.formValid) {
        if (this.dataSet.id) {
          await this.updateDataSetById({
            id: this.dataSet.id,
            title: this.dataSet.title,
            description: this.dataSet.description,
            user: this.dataSet.user,
            channelId: this.currentChannels[0].channelId,
          }); /* .then((this.isReadOnly = true)); */
        } else {
          let oldDataSetIds = this.dataSets
            .filter((d) => this.currentChannels[0].channelId == d.channelId)
            .map((f) => f.id);
          await this.addDataSet({
            title: this.dataSet.title,
            description: this.dataSet.description,
            user: this.dataSet.user,
            channelId: this.currentChannels[0].channelId,
          });
          this.fetchDataSets().then(() => {
            let lastAdded = this.dataSets
              .filter((d) => this.currentChannels[0].channelId == d.channelId)
              .filter((d) => !oldDataSetIds.includes(d.id));
            let id = lastAdded[0].id;
            /* this.$router.push(`/data-sets/${id}`) */
            this.$router.push(
              `/${this.currentChannels[0].name}/data-sets/${id}`
            );
            //console.log(this.selected)
            /* console.log(this.selected)
            this.fetchDataSetThenAddDataValue(id, this.selected) */
            this.dataSet.id = id;
          });
        }
        this.resetAndGoBack();
      }
    },
    addNewDataValue() {
      let objString = "";
      this.items.forEach((item) => {
        objString = JSON.stringify(item);
        this.addDataValue({
          data: objString,
          dataSetId: this.dataSet.id,
        });
      });
      this.showDataChart();
      this.clearInput("file");
    },
    updateDataValues() {
      let data = "";
      this.dataSet.dataValues.items.forEach((item) => {
        data = JSON.stringify(item.data);
        this.updateDataValueById({
          id: item.id,
          data: data,
          dataSetId: this.dataSet.id,
        });
      });
    },
    /* async saveFilter() {
      let data = {
        title: this.filterName,
        key: this.filterKey,
        operation: this.filterOperation,
        min: this.filterMin,
        max: this.filterMax,
      };
      this.filters.push(data);
      await this.updateDataSetById({
        id: this.dataSet.id,
        filters: JSON.stringify(this.filters),
      });
    },
    setFilter() {
      this.filterName = this.selectedFilter.title;
      this.filterKey = this.selectedFilter.key;
      this.filterOperation = this.selectedFilter.operation;
      this.filterMax = this.selectedFilter.max;
      this.filterMin = this.selectedFilter.min;
      this.calcFilter();
    },
    addFilter() {
      this.showNewFilterForm = true;
      this.selectedFilter = null;
      this.clearFilter();
    }, */
    clearInput(type) {
      console.log(type);
      this.$refs.form.inputs.forEach((input) => {
        console.log(input);
        if (input.type == type) {
          input = "";
        }
      });
    },
    /* editForm() {
      this.isReadOnly = false;
    }, */
    async showDataChart() {
      await this.fetchDataSet(this.$route.params.dataSetId);
      this.setTableItems(this.createMasterData(this.dataSet.dataValues.items));
    },
    setTableItems(data) {
      this.items = data;
      this.filteredItems = this.items;
      this.fixNullVals();
    },
    fixNullVals() {
      this.items.forEach((i) => {
        this.allKeys.forEach((k) => {
          if (i[k] == undefined) {
            i[k] = "";
          }
        });
      });
    },
    
    showAddColumn() {
      this.columnForm = true;
    },
    addColumn() {
      this.items.forEach((item) => {
        switch (this.newColumn.action) {
          case "Difference":
            if (
              !isNaN(item[this.newColumn.col1]) &&
              !isNaN(item[this.newColumn.col2])
            ) {
              item[this.newColumn.title] =
                item[this.newColumn.col1] - item[this.newColumn.col2];
            } else if (
              moment(item[this.newColumn.col1]).isValid() &&
              moment(item[this.newColumn.col2]).isValid()
            )
              item[this.newColumn.title] =
                (moment(item[this.newColumn.col1]) -
                  moment(item[this.newColumn.col2])) /
                (1000 * 60 * 60 * 24);
            break;
          case "Sum":
            if (
              !isNaN(item[this.newColumn.col1]) &&
              !isNaN(item[this.newColumn.col2])
            ) {
              item[this.newColumn.title] =
                parseFloat(item[this.newColumn.col2]) +
                parseFloat(item[this.newColumn.col1]);
            } /* else if (moment(item[this.newColumn.col1]).isValid() && moment(item[this.newColumn.col2]).isValid())
              item[this.newColumn.title] = (moment(item[this.newColumn.col2]) + moment(item[this.newColumn.col1])) / (1000 * 60 * 60 * 24) */
            break;
          case "Product":
            if (
              !isNaN(item[this.newColumn.col1]) &&
              !isNaN(item[this.newColumn.col2])
            ) {
              item[this.newColumn.title] =
                parseFloat(item[this.newColumn.col2]) *
                parseFloat(item[this.newColumn.col1]);
            } /* else if (moment(item[this.newColumn.col1]).isValid() && moment(item[this.newColumn.col2]).isValid())
              item[this.newColumn.title] = (moment(item[this.newColumn.col2]) * moment(item[this.newColumn.col1])) / (1000 * 60 * 60 * 24) */
            break;
          case "Quotient":
            if (
              !isNaN(item[this.newColumn.col1]) &&
              !isNaN(item[this.newColumn.col2])
            ) {
              item[this.newColumn.title] =
                parseFloat(item[this.newColumn.col2]) /
                parseFloat(item[this.newColumn.col1]);
            } /* else if (moment(item[this.newColumn.col1]).isValid() && moment(item[this.newColumn.col2]).isValid())
              item[this.newColumn.title] = (moment(item[this.newColumn.col2]) * moment(item[this.newColumn.col1])) / (1000 * 60 * 60 * 24) */
            break;
          case "Average":
            if (
              !isNaN(item[this.newColumn.col1]) &&
              !isNaN(item[this.newColumn.col2])
            ) {
              item[this.newColumn.title] =
                (parseFloat(item[this.newColumn.col2]) +
                  parseFloat(item[this.newColumn.col1])) /
                2;
              console.log(item[this.newColumn.title]);
            } else if (
              moment(item[this.newColumn.col1]).isValid() &&
              moment(item[this.newColumn.col2]).isValid()
            )
              item[this.newColumn.title] =
                (moment(item[this.newColumn.col2]) +
                  moment(item[this.newColumn.col1])) /
                (1000 * 60 * 60 * 24);
            break;
          default:
            alert("Must be a valid number");
            break;
        }
      });
      /* This force re-renders the table... */
      this.items.push({});
      this.cancelColumnForm();
      this.items.pop();
      this.updateDataValues();
    },
    cancelColumnForm() {
      this.columnForm = false;
      this.newColumn = {
        title: "",
        action: "",
        col1: "",
        col2: "",
      };
    },
    showRemoveColumn() {
      this.rmColForm = true;
    },
    removeColumns() {
      this.colsToRemove.forEach((col) => {
        this.items.forEach((item) => {
          delete item[col];
        });
      });
      this.$refs.grid.fields.forEach((field, i) => {
        if (this.colsToRemove.includes(field.name)) {
          this.$refs.grid.fields.splice(i, 1);
        }
      });
      this.items.push({});
      this.rmColForm = false;
      this.items.pop();
      this.updateDataValues();
    },
    onUpdate(records) {
      console.log(records);
    },
    /* calcFilter() {
      if (this.filterKey && this.filterOperation) {
        let colType = this.checkColType(this.filterKey, this.items);
        //let firstItem = this.items[0][this.filterKey];
        if (
          this.filterOperation == "Between" &&
          this.filterMin &&
          this.filterMax
        ) {
          if (colType == "number") {
            this.filteredItems = this.items.filter(
              (i) =>
                parseFloat(i[this.filterKey]) >= parseFloat(this.filterMin) &&
                parseFloat(i[this.filterKey]) <= parseFloat(this.filterMax)
            );
          } else if (colType == "date") {
            this.filteredItems = this.items.filter(
              (i) =>
                new Date(i[this.filterKey]) >= new Date(this.filterMin) &&
                new Date(i[this.filterKey]) <= new Date(this.filterMax)
            );
          } else if (colType == "string") {
            this.filteredItems = this.items.filter(
              (i) =>
                i[this.filterKey] >= this.filterMin &&
                i[this.filterKey] <= this.filterMax
            );
          }
        } else if (this.filterOperation == "Greater Than" && this.filterMin) {
          if (colType == "number") {
            this.filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) > parseFloat(this.filterMin)
            );
          } else if (colType == "date") {
            this.filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) > new Date(this.filterMin)
            );
          } else if (colType == "string") {
            this.filteredItems = this.items.filter(
              (i) => i[this.filterKey] > this.filterMin
            );
          }
        } else if (
          this.filterOperation == "Greater Than or Equal To" &&
          this.filterMin
        ) {
          if (colType == "number") {
            this.filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) >= parseFloat(this.filterMin)
            );
          } else if (colType == "date") {
            this.filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) >= new Date(this.filterMin)
            );
          } else if (colType == "string") {
            this.filteredItems = this.items.filter(
              (i) => i[this.filterKey] >= this.filterMin
            );
          }
        } else if (this.filterOperation == "Less Than" && this.filterMax) {
          if (colType == "number") {
            this.filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) < parseFloat(this.filterMax)
            );
          } else if (colType == "date") {
            this.filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) < new Date(this.filterMax)
            );
          } else if (colType == "string") {
            this.filteredItems = this.items.filter(
              (i) => i[this.filterKey] < this.filterMax
            );
          }
        } else if (
          this.filterOperation == "Less Than or Equal To" &&
          this.filterMax
        ) {
          if (colType == "number") {
            this.filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) <= parseFloat(this.filterMax)
            );
          } else if (colType == "date") {
            this.filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) <= new Date(this.filterMax)
            );
          } else if (colType == "string") {
            this.filteredItems = this.items.filter(
              (i) => i[this.filterKey] <= this.filterMax
            );
          }
        } else if (this.filterOperation == "Equal To" && this.filterMin) {
          if (colType == "number") {
            this.filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) == parseFloat(this.filterMin)
            );
          } else if (colType == "date") {
            this.filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) == new Date(this.filterMin)
            );
          } else if (colType == "string") {
            this.filteredItems = this.items.filter(
              (i) => i[this.filterKey] == this.filterMin
            );
          }
        } else if (this.filterOperation == "Not Equal To" && this.filterMin) {
          if (colType == "number") {
            this.filteredItems = this.items.filter(
              (i) =>
                parseFloat(i[this.filterKey]) !== parseFloat(this.filterMin)
            );
          } else if (colType == "date") {
            this.filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) !== new Date(this.filterMin)
            );
          } else if (colType == "string") {
            this.filteredItems = this.items.filter(
              (i) => i[this.filterKey] !== this.filterMin
            );
          }
        } else if (
          this.filterOperation == "Current Quarter" &&
          colType == "date"
        ) {
          let currentDate = new Date();
          let currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1; // current quarter
          let currentYear = currentDate.getFullYear();
          let startQuarter = new Date(currentYear, (currentQuarter - 1) * 3, 1);
          let endQuarter = new Date(
            startQuarter.getFullYear(),
            startQuarter.getMonth() + 3,
            0,
            23,
            59,
            59,
            999
          );
          this.filteredItems = this.items.filter(
            (i) =>
              new Date(i[this.filterKey]) >= startQuarter &&
              new Date(i[this.filterKey]) <= endQuarter
          );
        } else if (
          this.filterOperation == "Last Quarter" &&
          colType == "date"
        ) {
          let currentDate = new Date();
          let currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1; // current quarter
          let currentYear = currentDate.getFullYear();
          let lastQuarter = currentQuarter == 1 ? 4 : currentQuarter - 1; // last quarter
          console.log(lastQuarter);
          let lastYear = currentQuarter == 1 ? currentYear - 1 : currentYear;
          let startQuarter = new Date(lastYear, (lastQuarter - 1) * 3, 1);
          console.log(startQuarter);
          let endQuarter = new Date(
            startQuarter.getFullYear(),
            startQuarter.getMonth() + 3,
            0,
            23,
            59,
            59,
            999
          );
          this.filteredItems = this.items.filter(
            (i) =>
              new Date(i[this.filterKey]) >= startQuarter &&
              new Date(i[this.filterKey]) <= endQuarter
          );
        }
      }
    }, */
    isDate(str) {
      return new Date(str) !== "Invalid Date" && !isNaN(new Date(str));
    },
    /* changeFilterOperation() {
      this.clearFilterValues();
      if (this.checkColType(this.filterKey, this.items) == "date") {
        this.calcFilter();
      }
    },
    clearFilterValues() {
      this.filterMin = null;
      this.filterMax = null;
    },
    clearFilter() {
      this.filterName = "";
      this.filterKey = "";
      this.filterOperation = "";
      this.clearFilterValues();
      this.filteredItems = this.items;
    }, */
  },
  watch: {
    dataSet() {
      if (this.dataSet.id) {
        if (this.dataSet.id !== this.$route.params.dataSetId) {
          //console.log(this.dataSet)
          this.clear();
        }
      }
    },
    /* filterKey() {
      if (this.filterKey) {
        let colType = this.checkColType(this.filterKey, this.items);
        if (colType == "date") {
          this.filterOperationKeys = [
            "Equal To",
            "Not Equal To",
            "Greater Than",
            "Greater Than or Equal To",
            "Less Than",
            "Less Than or Equal To",
            "Between",
            "Current Quarter",
            "Last Quarter",
          ];
        } else if (colType == "number" || colType == "string") {
          this.filterOperationKeys = [
            "Equal To",
            "Not Equal To",
            "Greater Than",
            "Greater Than or Equal To",
            "Less Than",
            "Less Than or Equal To",
            "Between",
          ];
        }
      }
    }, */
    statusCode() {
      if (this.statusCode == 201) {
        this.$router.push(`/data-sets/${this.dataSet.id}`);
        this.SET_STATUS_CODE(0);
      }
    },
  },
  async mounted() {
    if (this.$route.path === `/${this.currentChannels[0].name}/data-sets`) {
      this.dataSet.id = "";
      this.clear();
    } else {
      await this.fetchDataSet(this.$route.params.dataSetId);
      if (
        this.dataSet &&
        this.dataSet.dataValues &&
        this.dataSet.dataValues.items &&
        this.dataSet.dataValues.items.length > 0
      ) {
        this.setTableItems(
          this.createMasterData(this.dataSet.dataValues.items)
        );
      }
    }
    if (this.dataSet.filters) {
      this.filters = this.dataSet.filters;
    }
    this.fetchChannels();
    this.fetchDataSets();
    if (!this.dataSet.user) {
      this.dataSet.user = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
    }
    console.log(this.$refs);
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
  background-color: #2196f3;
}

div >>> .v-select__selections .v-chip .v-icon {
  color: white;
}
</style>
