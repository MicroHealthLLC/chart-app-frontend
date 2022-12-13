import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {     
      seedChannelTypes: [
        {
          title: "Public",
        },
        {
          title: "Personal",
        },
        {
          title: "Group",
        },       
      ],
    };
  },
  methods: {
    ...mapActions(["fetchChannelTypes"]),
   
  },
  mounted() {
   this.fetchChannelTypes()
  },
  computed: {
    ...mapGetters(["channelTypes"]),
  
  },
  watch: {
    channelTypes(){
      if(this.channelTypes.length == 0){      
        this.seedChannelTypes.forEach((item) => {
         this.addChannelType(item)
        })             
      } 
    }
  },
};
