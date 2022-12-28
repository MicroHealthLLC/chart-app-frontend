<template>
  <v-row>
    <!-- Title -->
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3 v-if="(!isReadOnly && dataSet.id)">Update {{ dataSet.id }}</h3>
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
              v-model="dataSet.title"
              label="Title"
              dense
              required
              :readonly="isReadOnly"
              :rules="[(v) => !!v || 'Title is required']"
            ></v-text-field>
          </div>
          <div>
            <v-text-field :readonly="isReadOnly" v-model="dataSet.user" label="Created By" dense>
            </v-text-field>
          </div>
          <div :class="{ description: dataSet.id }">
            <v-text-field
              v-model="dataSet.description"
              label="Description"
              dense
              :readonly="isReadOnly"
            ></v-text-field>
          </div>
          <!-- <div d-flex flex-row>
            <v-text-field type="number" v-model="dataValueInput" label="Add Data Value" clearable dense>
              <template v-slot:append>
              <v-tooltip
                bottom
              >
                <template v-slot:activator="{ on }">
                  
                  <v-btn v-if="dataSet.id" class="mb-1" v-on="on" icon elevation="4" small @click="addNewDataValue"><v-icon>mdi-plus-circle-outline</v-icon></v-btn>
                </template>
                Add Value
              </v-tooltip>
            </template></v-text-field>
          </div> -->
          <!-- <v-btn v-if="dataSet.id" @click="showDataChart">Show Data</v-btn> -->
          <div>
            <v-file-input
              v-if="dataSet.id"
              placeholder="Please choose a file..."
              type="file"
              @change.native="onChange"
              @click:clear="clearInput('file')"
              dense
              required
              :rules="[(v) => !!v || 'Data File is required']"
            />
            <xlsx-read :options="readOptions" :file="file">
              <xlsx-json
                :options="readOptions"
                @parsed="uploadData"
              ></xlsx-json>
            </xlsx-read>
            <div>
            <v-btn v-if="dataSet.id" :disabled="(!file || !selectedHeaders)" class="mb-1" elevation="4" small @click="addNewDataValue"><v-icon>mdi-plus-circle-outline</v-icon> Add New Data</v-btn>
        </div>
          </div>
          <!-- <div class="channels">
            <v-select
              v-model="dataSet.channels"
              label="Channels"
              :items="channels"
              item-text="title"
              item-value="id"
              multiple
              small-chips
              dense
              deletable-chips
              return-object
              required
              :rules="[(v) => v.length > 0 || 'At least 1 Channel is required']"
              hint="Please select all Channels that have access to this Data Set"
              persistent-hint
            ></v-select>
          </div> -->
        </div>
      </v-form>
    </v-col> 
    <!-- Chart Preview -->
    <v-col class="col-12">
      <v-card class="d-flex flex-column preview-container">
        <!-- Chart Buttons -->
        <!-- <v-btn-toggle class="ma-4" color="primary" mandatory>
          <v-btn @click="toggleDataTable" small>Data Table</v-btn>
          <v-btn @click="toggleLineChart" small>Line</v-btn>
          <v-btn @click="toggleBarChart" small>Bar</v-btn>
          <v-btn @click="toggleRadarChart" small>Radar</v-btn>
          <v-btn @click="toggleDonutChart" small>Donut</v-btn>
          <v-btn @click="togglePieChart" small>Pie</v-btn>
          <v-btn @click="togglePolarAreaChart" small>Polar Area</v-btn>
        </v-btn-toggle>
        <small v-if="(dataSet.dataValues && dataSet.dataValues.items && dataSet.dataValues.items.length > 0)" class="ml-6 mb-2">{{xAxisLabel}}</small>
        <v-row v-if="(dataSet.dataValues && dataSet.dataValues.items && dataSet.dataValues.items.length > 0)" class="ml-2">
          <v-col class="d-inline-flex" cols="12" sm="4">
            <v-select v-model="xAxisValue" :items="xAxisKeys" :label="xAxisLabel" solo dense @change="onChangeAxis"></v-select>
            
          </v-col>
          <v-col class="d-inline-flex" cols="16" sm="4">
            <v-select
              v-model="selectedHeaders"
              :items="headers"
              label="Select"
              multiple
              small
              solo
              dense
              hint="What are the target columns?"
              persistent-hint
              return-object
              @change="onChangeSelected"
            >
          </v-select><v-btn v-if="xAxisValue" @click="saveAxis" class="ml-2">Save</v-btn>
          </v-col>
        </v-row> -->
        <!-- Table Preview -->
        <v-card-title>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <div class="ma-4" v-if="chartType === 'Data Table'">
          <v-data-table v-model="selected" :headers="selectedHeaders" :items="items"  :single-select="false" :search="search">
            <!-- Action Buttons -->
          <!-- <template v-slot:item.actions="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" small class="mr-2" @click="editItem(item)" v-bind="attrs" v-on="on">
                  mdi-table-eye
                </v-icon>
              </template>
              <span>View</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="primary" small @click="deleteItem(item)" v-bind="attrs" v-on="on">
                  mdi-delete
                </v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </template> -->
          </v-data-table>
        </div>
        <!-- Chart Previews -->
        <div
          v-else-if="data.length > 0 && chartType !== 'Data Table'"
          class="ma-4"
        >
          <Component
            ref="chart"
            :is="graphType"
            :chartData="selected"
            :chartColors="colors[0].scheme"
            :height="600"
          ></Component>
          <v-btn
            v-if="circleChart"
            class="float-right"
            @click="changeChartData"
            outlined
            small
            >Next Category <v-icon small>mdi-arrow-right</v-icon></v-btn
          >
        </div>
        <!-- Placeholder Message -->
        <div v-else class="d-flex flex-grow-1 justify-center align-center ma-4">
          <p class="text-center placeholder-text">
            <v-icon class="placeholder-icon">mdi-chart-areaspline</v-icon>
            Please load a data set to view preview...
          </p>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import DataTable from "../components/DataTable";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import RadarChart from "../components/RadarChart";
