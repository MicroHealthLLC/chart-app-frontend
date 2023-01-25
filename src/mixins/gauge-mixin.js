import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {     
    newGauge: {
        title: "",
        value: 0,
        chartType: "Traditional",
        //segmentStops: [0, 70, 90, 100]
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
    gaugeWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 200
        case 'sm': return 250
        case 'md': return 300
        case 'lg': return 500
        case 'xl': return 800
      }
    },
    gaugeHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 130
        case 'sm': return 155
        case 'md': return 180
        case 'lg': return 280
        case 'xl': return 430
      }
    }
  },
  watch: {
  
  },
};