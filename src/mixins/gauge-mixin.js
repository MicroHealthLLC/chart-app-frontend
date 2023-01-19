import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {     
    newGauge: {
        title: "",
        value: 0
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