import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      newDataSet: {
        title: "",
        description: "",
        dataValues: { items: [] },
        xAxis: "",
      },
    };
  },
  methods: {
    ...mapActions([]),
    createMasterData(arr) {
      //console.log(arr)
      let masterData = [];
      if (arr.length > 1) {
        arr.forEach((d) => masterData.unshift(d.data));
      } else {
        masterData.unshift(arr[0].data);
      }
      masterData = masterData.flat();
      const uniqueArray = masterData.filter(
        (object, index) =>
          index ===
          masterData.findIndex(
            (obj) => JSON.stringify(obj) === JSON.stringify(object)
          )
      );
      //console.log(uniqueArray)
      return this.sortByKey(uniqueArray);
    },
    sortByKey(arr, key = "Date") {
      return arr.sort((a, b) => {
        let x = a[key];
        let y = b[key];
        if (key.toLowerCase() == "date") {
          x = new Date(x);
          y = new Date(y);
        }
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    filterData(cols, data) {
      let filtered = [];
      data.forEach((row) => {
        let newDV = {};
        cols.forEach((col) => {
          let column = col.text;
          newDV[column] = row[column];
        });
        filtered.push(newDV);
      });
      return filtered;
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
    checkColType(col, items) {
      //console.log(items)
      return items.every((i) => !isNaN(i[col]))
        ? "number"
        : items.every(
            (i) => moment(i[col]).isValid() && moment().diff(moment(i[col])) > 0
          )
        ? "date"
        : "string";
    },
    getItemValues(key, items) {
      let colType = this.checkColType(key, items);
      if (colType == "number") {
        return items
          .map((i) => parseFloat(i[key]))
          .sort((a, b) => parseFloat(a) - parseFloat(b));
      } else if (colType == "date") {
        return items
          .map((i) => moment(new Date(i[key])).format("ll"))
          .sort((a, b) => new Date(a) - new Date(b));
      } else if (colType == "string") {
        let strItems = items.map((i) => i[key]);
        if (/\d/.test(strItems[0])) {
          return strItems.sort(
            (a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0])
          );
        } else {
          return strItems.sort((a, b) => a.localeCompare(b));
        }
      }
    },
  },
  mounted() {},
  computed: {
    ...mapGetters([]),
  },
};
