<template>
  <v-row>
    <!-- Title -->
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3 v-if="!isReadOnly && dataSet.id">Update {{ dataSet.title }}</h3>
        <h3 v-else-if="dataSet.id">View {{ dataSet.title }}</h3>
        <h3 v-else>Add Data Set</h3>
        <div>
          <v-btn v-if="!isReadOnly" @click="saveDataSet" class="px-5 mr-2 mb-2" color="primary" depressed
            small>Save</v-btn>
          <v-btn v-else @click="editForm" class="px-5 mr-2 mb-2" color="primary" depressed small>Edit</v-btn>
          <v-btn v-if="isReadOnly" class="mb-2" @click="resetAndGoBack" small outlined>Close</v-btn>
          <v-btn v-if="!isReadOnly" class="mb-2" @click="cancelForm" small outlined>Cancel</v-btn>
        </div>
      </div>
      <v-divider></v-divider>
    </v-col>
    <v-col>
      <v-alert v-if="!formValid && submitAttempted" type="error" dense dismissible>Please fix highlighted fields below
        before sumbitting Report</v-alert>
      <!-- Form Fields -->
      <v-form v-model="formValid" ref="form">
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="dataSet.title" label="Title" dense required :readonly="isReadOnly"
              :rules="[(v) => !!v || 'Title is required']"></v-text-field>
            <div class="d-flex">
              <v-file-input v-show="dataSet.id != ''" placeholder="Please choose a file..." type="file"
                @change.native="onChange" @click:clear="clearInput('file')" dense />
              <xlsx-read :options="readOptions" :file="file">

                <xlsx-json :options="readOptions" @parsed="setTableItems"></xlsx-json>
              </xlsx-read>
              <v-btn v-if="dataSet.id" :disabled="!file" class="mb-1 ml-2" elevation="4" small
                @click="addNewDataValue"><v-icon>mdi-plus-circle-outline</v-icon>Add to Dataset</v-btn>
            </div>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="dataSet.description" label="Description" dense :readonly="isReadOnly"></v-text-field>
            <!-- <v-select v-if="dataSet.id" :items="choices" label="Add a column" outlined></v-select> -->
          </v-col>
        </v-row>
      </v-form>
    </v-col>

    <v-col v-show="
      dataSet.id &&
      this.dataSet.dataValues &&
      this.dataSet.dataValues.items &&
      this.dataSet.dataValues.items.length > 0
    " class="col-12">
      <v-card class="d-flex flex-column preview-container justify-center">
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
        <v-skeleton-loader v-if="$store.getters.loading || $store.getters.saving" class="mx-auto" type="table"
          width="100%"></v-skeleton-loader>


        <div class="ma-4" v-else>
          <span class="d-flex justify-end">
            <v-btn small class="mr-4 mb-4" @click="showRemoveColumn">
              Remove Columns
            </v-btn>
            <v-btn small class="mb-4 mr-6" @click="showAddColumn"><v-icon>mdi-plus</v-icon><v-icon small
                class="ml-2">mdi-function-variant</v-icon>
            </v-btn>
          </span>
          <vue-excel-editor v-if="renderComponent" v-model="items" readonly :free-select="true" ref="grid" no-header-edit
            @update="onUpdate">
            <vue-excel-column autoFillWidth v-for="col, i in allKeys" :key="i" :field="col" :label="col"
              :type="checkColType(col, items)" text-align="left" />
          </vue-excel-editor>
          <!-- <v-data-table :headers="headers" :items="items" :single-select="false" :search="search"
            :loading="$store.getters.loading" loading-text="Loading... Please wait">
          </v-data-table> -->
        </div>
      </v-card>
    </v-col>
    <v-dialog v-model="columnForm" width="20%">
      <v-card class="pa-4">
        <v-text-field v-model="newColumn.title" label="Column Name" outlined dense required
          :rules="[(v) => !!v || 'Column name is required']"></v-text-field>
        <v-select dense v-model="newColumn.action" v-if="dataSet.id" :items="choices" label="Choose an action"
          outlined></v-select>
        <v-select dense v-model="newColumn.col1" v-if="dataSet.id"
          :items="allKeys.filter(k => checkColType(k, items) != 'string')" label="First column" outlined></v-select>
        <v-select dense v-model="newColumn.col2" v-if="dataSet.id"
          :items="allKeys.filter(k => checkColType(k, items) != 'string')" label="Second column" outlined></v-select>
        <span class="d-flex justify-end">

          <!-- <v-btn color="warning" class="mr-4" @click="cancelColumnForm" small>
            Cancel
          </v-btn> -->
          <v-btn class="mr-4" small outlined @click="cancelColumnForm">Cancel</v-btn>
          <v-btn color="primary" @click="addColumn" small>
            Add Column
          </v-btn>
        </span>
      </v-card>
    </v-dialog>
    <v-dialog v-model="rmColForm" width="20%">
      <v-card class="pa-4">
        <v-select v-model="colsToRemove" :items="allKeys" label="Select" multiple chips
          hint="Choose the columns you wish to remove" persistent-hint></v-select>
        <v-btn class="mt-6" color="primary" @click="removeColumns" small>
          Remove Columns
        </v-btn>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { XlsxRead, XlsxJson } from "vue-xlsx";
