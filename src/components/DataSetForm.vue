<template>
  <v-row>
    <!-- Title -->
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3 v-if="!isReadOnly && dataSet.id">Update {{ dataSet.title }}</h3>
        <h3 v-else-if="dataSet.id">View {{ dataSet.title }}</h3>
        <h3 v-else>Add Data Set</h3>
        <div>
          <v-btn
            v-if="!isReadOnly"
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            @click="saveDataSet"
          >
            Save
          </v-btn>
          <v-btn
            v-else
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            @click="editForm"
          >
            Edit
          </v-btn>
          <v-btn
            v-if="isReadOnly"
            class="mb-2"
            small
            outlined
            @click="resetAndGoBack"
          >
            Close
          </v-btn>
          <v-btn
            v-if="!isReadOnly"
            class="mb-2"
            small
            outlined
            @click="cancelForm"
          >
            Cancel
          </v-btn>
        </div>
      </div>
      <v-divider />
    </v-col>
    <v-col>
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
        <v-row justify='space-around'>
          <v-col cols="3">
            <v-text-field
              v-model="dataSet.title"
              label="Title"
              dense
              required
              :readonly="isReadOnly"
              :rules="[(v) => !!v || 'Title is required']"
            />
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="dataSet.description"
              label="Description"
              dense
              :readonly="isReadOnly"
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
                    class="mb-1"
                    @click="addNewDataValue"
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

    <v-col
      v-show="
        dataSet.id &&
        this.dataSet.dataValues &&
        this.dataSet.dataValues.items &&
        this.dataSet.dataValues.items.length > 0
      "
      class="col-12"
    >
      <v-card class="d-flex flex-column preview-container justify-center mx-10">
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
          <span class="d-flex justify-end">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  class="mb-4 mr-4 px-2"
                  @click="showAddColumn"
                  v-bind="attrs"
                  v-on="on"
                  ><v-icon>mdi-table-column-plus-after</v-icon>
                </v-btn>
              </template>
              <span>Add Function Column</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  class="mr-6 mb-4"
                  @click="showRemoveColumn"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-table-column-remove</v-icon>
                </v-btn>
              </template>
              <span>Remove Column</span>
            </v-tooltip>
          </span>
          <vue-excel-editor
            v-if="renderComponent"
            ref="grid"
            v-model="items"
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
          :items="choices"
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
</template>

<script>
import { XlsxRead, XlsxJson } from "vue-xlsx";
import { mapActions, mapGetters, mapMutations } from "vuex";
import datasetMixin from "../mixins/dataset-mixin";
import moment from "moment";

export default {
  name: "DataSetForm",
  components: {
    XlsxRead,
    XlsxJson,
  },
  mixins: [datasetMixin],
  data() {
    return {
      choices: ["Sum", "Difference", "Product", "Quotient", "Average"],
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
      //selected: [],
      xAxisKeys: [],
      xAxisValue: "",
      formValid: true,
      submitAttempted: false,
      dataValueInput: "",
      isReadOnly: false,
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
    };
  },
  computed: {
    ...mapGetters([
      "dataSet",
      "dataSets",
      "dataValue",
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
    cancelForm() {
      this.$route.path === `/${this.currentChannels[0].name}/data-sets`
        ? this.resetAndGoBack()
        : (this.isReadOnly = true);
    },
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
        if (!this.isReadOnly && this.dataSet.id) {
          await this.updateDataSetById({
            id: this.dataSet.id,
            title: this.dataSet.title,
            description: this.dataSet.description,
            user: this.dataSet.user,
            channelId: this.currentChannels[0].channelId,
          }).then((this.isReadOnly = true));
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
    clearInput(type) {
      console.log(type);
      this.$refs.form.inputs.forEach((input) => {
        console.log(input);
        if (input.type == type) {
          input = "";
        }
      });
    },
    editForm() {
      this.isReadOnly = false;
    },
    async showDataChart() {
      await this.fetchDataSet(this.$route.params.dataSetId);
      this.setTableItems(this.createMasterData(this.dataSet.dataValues.items));
    },
    setTableItems(data) {
      this.items = data;
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
    checkColType(col, items) {
      return items.every((i) => !isNaN(i[col]))
        ? "number"
        : items.every(
            (i) => moment(i[col]).isValid() && moment().diff(moment(i[col])) > 0
          )
        ? "date"
        : "string";
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
  },
  watch: {
    dataSet() {
      if (this.dataSet.id) {
        this.isReadOnly = true;

        if (this.dataSet.id !== this.$route.params.dataSetId) {
          //console.log(this.dataSet)
          this.clear();
        }
      } else this.isReadOnly = false;
    },
    /* selected() {
      if (this.selected && this.selected.length > 0) {
        console.log(this.selected)
      } else console.log("no SELECTED data");
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
      this.isReadOnly = false;
      this.clear();
    } else {
      await this.fetchDataSet(this.$route.params.dataSetId);
      if (
        this.dataSet &&
        this.dataSet.dataValues &&
        this.dataSet.dataValues.items &&
        this.dataSet.dataValues.items.length > 0
      ) {
        //console.log(this.dataSet.dataValues)
        /* const keys = Object.keys(
          this.createMasterData(this.dataSet.dataValues.items)[0]
        ); */
        //this.xAxisKeys = keys
        /* this.headers = keys.map((item) => ({
          text: item,
          value: item,
        })); */
        //this.selectedHeaders = this.headers
        this.setTableItems(
          this.createMasterData(this.dataSet.dataValues.items)
        );
      }
      this.isReadOnly = true;
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
