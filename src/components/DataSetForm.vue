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
            @click="saveDataSet"
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            >Save</v-btn
          >
          <v-btn
            v-else
            @click="editForm"
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            >Edit</v-btn
          >
          <v-btn
            v-if="isReadOnly"
            class="mb-2"
            @click="resetAndGoBack"
            small
            outlined
            >Close</v-btn
          >
          <v-btn
            v-if="!isReadOnly"
            class="mb-2"
            @click="cancelForm"
            small
            outlined
            >Cancel</v-btn
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
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="dataSet.title"
              label="Title"
              dense
              required
              :readonly="isReadOnly"
              :rules="[(v) => !!v || 'Title is required']"
            ></v-text-field>
            <div class="d-flex">
              <v-file-input
                v-show="dataSet.id != ''"
                placeholder="Please choose a file..."
                type="file"
                @change.native="onChange"
                @click:clear="clearInput('file')"
                dense
              />
              <xlsx-read :options="readOptions" :file="file">
                
                <xlsx-json
                  :options="readOptions"
                  @parsed="uploadData"
                ></xlsx-json>
              </xlsx-read>
              <v-btn
                v-if="dataSet.id"
                :disabled="!file"
                class="mb-1 ml-2"
                elevation="4"
                small
                @click="addNewDataValue"
                ><v-icon>mdi-plus-circle-outline</v-icon>Add to Dataset</v-btn
              >
            </div>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="dataSet.description"
              label="Description"
              dense
              :readonly="isReadOnly"
            ></v-text-field>
            <v-select
              :items="choices"
              label="Add a column"
              outlined
            ></v-select>
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
      <v-card class="d-flex flex-column preview-container justify-center">
        <!-- Table Preview -->
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-card-title class="justify-center">
          <!-- <v-progress-circular v-if="$store.getters.loading" :size="70" indeterminate color="primary"
            class="m-2"></v-progress-circular> -->
        </v-card-title>
        <div class="ma-4" v-if="chartType === 'Data Table'">
          <vue-excel-editor v-model="selected" filter-row :readonly="isReadOnly">
            <vue-excel-column v-for="col, i in Object.keys(selected[0])" :key="i" :field="col" :label="col" :type="col == 'Date' ? 'date' : 'string'" width="200px" />
            <!-- <vue-excel-column field="gender" label="Gender" type="select" width="50px" :options="['F','M','U']" /> -->
        </vue-excel-editor>
          <!-- <v-data-table
            :headers="headers"
            :items="items"
            :single-select="false"
            :search="search"
            :loading="$store.getters.loading"
            loading-text="Loading... Please wait"
          >
          </v-data-table> -->
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { XlsxRead, XlsxJson } from "vue-xlsx";
import { mapActions, mapGetters, mapMutations } from "vuex";
import datasetMixin from "../mixins/dataset-mixin";

export default {
  name: "DataSetForm",
  components: {
    XlsxRead,
    XlsxJson,
   
  },
  data() {
    return {
      choices: ['Count', 'Count Unique Values', 'Sum', 'Average', 'Median'],
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
      chartType: "Data Table",
      readOptions: {
        cellDates: true,
        raw: false,
        dateNF: "mm/dd/yyyy",
      },
      headers: [],
      //selectedHeaders:[],
      value: [],
      items: [],
      selected: [],
      xAxisKeys: [],
      xAxisValue: "",
      formValid: true,
      submitAttempted: false,
      dataValueInput: "",
      isReadOnly: false,
      search: "",
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
  },
  methods: {
    ...mapActions([
      "addDataSet",
      "addDataValue",
      "updateDataSetById",
      "updateDataSet",
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
      this.selected = [];
      this.headers = [];
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
            this.$router.push(`/:title/data-sets/${id}`);
            //console.log(this.selected)
            /* console.log(this.selected)
            this.fetchDataSetThenAddDataValue(id, this.selected) */
            this.dataSet.id = id;
          });
        }
        this.resetAndGoBack();
      }
    },
    async addNewDataValue() {
      let objString = JSON.stringify(this.selected);
      await this.addDataValue({
        data: objString,
        dataSetId: this.dataSet.id,
      });
      this.showDataChart();
      this.clearInput("file");
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
      //console.log(this.dataSet)
      //this.createMasterData(this.dataSet.dataValues.items)
      this.uploadData(this.createMasterData(this.dataSet.dataValues.items));
    },
    uploadData(data) {
      //console.log(data)
      this.items = data;
      this.selected = data;
      const keys = Object.keys(data[0]);
      this.headers = keys.map((item) => ({
        text: item,
        value: item,
      }));
      /* const keys = Object.keys(newData[0])
      this.xAxisKeys = keys */
      //this.moveArrByKey(this.xAxisKeys, this.xAxisValue)
      //this.setDataTable(data)
      //this.selectedHeaders = this.headers
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
        const keys = Object.keys(
          this.createMasterData(this.dataSet.dataValues.items)[0]
        );
        //this.xAxisKeys = keys
        this.headers = keys.map((item) => ({
          text: item,
          value: item,
        }));
        //this.selectedHeaders = this.headers
        this.uploadData(this.createMasterData(this.dataSet.dataValues.items));
      }
      this.isReadOnly = true;
    }
    this.fetchChannels();
    this.fetchDataSets();
    if (!this.dataSet.user) {
      this.dataSet.user = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
    }
    console.log(Object.keys(this.selected[0])[0])
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
    selected() {
      if (this.selected && this.selected.length > 0) {
        console.log(this.selected)
      } else console.log("no SELECTED data");
    },
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
