import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      newReport: {
        title: "",
        description: "",
        chartType: "line",
        dataSet: { dataValues: [] },
        dataSetId: 1,
        colorSchemeId: 1,
        updated_at: "",
      },
    };
  },
  methods: {
    ...mapActions([]),
  },
  mounted() {
    //    this.fetchChannelTypes()
  },
  computed: {
    ...mapGetters([]),
  },
  watch: {},
};
