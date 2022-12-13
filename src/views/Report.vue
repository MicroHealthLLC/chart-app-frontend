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
        chart_type: "line",
        data_set: { data: [] },
        channel_id: parseInt(this.$route.params.channelId),
        tags: [],
        color_scheme_id: 1,
        user: {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
        },
        updated_at: "",
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
      chart_type: "line",
      data_set: { data: [] },
      tags: [],
      color_scheme_id: 1,
      user: {
        first_name: "",
        last_name: "",
      },
      last_updated_by: "",
      updated_at: "",
    });
  },
};
</script>

<style></style>
