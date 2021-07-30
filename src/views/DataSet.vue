<template>
  <DataSetForm />
</template>

<script>
import { mapActions } from "vuex";
import DataSetForm from "../components/DataSetForm.vue";

export default {
  components: { DataSetForm },
  methods: {
    ...mapActions(["fetchDataSet"]),
  },
  beforeMount() {
    this.fetchDataSet(this.$route.params.dataSetId);
  },
};
</script>

<style></style>
