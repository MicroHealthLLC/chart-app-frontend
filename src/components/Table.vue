<template>
  <v-data-table :headers="headers" :items="items"> </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    chartData: {
      type: Array,
    },
  },
  data() {
    return {
      headers: [],
      items: [],
    };
  },
  methods: {
    loadTable() {
      console.log(this.activeReport);
      const data = this.chartData;

      const keys = Object.keys(data[0]);

      this.headers = keys.map((item) => ({
        text: item,
        value: item,
      }));

      this.items = data;
    },
  },
  computed: {
    ...mapGetters(["activeReport"]),
  },
  mounted() {
    this.loadTable();
  },
  watch: {
    "activeReport.data_set"() {
      this.loadTable();
    },
  },
};
</script>

<style></style>
