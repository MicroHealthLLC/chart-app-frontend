<template>
  <v-row justify="center">
    <v-col cols="11" class="pt-0">
      <div
        v-if="$route.path != `/${this.currentChannels[0].name}/gauges`"
        class="d-flex"
      >
        <v-text-field
          class="mx-3 mb-3"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <!-- <v-btn class="mt-4" @click="toggleFilter" icon :color="filter ? 'blue darken-2' : 'grey'">
          <v-icon>mdi-filter</v-icon>
        </v-btn> -->
      </div>
      <!-- <v-card v-if="filter" class="pa-3 mx-5 my-2">
        <v-row>
          <v-col v-for="h, i in filterHeaders" :key="i">
            <h5 class="pb-0 mb-0">{{ h.name }}</h5>
            <v-row>
              <v-col>
                <small>
                  <p class="pt-3 ma-0">Min:</p>
                </small>
                <v-text-field v-model="filterHeaders[i].minmax[0]" label="Min:" class="pb-2 pt-0" hide-details single-line type="number" style="width: 60px" @change="filterData($event)"></v-text-field>
              </v-col>
              <v-col>
                <small>
                  <p class="pt-3 ma-0">Max:</p>
                </small>
                <v-text-field v-model="filterHeaders[i].minmax[1]" label="Max:" class="pb-2 pt-0" hide-details single-line type="number" style="width: 60px" @change="filterData($event)"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card> -->
      <v-data-table
        :headers="headers"
        :items="dataItems"
        class="elevation-4 ml-2"
        show-first-last-page="true"
        :loading="$store.getters.loading"
        loading-text="Loading... Please wait"
        :options="{ itemsPerPage: 5 }"
        :search="search"
        :custom-sort="customSort"
        :custom-filter="customFilter"
      >
        <template
          v-for="(h, i) in headers.slice(1)"
          v-slot:[`item.${h.text}`]="{ item }"
        >
          <v-chip :color="getColor(item, item[`${h.text}`], i)" label :key="i">
            {{ item[`${h.text}`] }}
          </v-chip>
        </template>
        <template v-slot:[`header.${headers[0].text}`]="{ header }">
          <strong>{{ header.text.toUpperCase() }}</strong>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            {{ item }}
          </td>
        </template>
        <!-- <template v-if="filter" v-slot:body.prepend>
              <tr v-for="h, i in filterHeaders">
                <td>
                  <v-text-field
                    v-model="filterHeaders[i]"
                    :label="h"
                    type="number"
                  ></v-text-field>
                </td>
              </tr>
            </template> -->
      </v-data-table>
    </v-col>
    <!-- <v-col cols="5">
      <v-card class="mr-2">
        <v-card-title>
          {{ heatMap.title }}
        </v-card-title>
        <v-card-subtitle>
          Legend
        </v-card-subtitle>
        <v-divider></v-divider> -->
    <!-- <v-container fluid v-for="name, index in getKeyNames(dataItems).slice(1)" :key="name" class="pb-5">
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title class="py-2">Column: {{ name }}</v-card-title>
                <v-card-subtitle v-if="options.cols[index].abs">Absolute Value</v-card-subtitle>
                <v-row v-if="!options.cols[index].abs" justify="space-around" class="pb-3 px-2" dense>
                  <v-chip small label color="green lighten-1">
                    <v-icon color="grey darken-4">mdi-greater-than-or-equal</v-icon>
                    {{ options.cols[index].gre }}
                  </v-chip>
                  <v-chip small label color="amber lighten-1">
                    <v-icon color="grey darken-4">mdi-greater-than-or-equal</v-icon>
                    {{ options.cols[index].yel }}
                  </v-chip>
                  <v-chip small label color="red lighten-1"><v-icon color="grey darken-4">mdi-less-than</v-icon>
                    {{ options.cols[index].yel }}
                  </v-chip>
                </v-row>
                <v-row v-else justify="space-around" class="pb-3 px-2" dense>
                  <v-chip small label color="green lighten-1">
                    <v-icon color="grey darken-4">mdi-less-than-or-equal</v-icon>
                    {{ options.cols[index].gre }}
                  </v-chip>
                  <v-chip small label color="amber lighten-1">
                    <v-icon color="grey darken-4">mdi-less-than-or-equal</v-icon>
                    {{ options.cols[index].yel }}
                  </v-chip>
                  <v-chip small label color="red lighten-1"><v-icon color="grey darken-4">mdi-greater-than</v-icon>
                    {{ options.cols[index].yel }}
                  </v-chip>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container> -->
    <!-- </v-card>
    </v-col> -->
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "KPIHeatMap",
  components: {},
  props: {
    heatMap: Object,
    headers: Array,
    dataItems: Array,
    //options: Object,
  },
  data() {
    return {
      show: false,
      search: "",
      filter: false,
      expanded: [],
      filterHeaders: [],
      footers: {
        showFirstLastPage: true,
        disableItemsPerPage: true,
      },
    };
  },
  computed: {
    ...mapGetters(["currentChannels"]),
  },
  methods: {
    log(e) {
      console.log(e);
    },
    customSort(items, sortBy, isDesc) {
      if (
        this.heatMap.options &&
        this.heatMap.options.cols &&
        this.heatMap.options.cols.length > 0
      ) {
        let absCol = this.heatMap.options.cols
          .filter((c) => c.abs)
          .map((a) => a.name);
        items.sort((a, b) => {
          if (absCol.includes(sortBy[0])) {
            return isDesc[0]
              ? Math.abs(b[sortBy]) - Math.abs(a[sortBy])
              : Math.abs(a[sortBy]) - Math.abs(b[sortBy]);
          } else if (!isNaN(a[sortBy])) {
            return !isDesc[0] ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy];
          } else if (this.isDate(a[sortBy])) {
            return !isDesc[0]
              ? new Date(b[sortBy]) - new Date(a[sortBy])
              : new Date(a[sortBy]) - new Date(b[sortBy]);
          } else {
            if (typeof a[sortBy] !== "undefined") {
              return !isDesc[0]
                ? a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
                : b[sortBy]
                    .toLowerCase()
                    .localeCompare(a[sortBy].toLowerCase());
            }
          }
        });
      }
      return items;
    },
    isDate(str) {
      return new Date(str) !== "Invalid Date" && !isNaN(new Date(str));
    },
    getKeyByValue(obj, val) {
      return Object.keys(obj).find((k) => obj[k] === val);
    },
    getKeyNames(obj) {
      return Object.keys(obj[0]);
    },
    /* setHeaders(items) {
      if (items) {
        let names = this.getKeyNames(items)
        console.log(this.headers)
        console.log(names)
        for (let n = 0; n < names.length; n++) {
          this.headers[n].text = names[n]
          this.headers[n].value = names[n]
          this.headers[n].filter = ''
        }
      }
    }, */
    getColor(item, val, num) {
      let options = this.heatMap.options;
      if (typeof options == "string") options = JSON.parse(options);

      if (!options.cols[num].abs) {
        return val >= options.cols[num].gre
          ? "green lighten-1"
          : val >= options.cols[num].yel
          ? "amber lighten-1"
          : "red lighten-1";
      } else {
        let abs = Math.abs(val);
        return abs > options.cols[num].yel
          ? "red lighten-1"
          : abs >= options.cols[num].gre
          ? "amber lighten-1"
          : "green lighten-1";
      }
    },
    toggleFilter() {
      if (this.filter) {
        this.filter = false;
      } else {
        this.filter = true;
      }
    },
    createFilters() {
      this.filterHeaders = this.headers.slice(1).map((h) => {
        return {
          name: h.text,
          minmax: [],
        };
      });
      this.filterHeaders.forEach((h) => {
        let a = this.dataItems.map((d) => parseFloat(d[`${h.name}`]));
        h.minmax = [Math.min(...a), Math.max(...a)];
      });
    },
    /* filterData(event) {
      if (this.headers.length > 0) {
        this.headers.slice(1).forEach((h) => {
          let sel = this.filterHeaders.filter(f => f.name == h.value)
          console.log(this.filterHeaders)
          console.log(event)
          h.filter = (value) => {
              console.log(value)
            return value < sel.minmax[1] && value > sel.minmax[0]
          } 
        })
      }
    }, */
    customFilter(value, search, item) {
      console.log(value);
      console.log(search);
      console.log(item);
    },
  },
  watch: {
    filterHeaders() {
      console.log(this.filterHeaders);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.v-chip.v-chip--label.theme--light.v-size--default {
  width: 60px;
}
</style>
