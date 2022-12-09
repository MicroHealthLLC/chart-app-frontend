<template>
  <DataSetForm />
</template>

<script>
import { mapActions } from "vuex";
import DataSetForm from "../components/DataSetForm.vue";

export default {
  name: "DataSet",
  components: { DataSetForm },
  methods: {
    ...mapActions(["fetchDataSet"]),
  },
  async beforeMount() {
    await this.fetchDataSet(this.$route.params.dataSetId);
  },
};
</script>

<style></style>
