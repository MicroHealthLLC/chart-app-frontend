<template>
  <v-row>
    <!-- Title -->
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3 v-if="dataSet.id">{{ dataSet.title }}</h3>
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
          <v-btn class="mb-2" @click="$router.go(-1)" small outlined
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
              :disabled="isReadOnly"
              :rules="[(v) => !!v || 'Title is required']"
            ></v-text-field>
          </div>
          <div>
            <v-text-field :disabled="isReadOnly" v-model="createdBy" label="Created By" dense>
            </v-text-field>
          </div>
          <div :class="{ description: dataSet.id }">
            <v-text-field
              v-model="dataSet.description"
              label="Description"
              dense
              :disabled="isReadOnly"
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
              placeholder="Please choose a file..."
              type="file"
              @change.native="onChange"
              @click:clear="clear"
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
          </div>
          <div>
            <v-select
              v-model="value"
              :items="headers"
              label="Select"
              multiple
              chips
              small
              hint="What are the target columns?"
              persistent-hint
              return-object
              @change="filterData"
            >
            <!-- <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item.text }}</span>
              </v-chip>
              <span v-if="index === 1" class="grey--text caption">(+{{ value.length - 1 }} others)</span>
            </template> -->
          </v-select>
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
          </div>-->
        </div>
      </v-form>
    </v-col> 
    <!-- Chart Preview -->
    <v-col class="col-12">
      <v-card class="d-flex flex-column preview-container">
        <!-- Chart Buttons -->
        <v-btn-toggle class="ma-4" color="primary" mandatory>
          <v-btn @click="toggleDataTable" small>Data Table</v-btn>
          <v-btn @click="toggleLineChart" small>Line</v-btn>
          <v-btn @click="toggleBarChart" small>Bar</v-btn>
          <v-btn @click="toggleRadarChart" small>Radar</v-btn>
          <v-btn @click="toggleDonutChart" small>Donut</v-btn>
          <v-btn @click="togglePieChart" small>Pie</v-btn>
          <v-btn @click="togglePolarAreaChart" small>Polar Area</v-btn>
        </v-btn-toggle>
        <!-- Table Preview -->
        <div
          class="ma-4"
          v-if="headers.length > 0 && chartType === 'Data Table'"
        >
          <v-data-table
            v-model="selected"
            :headers="selectedHeaders"
            :items="items"
            :item-key="headers[0].text"
            :single-select="false"
            show-select
          ></v-data-table>
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
      formValid: true,
      submitAttempted: false,
      dataValueInput: '',
      isReadOnly: false
    };
  },
  computed: {
    ...mapGetters([
      "dataSet",
      "dataValues",
      "channels",
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
    createdBy: {
      get() {
        return `${this.dataSet.user.first_name} ${this.dataSet.user.last_name}`;
      },
      set() {
        console.log(this.dataSet)
      }
    },
    /* isReadOnly() {
      if (this.dataSet.id) {
        return true
      } else return false
    } */
  },
  methods: {
    ...mapActions(["addDataSet", "addDataValue", "updateDataSet", "fetchChannels", "fetchDataValues"]),
    ...mapMutations(["SET_DATA_SET", "SET_STATUS_CODE"]),
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
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
    saveDataSet() {
      this.$refs.form.validate();
      this.addDataSet({
        title: this.dataSet.title,
        description: this.dataSet.description,
        channels: ["test_chan"],
        user: this.createdBy
      });
      /* if (this.dataValueInput) {
        this.addNewDataValue()
      } */
      console.log(this.$refs.form)
      this.$refs.form.reset();
      this.isReadOnly = true
    },
    /* addNewDataValue() {
      this.addDataValue({
        score: this.dataValueInput,
        dataSetId: this.dataSet.id
      });
      this.showDataChart()
    }, */
    showDataChart() {
      this.fetchDataValues()
      this.uploadData(this.dataValues)
    },
    uploadData(data) {
      console.log(data)
      let newData = data
      /*.filter(f => f.dataSetId == this.dataSet.id)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
       .map((d) => ({
        "Created At": new Date(d.createdAt).toLocaleString(),
        "Score": d.score
      })) */
       const keys = Object.keys(newData[0])
       
      this.headers = keys.map((item) => ({
        text: item,
        value: item,
      }));
      this.selectedHeaders = this.headers
      this.items = newData;
      this.selected = newData;
      this.data = newData;
    },
    editForm() {
      this.isReadOnly = false
    },
    filterData(cols) {
      let filtered =  []
      this.data.forEach((row) => {
        let newDV = {}
        cols.forEach(col => {
          let column = col.text
          newDV[column] = row[column]
        })
        filtered.push(newDV)
      })
      this.selected = filtered
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
    }
    /* saveDataSet() {
      this.$refs.form.validate();
      this.submitAttempted = true;

      if (this.formValid) {
        let dataSet = {
          title: this.dataSet.title,
          description: this.dataSet.description,
          data: this.data,
          channel_ids: this.dataSet.channels.map((channel) => channel.id),
        };

        if (this.dataSet.id) {
          dataSet.id = this.dataSet.id;
          this.updateDataSet(dataSet);
        } else {
          dataSet.user_id = this.user.id;
          this.addDataSet(dataSet);
        }
      }
    }, */
  },
  beforeMount() {
    //this.fetchChannels();
  },
  watch: {
    dataSet() {
      if (this.dataSet.id) {
        this.isReadOnly = true

        /* this.data = this.dataSet;
        if (this.data){
          console.log(this.data)
        }
        this.uploadData(this.data); */
      } else this.isReadOnly = false
    },
    selectedHeaders() {
      console.log(this.selected)
    },
    headers() {
      console.log(this.headers)
      /* this.headers.forEach(h => {
        this.selectedHeaders.push(h.text)
      }) */
    },
    value(val) {
      this.selectedHeaders = val;
    },
    selected(){
      if (this.selected && this.selected.length > 0){
        console.log(this.selected)
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
.preview-container {
  height: 750px;
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
