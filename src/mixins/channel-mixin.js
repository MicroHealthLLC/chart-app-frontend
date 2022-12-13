import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {     
      seedChannelTypes: [
        {
          title: "Public",
          id: 1,         
        },
        {
          title: "Personal",
          id: 2
        },
        {
          title: "Group",
          id: 3
        },       
      ],
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
};
