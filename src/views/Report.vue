<template>
  <ReportForm />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ReportForm from "../components/ReportForm";

export default {
  name: "Report",
  components: {
    ReportForm,
  },
  methods: {
    ...mapActions(["fetchReport", "fetchTags", "fetchChannelDataSets"]),
    ...mapMutations(["SET_REPORT"]),
  },
  computed: {
    ...mapGetters(["user"]),
  },
  beforeMount() {
    if (this.$route.name == "Report" && this.$route.params.reportId != "new") {
      this.fetchReport(this.$route.params.reportId);
    } else {
      this.SET_REPORT({
        title: "",
        description: "",
        chartType: "line",
        dataSet: { dataValues: [] },
        channelId: parseInt(this.$route.params.channelId),
        tags: [],
        colorSchemeId: 1,
        user: {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
        },
        updatedAt: "",
      });
    }
    // TODO: Combine API calls below into one
    //this.fetchChannelDataSets(this.$route.params.channelId);
    //this.fetchTags();
  },
  beforeDestroy() {
    this.SET_REPORT({
      title: "",
      description: "",
      chartType: "line",
      dataSet: { dataValues: [] },
      tags: [],
      colorSchemeId: 1,
      user: {
        first_name: "",
        last_name: "",
      },
      lastUpdatedBy: "",
      updatedAt: "",
    });
  },
};
</script>

<style></style>
