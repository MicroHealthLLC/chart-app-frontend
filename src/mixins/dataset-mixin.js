import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {     
      newDataSet: {
        title: "",
        description: "",
        dataValues: { items: []},
        xAxis: ""
        },
    };
  },
  methods: {
    ...mapActions([]),
    createMasterData(arr) {
      console.log(arr)
        let masterData = []
        if (arr.length > 1) {
          arr.forEach(d => masterData.unshift(d.data))
        } else {
          masterData.unshift(arr[0].data)
        }
        masterData = masterData.flat()
        const uniqueArray = masterData.filter((object,index) => index === masterData.findIndex(obj => JSON.stringify(obj) === JSON.stringify(object)))
        //console.log(uniqueArray)
        return this.sortByKey(uniqueArray)
      },
      sortByKey(arr, key = "Date") {
        return arr.sort((a,b) => {
          let x = a[key]
          let y = b[key];
          return ((x < y) ? - 1 : ((x > y) ? 1 : 0));
        })
      },
      filterData(cols, data) {
        let filtered =  []
        data.forEach((row) => {
          let newDV = {}
          cols.forEach(col => {
            let column = col.text
            newDV[column] = row[column]
          })
          filtered.push(newDV)
        })
        return filtered
      },
      arrayMove(arr, oldIdx, newIdx) {
        if (newIdx >= arr.length) {
          var k = newIdx - arr.length + 1;
          while (k--) {
            arr.push(undefined);
          }
        }
        arr.splice(newIdx, 0, arr.splice(oldIdx, 1)[0]);
        return arr;
      },
  },
  mounted() {
   
  },
  computed: {
    ...mapGetters([]),
  
  },
};
