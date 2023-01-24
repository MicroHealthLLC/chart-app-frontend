import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {     
    newGauge: {
        title: "",
        value: 0,
        chartType: "Traditional",
        segmentStops: [0, 70, 90, 100]
        },
    };
  },
  methods: {
    ...mapActions([]),
   
  },
  mounted() {
  },
  computed: {
    ...mapGetters([]),
  
  },
  watch: {
  
  },
};