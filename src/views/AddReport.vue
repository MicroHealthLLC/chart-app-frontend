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
    ...mapMutations(["SET_REPORT"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
  beforeMount() {
    this.SET_REPORT({
      title: "",
      description: "",
      chartType: "line",
      dataSet: { dataValues: [] },
      // tags: [],
      colorSchemeId: 1,
      user: {
        first_name: this.user.attributes.given_name,
        last_name: this.user.attributes.family_name,
      },
      updated_at: "",
    });

    // TODO: Combine API calls below into one
    // this.fetchDataSets();
    // this.fetchTags();
  },
};
</script>

<style></style>
