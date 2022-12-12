import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {     
      
    };
  },
  methods: {
    ...mapActions([]),
    createMasterData(arr) {
        let masterData = []
        arr.forEach(d => masterData.unshift(d.data))
        masterData = masterData.flat()
        const uniqueArray = masterData.filter((object,index) => index === masterData.findIndex(obj => JSON.stringify(obj) === JSON.stringify(object)))
        return this.sortByKey(uniqueArray)
      },
      sortByKey(arr, key = "Date") {
        return arr.sort((a,b) => {
          let x = a[key]
          let y = b[key];
          return ((x < y) ? - 1 : ((x > y) ? 1 : 0));
        })
      }
  },
  mounted() {
   
  },
  computed: {
    ...mapGetters([]),
  
  },
};
