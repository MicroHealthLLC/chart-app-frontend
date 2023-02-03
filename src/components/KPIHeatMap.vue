<template>
  <v-row justify="space-between">
    <v-col cols="7">
      <v-data-table :headers="headers" :items="dataItems" class="elevation-4 ml-2" :hide-default-footer="dataItems.length <= 12" :disable-pagination="dataItems.length <= 12" calculate-widths :loading="$store.getters.loading" loading-text="Loading... Please wait">
        <template v-for="h, i in headers" v-slot:[`item.${h.text}`]="{ item }">
          <v-chip :color="getColor(item, item[`${h.text}`], i)" label :key="h.text">
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
        <v-container fluid v-for="name, index in getKeyNames(dataItems).slice(1)" :key="name" class="pb-5">
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
        </v-container>
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
      /* heat: [
        {
          abs: false,
          yel: 70,
          gre: 90,
        },
        {
          abs: true,
          yel: 5,
          gre: 1,
        },
        {
          abs: false,
          yel: 1,
          gre: 2,
        } 
      ], */
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
      
      /* dataItems: [
        {
          Month: 'January',
          one: 97,
          two: -2.3,
          thr: 1,
        },
        {
          Month: 'Feburary',
          one: 86,
          two: 3.5,
          thr: 1.67,
        },
        {
          Month: 'March',
          one: 70,
          two: 6,
          thr: 1.05,
        },
        {
          Month: 'April',
          one: 90,
          two: 1.1,
          thr: .97,
        },
        {
          Month: 'May',
          one: 68,
          two: -4.0,
          thr: 1.8,
        },
        {
          Month: 'June',
          one: 50,
          two: -.4,
          thr: 2,
        },
        {
          Month: 'July',
          one: 87,
          two: 0.2,
          thr: 1.32,
        },
        {
          Month: 'August',
          one: 93,
          two: 3.2,
          thr: 1,
        },
        {
          Month: 'September',
          one: 95,
          two: 2.1,
          thr: .97,
        },
        {
          Month: 'October',
          one: 92,
          two: 0,
          thr: 1,
        },
        {
          Month: 'November',
          one: 100,
          two: -.2,
          thr: 2.31,
        },
        {
          Month: 'December',
          one: 96,
          two: .1,
          thr: 1.09,
        },
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
      return Object.keys(obj[0])
    },
    setHeaders(items) {
      if (items) {
        let names = this.getKeyNames(items)
        for (let n = 0; n < names.length; n++) {
          console.log(names[n])
          this.headers[n].text = names[n]
        }
      }
    },
    getColor(item, val, num) {
      //console.log(item, val, num)
      //let name = this.getKeyByValue(item, val)
      let options = this.options
      //console.log(name)
      return val >= options.cols[num].gre ? 'green lighten-1' : val >= options.cols[num].yel ? 'amber lighten-1' : 'red lighten-1'
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
        console.log(this.headers)
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