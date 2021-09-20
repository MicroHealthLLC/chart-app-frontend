<template>
  <DataSetForm />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DataSetForm from "./../components/DataSetForm";

export default {
  name: "AddDataSet",
  components: {
    DataSetForm,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapMutations(["SET_ACTIVE_DATA_SET"]),
  },
  beforeMount() {
    this.SET_ACTIVE_DATA_SET({
      title: "",
      description: "",
      data: [],
      channels: [],
      user: {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
      },
    });
  },
};
</script>

<style></style>
