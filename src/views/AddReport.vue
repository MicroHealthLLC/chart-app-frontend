<template>
  <ReportForm />
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import ReportForm from "../components/ReportForm";

export default {
  name: "AddReport",
  components: {
    ReportForm,
  },
  methods: {
    ...mapActions(["fetchTags", "fetchDataSets"]),
    ...mapMutations(["SET_ACTIVE_REPORT"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
  beforeMount() {
    this.SET_ACTIVE_REPORT({
      title: "",
      description: "",
      chart_type: "line",
      data_set: { data: [] },
      tags: [],
      color_scheme_id: 1,
      user: {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
      },
      updated_at: "",
    });

    // TODO: Combine API calls below into one
    this.fetchDataSets();
    this.fetchTags();
  },
};
</script>

<style></style>
