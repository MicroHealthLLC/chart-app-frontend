<script>
import datasetMixin from "../mixins/dataset-mixin";
import { mapActions } from "vuex"

export default {
  name: "FilterBar",
  mixins: [datasetMixin],
  props: {
    filters: Array,
    items: Array,
    dataSet: Object,
    allKeys: Array,
  },
  data() {
    return {
      selectedFilter: null,
      showNewFilterForm: false,
      filterKey: "",
      filterName: "",
      filterMin: null,
      filterMax: null,
      filterOperation: "",
      filterOperationKeys: [
        "Equal To",
        "Not Equal To",
        "Greater Than",
        "Greater Than or Equal To",
        "Less Than",
        "Less Than or Equal To",
        "Between",
        "Current Quarter",
        "Last Quarter",
      ],
    };
  },
  methods: {
    ...mapActions(["updateDataSetById"]),
    async saveFilter() {
      let data = {
        title: this.filterName,
        key: this.filterKey,
        operation: this.filterOperation,
        min: this.filterMin,
        max: this.filterMax,
      };
      this.filters.push(data);
      await this.updateDataSetById({
        id: this.dataSet.id,
        filters: JSON.stringify(this.filters),
      });
    },
    setFilter() {
      this.filterName = this.selectedFilter.title;
      this.filterKey = this.selectedFilter.key;
      this.filterOperation = this.selectedFilter.operation;
      this.filterMax = this.selectedFilter.max;
      this.filterMin = this.selectedFilter.min;
      this.calcFilter();
    },
    addFilter() {
      this.showNewFilterForm = true;
      this.selectedFilter = null;
      this.clearFilter();
    },
    calcFilter() {
      if (this.filterKey && this.filterOperation) {
        let colType = this.checkColType(this.filterKey, this.items);
        let filteredItems = []
        //let firstItem = this.items[0][this.filterKey];
        if (
          this.filterOperation == "Between" &&
          this.filterMin &&
          this.filterMax
        ) {
          if (colType == "number") {
            filteredItems = this.items.filter(
              (i) =>
                parseFloat(i[this.filterKey]) >= parseFloat(this.filterMin) &&
                parseFloat(i[this.filterKey]) <= parseFloat(this.filterMax)
            );
          } else if (colType == "date") {
            filteredItems = this.items.filter(
              (i) =>
                new Date(i[this.filterKey]) >= new Date(this.filterMin) &&
                new Date(i[this.filterKey]) <= new Date(this.filterMax)
            );
          } else if (colType == "string") {
            filteredItems = this.items.filter(
              (i) =>
                i[this.filterKey] >= this.filterMin &&
                i[this.filterKey] <= this.filterMax
            );
          }
        } else if (this.filterOperation == "Greater Than" && this.filterMin) {
          if (colType == "number") {
            filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) > parseFloat(this.filterMin)
            );
          } else if (colType == "date") {
            filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) > new Date(this.filterMin)
            );
          } else if (colType == "string") {
            filteredItems = this.items.filter(
              (i) => i[this.filterKey] > this.filterMin
            );
          }
        } else if (
          this.filterOperation == "Greater Than or Equal To" &&
          this.filterMin
        ) {
          if (colType == "number") {
            filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) >= parseFloat(this.filterMin)
            );
          } else if (colType == "date") {
            filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) >= new Date(this.filterMin)
            );
          } else if (colType == "string") {
            filteredItems = this.items.filter(
              (i) => i[this.filterKey] >= this.filterMin
            );
          }
        } else if (this.filterOperation == "Less Than" && this.filterMax) {
          if (colType == "number") {
            filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) < parseFloat(this.filterMax)
            );
          } else if (colType == "date") {
            filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) < new Date(this.filterMax)
            );
          } else if (colType == "string") {
            filteredItems = this.items.filter(
              (i) => i[this.filterKey] < this.filterMax
            );
          }
        } else if (
          this.filterOperation == "Less Than or Equal To" &&
          this.filterMax
        ) {
          if (colType == "number") {
            filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) <= parseFloat(this.filterMax)
            );
          } else if (colType == "date") {
            filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) <= new Date(this.filterMax)
            );
          } else if (colType == "string") {
            filteredItems = this.items.filter(
              (i) => i[this.filterKey] <= this.filterMax
            );
          }
        } else if (this.filterOperation == "Equal To" && this.filterMin) {
          if (colType == "number") {
            filteredItems = this.items.filter(
              (i) => parseFloat(i[this.filterKey]) == parseFloat(this.filterMin)
            );
          } else if (colType == "date") {
            filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) == new Date(this.filterMin)
            );
          } else if (colType == "string") {
            filteredItems = this.items.filter(
              (i) => i[this.filterKey] == this.filterMin
            );
          }
        } else if (this.filterOperation == "Not Equal To" && this.filterMin) {
          if (colType == "number") {
            filteredItems = this.items.filter(
              (i) =>
                parseFloat(i[this.filterKey]) !== parseFloat(this.filterMin)
            );
          } else if (colType == "date") {
            filteredItems = this.items.filter(
              (i) => new Date(i[this.filterKey]) !== new Date(this.filterMin)
            );
          } else if (colType == "string") {
            filteredItems = this.items.filter(
              (i) => i[this.filterKey] !== this.filterMin
            );
          }
        } else if (
          this.filterOperation == "Current Quarter" &&
          colType == "date"
        ) {
          let currentDate = new Date();
          let currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1; // current quarter
          let currentYear = currentDate.getFullYear();
          let startQuarter = new Date(currentYear, (currentQuarter - 1) * 3, 1);
          let endQuarter = new Date(
            startQuarter.getFullYear(),
            startQuarter.getMonth() + 3,
            0,
            23,
            59,
            59,
            999
          );
          filteredItems = this.items.filter(
            (i) =>
              new Date(i[this.filterKey]) >= startQuarter &&
              new Date(i[this.filterKey]) <= endQuarter
          );
        } else if (
          this.filterOperation == "Last Quarter" &&
          colType == "date"
        ) {
          let currentDate = new Date();
          let currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1; // current quarter
          let currentYear = currentDate.getFullYear();
          let lastQuarter = currentQuarter == 1 ? 4 : currentQuarter - 1; // last quarter
          console.log(lastQuarter);
          let lastYear = currentQuarter == 1 ? currentYear - 1 : currentYear;
          let startQuarter = new Date(lastYear, (lastQuarter - 1) * 3, 1);
          console.log(startQuarter);
          let endQuarter = new Date(
            startQuarter.getFullYear(),
            startQuarter.getMonth() + 3,
            0,
            23,
            59,
            59,
            999
          );
          filteredItems = this.items.filter(
            (i) =>
              new Date(i[this.filterKey]) >= startQuarter &&
              new Date(i[this.filterKey]) <= endQuarter
          );
        }
        if (filteredItems.length > 0) {
          this.$emit('changeFilteredItems', filteredItems)
        }
      }
    },
    changeFilterOperation() {
      this.clearFilterValues();
      if (this.checkColType(this.filterKey, this.items) == "date") {
        this.calcFilter();
      }
    },
    clearFilterValues() {
      this.filterMin = null;
      this.filterMax = null;
    },
    clearFilter() {
      this.filterName = "";
      this.filterKey = "";
      this.filterOperation = "";
      this.clearFilterValues();
      //this.filteredItems = this.items;
      this.$emit('changeFilteredItems', this.items)
    },
  },
  watch: {
    filterKey() {
      if (this.filterKey) {
        let colType = this.checkColType(this.filterKey, this.items);
        if (colType == "date") {
          this.filterOperationKeys = [
            "Equal To",
            "Not Equal To",
            "Greater Than",
            "Greater Than or Equal To",
            "Less Than",
            "Less Than or Equal To",
            "Between",
            "Current Quarter",
            "Last Quarter",
          ];
        } else if (colType == "number" || colType == "string") {
          this.filterOperationKeys = [
            "Equal To",
            "Not Equal To",
            "Greater Than",
            "Greater Than or Equal To",
            "Less Than",
            "Less Than or Equal To",
            "Between",
          ];
        }
      }
    },
  }
};
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Filters</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="selectedFilter"
              :items="filters"
              item-text="title"
              @change="setFilter"
              dense
              outlined
              clearable
              return-object
              label="Saved Filters"
              class="mr-4"
              @click:clear="clearFilter"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn icon @click="addFilter" title="Add Filter">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="showNewFilterForm">
          <v-col cols="3">
            <span class="d-flex">
              <v-tooltip
                left
                v-if="
                  filterName ||
                  filterKey ||
                  filterOperation ||
                  filterMin ||
                  filterMax
                "
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    x-small
                    class="mr-2 mt-2"
                    @click="clearFilter"
                    v-bind="attrs"
                    v-on="on"
                    icon
                    title="Clear Filter"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </template>
                <span>Clear Filter</span>
              </v-tooltip>
              <v-text-field
                v-model="filterName"
                label="Filter Name"
                dense
                outlined
              />
            </span>
          </v-col>
          <v-col cols="3"
            ><v-select
              v-model="filterKey"
              label="Filter By"
              outlined
              dense
              :items="allKeys"
            ></v-select
          ></v-col>
          <v-col cols="3">
            <v-select
              v-if="filterKey"
              v-model="filterOperation"
              label="Operation"
              outlined
              dense
              @change="changeFilterOperation"
              :items="filterOperationKeys"
            >
            </v-select>
          </v-col>
          <v-col
            cols="2"
            v-if="
              [
                'Equal To',
                'Not Equal To',
                'Greater Than',
                'Greater Than or Equal To',
                'Between',
              ].includes(filterOperation)
            "
          >
            <v-select
              v-model="filterMin"
              :label="
                ['Equal To', 'Not Equal To'].includes(filterOperation)
                  ? 'Value'
                  : 'Min'
              "
              outlined
              dense
              @change="calcFilter"
              :items="getItemValues(filterKey, items)"
            ></v-select>
          </v-col>
          <v-col
            cols="2"
            v-if="
              ['Less Than', 'Less Than or Equal To', 'Between'].includes(
                filterOperation
              )
            "
          >
            <v-select
              v-model="filterMax"
              label="Max"
              outlined
              dense
              @change="calcFilter"
              :items="getItemValues(filterKey, items)"
            ></v-select>
          </v-col>
          <v-col cols="1">
            <v-btn
              v-if="
                (filterName &&
                  filterKey &&
                  (filterOperation == 'Current Quarter' ||
                    filterOperation == 'Last Quarter')) ||
                ([
                  'Equal To',
                  'Not Equal To',
                  'Greater Than',
                  'Greater Than or Equal To',
                ].includes(filterOperation) &&
                  filterMin) ||
                (['Less Than', 'Less Than or Equal To'].includes(
                  filterOperation
                ) &&
                  filterMax) ||
                (filterOperation == 'Between' && filterMin && filterMax)
              "
              icon
              @click="saveFilter"
            >
              <v-icon small color="primary">mdi-content-save</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style></style>
