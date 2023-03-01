<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="items"
    :item-key="headers[0].text"
    :single-select="false"
    show-select
  ></v-data-table>
</template>

<script>
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
      selected: [],
    };
  },
  mounted() {
    const keys = Object.keys(this.chartData[0]);

    this.headers = keys.map((item) => ({
      text: item,
      value: item,
    }));

    this.items = this.chartData;
  },
};
</script>

<style></style>
