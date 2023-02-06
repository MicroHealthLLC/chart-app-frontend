<template>
  <v-row justify="space-between">
    <v-col cols="7">
      <v-data-table :headers="headers" :items="dataItems" class="elevation-4 ml-2" :hide-default-footer="dataItems.length <= 12" :disable-pagination="dataItems.length <= 12" calculate-widths :loading="$store.getters.loading" loading-text="Loading... Please wait">
        <template  v-for="h, i in headers" v-slot:[`item.${h.text}`]="{ item }">
          <v-chip :color="i != 0 ? getColor(item, item[`${h.text}`], i-1) : 'white'" label :key="i">
            {{ item[`${h.text}`] }}
          </v-chip>
        </template>
        <!-- <template v-slot:item.{{ `Score 2` }}="{ item }">
          <v-chip :color="getColor(item, item.`Score 2`, 1)" label>
            {{ item.{{}} }}
          </v-chip>
        </template>
        <template v-slot:item.thr="{ item }">
          <v-chip :color="getColor(item, item.thr, 2)" label>
            {{ item.thr }}
          </v-chip>
        </template> -->
      </v-data-table>
    </v-col>
    <v-col cols="5">
      <v-card class="mr-2">
        <v-card-title>
          {{ heatMap.title }}
        </v-card-title>
        <v-card-subtitle>
          Legend
        </v-card-subtitle>
        <v-divider></v-divider>
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
      </v-card>
    </v-col>
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
    getKeyByValue(obj, val) {
      return Object.keys(obj).find(k => obj[k] === val)
    },
    getKeyNames(obj) {
      //console.log(obj)
      return Object.keys(obj[0])
    },
    setHeaders(items) {
      if (items) {
        //console.log(items)
        let names = this.getKeyNames(items)
        //console.log(names)
        for (let n = 0; n < names.length; n++) {
          console.log(this.headers[n])
          console.log(names[n])
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

</style>