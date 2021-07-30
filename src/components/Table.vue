<template>
  <v-data-table :headers="headers" :items="items"> </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      headers: [],
      items: [],
    };
  },
  methods: {
    loadTable() {
      const data = JSON.parse(this.activeReport.data_set.data).data;

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
