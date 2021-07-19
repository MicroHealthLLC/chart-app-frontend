<template>
  <v-data-table :headers="headers" :items="items"> </v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      headers: [],
      items: [],
    };
  },
  computed: {
    ...mapGetters(["activeDataSet"])
  },
  mounted() {
    const keys = Object.keys(this.activeDataSet[0]);

    this.headers = keys.map((item) => ({
      text: item,
      value: item,
    }));

    this.items = this.activeDataSet;
  },
};
</script>

<style></style>
