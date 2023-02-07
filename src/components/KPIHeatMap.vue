<template>
  <v-row justify="center">
    <v-col cols="11">
      <v-text-field
      class="mx-3 mb-3"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table :headers="headers" :items="dataItems" class="elevation-4 ml-2" show-first-last-page="true" calculate-widths :loading="$store.getters.loading" loading-text="Loading... Please wait" :options="{itemsPerPage: 5}" :search="search" :custom-sort="customSort">
        <template v-for="h, i in headers.slice(1)" v-slot:[`item.${h.text}`]="{ item }">
          <v-chip :color="getColor(item, item[`${h.text}`], i)" label :key="i">
            {{ item[`${h.text}`] }}
          </v-chip>
        </template>
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

export default {
  name: "KPIHeatMap",
  components: {
  },
  props: {
    heatMap: Object,
    headers: Array,
    dataItems: Array,
    options: Object,
  },
  data() {
    return {
      show: false,
      search: '',
      footers: {
        showFirstLastPage: true,
        disableItemsPerPage: true,
      },
      /* headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'Month',
        },
        { text: '', value: 'one' },
        { text: '', value: 'two' },
        { text: '', value: 'thr' }
      ], */
    }
  },
  computed: {

  },
  methods: {
    log(e) {
      console.log(e)
    },
    customSort(items, sortBy, isDesc) {
      //console.log(items, sortBy)
      if (this.options) {
        let absCol = this.options.cols.filter(c => c.abs).map(a => a.name)
        //console.log(absCol)
        items.sort((a, b) => {
          if (absCol.includes(sortBy[0])) {
            if (isDesc[0]) {
              return Math.abs(b[sortBy]) - Math.abs(a[sortBy]);
            } else {
              return Math.abs(a[sortBy]) - Math.abs(b[sortBy]);
            }
          } else if (!isNaN(a[sortBy])) {
            if (!isDesc[0]) {
              return (b[sortBy]) - (a[sortBy]);
            } else {
              return (a[sortBy]) - (b[sortBy]);
            }
          } else {
            if(typeof a[sortBy] !== 'undefined'){
            if (!isDesc[0]) {
              return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase());
            }
            else {
              return b[sortBy].toLowerCase().localeCompare(a[sortBy].toLowerCase());
            }
          }
          }
        });
      }
      return items
    },
    getKeyByValue(obj, val) {
      return Object.keys(obj).find(k => obj[k] === val)
    },
    getKeyNames(obj) {
      return Object.keys(obj[0])
    },
    setHeaders(items) {
      if (items) {
        let names = this.getKeyNames(items)
        for (let n = 0; n < names.length; n++) {
          this.headers[n].text = names[n]
          this.headers[n].value = names[n]
        }
      }
    },
    getColor(item, val, num) {
      //console.log(item, val, num)
      //let name = this.getKeyByValue(item, val)
      let options = this.options
      //console.log(options)
      if (!options.cols[num].abs) {
        return val >= options.cols[num].gre ? 'green lighten-1' : val >= options.cols[num].yel ? 'amber lighten-1' : 'red lighten-1'
      } else {
        let abs = Math.abs(val)
        //console.log(abs)
        return abs > options.cols[num].yel ? 'red lighten-1' : abs >= options.cols[num].gre ? 'amber lighten-1' : 'green lighten-1'
      }
      
      /* if (name == 'one' || name == 'thr') {
        return val >= this.heat[num].gre ? 'green lighten-1' : val >= this.heat[num].yel ? 'amber lighten-1' : 'red lighten-1'
      } else if (name == 'two') {
        let abs = Math.abs(val)
        //console.log(abs)
        return abs > this.heat[num].yel ? 'red lighten-1' : abs >= this.heat[num].gre ? 'amber lighten-1' : 'green lighten-1'
      } */
    },
  },
  watch: {
    dataItems() {
      if (this.dataItems) {
        //console.log(this.dataItems)
        this.setHeaders(this.dataItems)
      }
    }
  },
  mounted() {

  }
};
</script>
    
<style scoped>
.v-chip.v-chip--label.theme--light.v-size--default {
  width: 60px;
}
</style>