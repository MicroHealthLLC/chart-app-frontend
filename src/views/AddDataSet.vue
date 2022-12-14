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
    ...mapMutations(["SET_DATA_SET"]),
  },
  /* beforeMount() {
    this.SET_DATA_SET({
      title: "",
      description: "",
      data: [],
      user: {
        first_name: this.user.attributes.given_name,
        last_name: this.user.attributes.family_name,
      },
    });
  }, */
};
</script>

<style></style>
