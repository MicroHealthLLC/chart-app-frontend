<template>
  <v-row justify="space-between">
    <v-col cols="7">
      <v-data-table :headers="headers" :items="dataItems" class="elevation-4 ml-2" :hide-default-footer="dataItems.length <= 15" :disable-pagination="dataItems.length <= 15" calculate-widths>
        <template v-slot:item.one="{ item }">
          <v-chip :color="getColor(item, item.one, 0)" label>
            {{ item.one }}
          </v-chip>
        </template>
        <template v-slot:item.two="{ item }">
          <v-chip :color="getColor(item, item.two, 1)" label>
            {{ item.two }}
          </v-chip>
        </template>
        <template v-slot:item.thr="{ item }">
          <v-chip :color="getColor(item, item.thr, 2)" label>
            {{ item.thr }}
          </v-chip>
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="5">
      <v-card class="mr-2">
        <v-card-title>
          Project Name
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
                <v-card-subtitle v-if="heat[index].abs">Absolute Value</v-card-subtitle>
                <v-row v-if="!heat[index].abs" justify="space-around" class="pb-3 px-2" dense>
                  <v-chip small label color="green lighten-1">
                    <v-icon color="grey darken-4">mdi-greater-than-or-equal</v-icon>
                    {{ heat[index].gre }}
                  </v-chip>
                  <v-chip small label color="amber lighten-1">
                    <v-icon color="grey darken-4">mdi-greater-than-or-equal</v-icon>
                    {{ heat[index].yel }}
                  </v-chip>
                  <v-chip small label color="red lighten-1"><v-icon color="grey darken-4">mdi-less-than</v-icon>
                    {{ heat[index].yel }}
                  </v-chip>
                </v-row>
                <v-row v-else justify="space-around" class="pb-3 px-2" dense>
                  <v-chip small label color="green lighten-1">
                    <v-icon color="grey darken-4">mdi-less-than-or-equal</v-icon>
                    {{ heat[index].gre }}
                  </v-chip>
                  <v-chip small label color="amber lighten-1">
                    <v-icon color="grey darken-4">mdi-less-than-or-equal</v-icon>
                    {{ heat[index].yel }}
                  </v-chip>
                  <v-chip small label color="red lighten-1"><v-icon color="grey darken-4">mdi-greater-than</v-icon>
                    {{ heat[index].yel }}
                  </v-chip>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <!-- <v-card-actions>
          <v-btn color="orange lighten-2" text>
            Expand
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show? 'mdi-chevron-up': 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>
          </div>
        </v-expand-transition> -->
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
    tableData: Object
  },
  data() {
    return {
      show: false,
      heat: [
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
      ],
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'Month',
        },
        { text: '', value: 'one' },
        { text: '', value: 'two' },
        { text: '', value: 'thr' }
      ],
      footers: {
        showFirstLastPage: true,
        disableItemsPerPage: true,
      },
      dataItems: [
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
      ],
    }
  },
  computed: {

  },
  methods: {
    getKeyByValue(obj, val) {
      return Object.keys(obj).find(k => obj[k] === val)
    },
    getKeyNames(obj) {
      return Object.keys(obj[0])
    },
    setHeaders(items) {
      let names = this.getKeyNames(items)
      for (let n = 0; n < names.length; n++) {
        this.headers[n].text = names[n]
      }
    },
    getColor(item, val, num) {
      let name = this.getKeyByValue(item, val)
      //console.log(name)
      if (name == 'one' || name == 'thr') {
        return val >= this.heat[num].gre ? 'green lighten-1' : val >= this.heat[num].yel ? 'amber lighten-1' : 'red lighten-1'
      } else if (name == 'two') {
        let abs = Math.abs(val)
        //console.log(abs)
        return abs > this.heat[num].yel ? 'red lighten-1' : abs >= this.heat[num].gre ? 'amber lighten-1' : 'green lighten-1'
      }
    },
  },
  watch: {
  },
  mounted() {
    this.setHeaders(this.dataItems)
    console.log(this.tableData)
  }
};
</script>
    
<style scoped>

</style>