import DoughnutChart from "../components/DoughnutChart";
import PieChart from "../components/PieChart";
import PolarAreaChart from "../components/PolarAreaChart";
import { XlsxRead } from "vue-xlsx";
import { XlsxJson } from "vue-xlsx";
import { mapActions, mapGetters, mapMutations } from "vuex";
import datasetMixin from "../mixins/dataset-mixin";

export default {
  name: "DataSetForm",
  components: {
    LineChart,
    BarChart,
    RadarChart,
    DoughnutChart,
    PieChart,
    PolarAreaChart,
    XlsxRead,
    XlsxJson,
  },
  data() {
    return {
      file: null,
      data: [],
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
      selectedHeaders:[],
      value: [],
      items: [],
      selected: [],
      xAxisKeys: [],
      xAxisValue: "",
      formValid: true,
      submitAttempted: false,
      dataValueInput: '',
      isReadOnly: false,
      search: ''
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
    graphType() {
      if (this.chartType === "Line") {
        return LineChart;
      } else if (this.chartType === "Bar") {
        return BarChart;
      } else if (this.chartType === "Radar") {
        return RadarChart;
      } else if (this.chartType === "Doughnut") {
        return DoughnutChart;
      } else if (this.chartType === "Pie") {
        return PieChart;
      } else if (this.chartType === "Polar Area") {
        return PolarAreaChart;
      } else {
        return LineChart;
      }
    },
    circleChart() {
      return (
        (this.chartType == "Doughnut" ||
          this.chartType == "Pie" ||
          this.chartType == "Polar Area") &&
        this.data.length > 0
      );
    },
    xAxisLabel (){
      if (this.chartType === "Line" || this.chartType === "Bar") {
        return 'X-Axis:'
      } else return 'Align Data By:'
    }
    /* createdBy() {
      if (!this.dataSet.id && this.user && this.user.attributes) {
        return `${this.user.attributes.given_name} ${this.user.attributes.family_name}`;
      } else {
        return `${this.dataSet.user}`
      }
    }, */
    /* isReadOnly() {
      if (this.dataSet.id) {
        return true
      } else return false
    } */
  },
  methods: {
    ...mapActions(["addDataSet", "addDataValue", "updateDataSetById", "updateDataSet", "fetchDataSet", "fetchDataSets", "fetchDataSetThenAddDataValue", "fetchChannels", "fetchDataValue", "fetchDataValues"]),
    ...mapMutations(["SET_DATA_SET", "SET_STATUS_CODE"]),
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
    },
    resetAndGoBack(){
      this.clear()
      this.$refs.form.reset();
      this.$router.push(`/${this.currentChannels[0].name}/data-sets`)
    },
    clear() {
      this.file = null;
      this.data = [];
      this.selected = [];
      this.headers = [];
      this.items = [];
    },
    toggleDataTable() {
      this.chartType = "Data Table";
    },
    toggleLineChart() {
      this.chartType = "Line";
    },
    toggleBarChart() {
      this.chartType = "Bar";
    },
    toggleRadarChart() {
      this.chartType = "Radar";
    },
    toggleDonutChart() {
      this.chartType = "Doughnut";
    },
    togglePieChart() {
      this.chartType = "Pie";
    },
    togglePolarAreaChart() {
      this.chartType = "Polar Area";
    },
    async saveDataSet() {
      this.$refs.form.validate();
      if (!this.isReadOnly && this.dataSet.id) {
        await this.updateDataSetById({
          id: this.dataSet.id,
          title: this.dataSet.title,
          description: this.dataSet.description,
          user: this.dataSet.user,
          channelId: this.currentChannels[0].channelId
        }).then(this.isReadOnly = true)
      } else {
        let oldDataSetIds = this.dataSets.filter(d => this.currentChannels[0].channelId == d.channelId).map(f => f.id)
        await this.addDataSet({
          title: this.dataSet.title,
          description: this.dataSet.description,
          user: this.dataSet.user,
          channelId: this.currentChannels[0].channelId
        })
        this.fetchDataSets().then(() => {
          let lastAdded = this.dataSets.filter(d => this.currentChannels[0].channelId == d.channelId).filter(d => !oldDataSetIds.includes(d.id))
          let id = lastAdded[0].id
          /* this.$router.push(`/data-sets/${id}`) */
          this.$router.push(`/:title/data-sets/${id}`)
          console.log(this.selected)
          this.fetchDataSetThenAddDataValue(id, this.selected)
          
          //this.dataSet.id = id
        })
      }
    },
    async addNewDataValue() {
      //let objString = JSON.stringify(this.selected)
      console.log(this.dataSet)
      
      this.addDataValue({
        data: JSON.stringify(this.selected),
        dataSetId: this.dataSet.id
      });
      this.showDataChart()
      this.clearInput("file")
    },
    clearInput(type) {
      this.$refs.form.inputs.forEach(input => {
        if (input.type == type) {
          input.reset()
        }
      })
    },
    editForm() {
      this.isReadOnly = false
    },
    async showDataChart() {
      await this.fetchDataSet(this.$route.params.dataSetId)
      console.log(this.dataSet)
      //this.createMasterData(this.dataSet.dataValues.items)
      this.uploadData(this.createMasterData(this.dataSet.dataValues.items))
    },
    uploadData(data) {
      console.log(data)
      let newData = data
      /* const keys = Object.keys(newData[0])
      this.xAxisKeys = keys */
      this.moveArrByKey(this.xAxisKeys, this.xAxisValue)
      this.setDataTable(newData)
      //this.selectedHeaders = this.headers
    },
    onChangeAxis() {
      this.moveArrByKey(this.xAxisKeys, this.xAxisValue)
      this.setDataTable(this.createMasterData(this.dataSet.dataValues.items))
      //this.selectedHeaders = this.headers
    },
    setDataTable(data) {
      let obj = this.xAxisKeys.map(x => ({
        text: x,
        value: x
      }))
      let newData = this.filterData(obj, data)
      console.log(data, newData)
      this.items = newData;
      this.selected = newData;
      this.data = newData;
      //this.selectedHeaders = this.headers
    },
    moveArrByKey(keys, selected = "Date") {
      keys.forEach((k, i) => {
        if (k == selected) {
          this.arrayMove(keys, i, 0)
        }
      })
      /* this.headers = keys.map((item) => ({
        text: item,
        value: item,
      })); */
    },
    saveAxis() {
      this.updateDataSetById({
        id: this.dataSet.id,
        xAxis: this.xAxisValue,
        headers: this.xAxisKeys
      });
    },
    onChangeSelected() {
      console.log(this.xAxisKeys, this.selectedHeaders)
      this.xAxisKeys = this.selectedHeaders.map(h => h.text)
      console.log(this.xAxisKeys)
      if (this.dataSet && this.dataSet.dataValues && this.dataSet.dataValues.items && this.dataSet.dataValues.items.length > 0) {
        this.uploadData(this.createMasterData(this.dataSet.dataValues.items))
      }
    },
    changeChartData() {
      this.$refs.chart.index =
        (this.$refs.chart.index + 1) %
        (Object.keys(this.$refs.chart.chartData[0]).length - 1);
    },
    checkForId() {
      if (this.dataSet.id) {
        return true
      } else return false
    },
  },
  mounted() {
    if (this.$route.params.dataSetId == "add-data-set"){ 
      this.dataSet.id = ""
      this.clear()
    } else {
      if (this.dataSet && this.dataSet.dataValues && this.dataSet.dataValues.items && this.dataSet.dataValues.items.length > 0) {
        const keys = Object.keys(this.createMasterData(this.dataSet.dataValues.items)[0])
        this.xAxisKeys = keys
        this.headers = keys.map((item) => ({
        text: item,
        value: item,
        }));
        this.selectedHeaders = this.headers
        this.uploadData(this.createMasterData(this.dataSet.dataValues.items))
      }
      this.isReadOnly = true
    }
    this.fetchChannels();
    this.fetchDataSets()
    if (!this.dataSet.user) {
      this.dataSet.user = `${this.user.attributes.given_name} ${this.user.attributes.family_name}`
    }
    if (this.dataSet.xAxis) {
      this.xAxisValue = this.dataSet.xAxis
      this.onChangeAxis()
    }
     
    //console.log(this.currentChannels[0])
  },
  /* beforeMount() {
    this.fetchDataSet(this.dataSet.id)
    if (this.dataSet && this.dataSet.dataValues.items) {
      console.log(this.dataSet)
      this.uploadData(this.dataSet.dataValues.items[0].data)
    }
    
  }, */
  watch: {
    dataSet() {
      if (this.dataSet.id) {
        this.isReadOnly = true
               
        if (this.dataSet.id !== this.$route.params.dataSetId){
          console.log("true clear")
        this.clear()
        }
      } else this.isReadOnly = false

    },
    selectedHeaders() {
      console.log(this.selectedHeaders)
    },
    headers() {
      //console.log(this.headers)
      /* this.headers.forEach(h => {
        this.selectedHeaders.push(h.text)
      }) */
    },
    /* value(val) {
      console.log(val)
      this.selectedHeaders = val;
    }, */
    selected(){
      if (this.selected && this.selected.length > 0){
        //console.log(this.selected)
      } else (console.log("no SELECTED data"))
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
  background-color: #2196F3;
}
div >>> .v-select__selections .v-chip .v-icon {
  color: white;
}
</style>