import { mapActions, mapGetters, mapMutations } from "vuex";
import datasetMixin from "../mixins/dataset-mixin";
import moment from 'moment';

export default {
  name: "DataSetForm",
  components: {
    XlsxRead,
    XlsxJson,

  },
  data() {
    return {
      choices: ['Sum', 'Difference', 'Product', 'Quotient', 'Average'],
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
        title: '',
        action: '',
        col1: '',
        col2: '',
      },
      renderComponent: true,
      colsToRemove: [],
    };
  },
  mixins: [datasetMixin],
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
        let uniqueKeys = []
        let newKeys = this.items.map(s => Object.keys(s))
        newKeys.forEach(arr => {
          arr.forEach(key => {
            if (!uniqueKeys.includes(key)) {
              uniqueKeys.push(key)
            }
          })
        })
        console.log(uniqueKeys.filter(k => k != '$id'))
        return uniqueKeys.filter(k => k != '$id')
      } else return []
    }
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
            this.$router.push(`/${this.currentChannels[0].name}/data-sets/${id}`);
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
      let objString = ''
      this.items.forEach((item) => {
        objString = JSON.stringify(item);
        this.addDataValue({
          data: objString,
          dataSetId: this.dataSet.id,
        })
      })
      this.showDataChart();
      this.clearInput("file");
    },
    updateDataValues() {
      let data = ''
      this.dataSet.dataValues.items.forEach(item => {
        data = JSON.stringify(item.data);
        this.updateDataValueById({
          id: item.id,
          data: data,
          dataSetId: this.dataSet.id,
        })
      })
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
      this.fixNullVals()
    },
    fixNullVals() {
      this.items.forEach(i => {
        this.allKeys.forEach(k => {
          if (i[k] == undefined) {
            i[k] = ''
          }
        })
      })
    },
    checkColType(col, items) {
      return items.every(i => !isNaN(i[col])) ? 'number' :
        items.every(i => moment(i[col]).isValid() && moment().diff(moment(i[col])) > 0) ? 'date' : 'string'
    },
    showAddColumn() {
      this.columnForm = true
    },
    addColumn() {
      this.items.forEach(item => {
        switch (this.newColumn.action) {
          case "Difference":
            if (!isNaN(item[this.newColumn.col1]) && !isNaN(item[this.newColumn.col2])) {
              item[this.newColumn.title] = item[this.newColumn.col2] - item[this.newColumn.col1]
            } else if (moment(item[this.newColumn.col1]).isValid() && moment(item[this.newColumn.col2]).isValid())
              item[this.newColumn.title] = (moment(item[this.newColumn.col2]) - moment(item[this.newColumn.col1])) / (1000 * 60 * 60 * 24)
            break;
          case "Sum":
            if (!isNaN(item[this.newColumn.col1]) && !isNaN(item[this.newColumn.col2])) {
              item[this.newColumn.title] = parseFloat(item[this.newColumn.col2]) + parseFloat(item[this.newColumn.col1])
            } /* else if (moment(item[this.newColumn.col1]).isValid() && moment(item[this.newColumn.col2]).isValid())
              item[this.newColumn.title] = (moment(item[this.newColumn.col2]) + moment(item[this.newColumn.col1])) / (1000 * 60 * 60 * 24) */
            break;
          case "Product":
            if (!isNaN(item[this.newColumn.col1]) && !isNaN(item[this.newColumn.col2])) {
              item[this.newColumn.title] = parseFloat(item[this.newColumn.col2]) * parseFloat(item[this.newColumn.col1])
            } /* else if (moment(item[this.newColumn.col1]).isValid() && moment(item[this.newColumn.col2]).isValid())
              item[this.newColumn.title] = (moment(item[this.newColumn.col2]) * moment(item[this.newColumn.col1])) / (1000 * 60 * 60 * 24) */
            break;
          case "Quotient":
            if (!isNaN(item[this.newColumn.col1]) && !isNaN(item[this.newColumn.col2])) {
              item[this.newColumn.title] = parseFloat(item[this.newColumn.col2]) / parseFloat(item[this.newColumn.col1])
            } /* else if (moment(item[this.newColumn.col1]).isValid() && moment(item[this.newColumn.col2]).isValid())
              item[this.newColumn.title] = (moment(item[this.newColumn.col2]) * moment(item[this.newColumn.col1])) / (1000 * 60 * 60 * 24) */
            break;
          case "Average":
            if (!isNaN(item[this.newColumn.col1]) && !isNaN(item[this.newColumn.col2])) {
              item[this.newColumn.title] = (parseFloat(item[this.newColumn.col2]) + parseFloat(item[this.newColumn.col1])) / 2
              console.log(item[this.newColumn.title])
            } else if (moment(item[this.newColumn.col1]).isValid() && moment(item[this.newColumn.col2]).isValid())
              item[this.newColumn.title] = (moment(item[this.newColumn.col2]) + moment(item[this.newColumn.col1])) / (1000 * 60 * 60 * 24)
            break;
          default:
            alert('Must be a valid number')
            break;
        }
      })
      /* This force re-renders the table... */
      this.items.push({})
      this.cancelColumnForm()
      this.items.pop()
      this.updateDataValues()
    },
    cancelColumnForm() {
      this.columnForm = false
      this.newColumn = {
        title: '',
        action: '',
        col1: '',
        col2: '',
      }
    },
    showRemoveColumn() {
      this.rmColForm = true
    },
    removeColumns() {
      this.colsToRemove.forEach(col => {
        this.items.forEach(item => {
          delete item[col]
        })
      })
      this.$refs.grid.fields.forEach((field, i) => {
        if (this.colsToRemove.includes(field.name)) {
          this.$refs.grid.fields.splice(i, 1)
        }
      })
      this.items.push({})
      this.rmColForm = false
      this.items.pop()
      this.updateDataValues()
    },
    onUpdate(records) {
      console.log(records)
    }
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
        this.setTableItems(this.createMasterData(this.dataSet.dataValues.items));
      }
      this.isReadOnly = true;
    }
    this.fetchChannels();
    this.fetchDataSets();
    if (!this.dataSet.user) {
      this.dataSet.user = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
    }
    console.log(this.$refs)
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
  background-color: #2196f3;
}

div>>>.v-select__selections .v-chip .v-icon {
  color: white;
}
</style>
