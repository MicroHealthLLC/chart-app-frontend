<template>
    <v-card class="report-card" @click="toChannel">      
      <v-card-title>
        <!-- <v-icon class="mr-4" color="info">{{ chartIcon }}</v-icon> -->
        <span class="text-h6 font-weight-bold"  color="var(--mh-blue)">
          <v-icon color="green darken-2" class="pb-2">mdi-television-classic</v-icon> {{ channel.title }}
        </span>
      </v-card-title>
      <v-divider></v-divider> 
    
      <v-list class="transparent px-2">
        <v-list-item    
      >
        <v-list-item-title>
          <v-icon color="blue darken-2">mdi-equalizer</v-icon>
          Datasets: </v-list-item-title>
        <v-list-item-subtitle class="text-right text-h6 text--primary" >
          <span class="pill px-2"> {{this.dataSets.filter(t => t.channelId == channel.id).length}}</span> 
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item    
      >
        <v-list-item-title>
          <v-icon color="orange darken-2">mdi-chart-box-outline</v-icon>
          Reports: </v-list-item-title>
        <v-list-item-subtitle class="text-right text-h6" v-if="this.reports">
      <span class="pill px-2"> {{this.reports.filter(t => t.channelId == channel.id).length}}</span>
        </v-list-item-subtitle>
      </v-list-item>
      <v-list-item    
      >
        <v-list-item-title>
          <v-icon color="cyan">mdi-monitor-dashboard</v-icon>
          Dashboards: </v-list-item-title>
        <v-list-item-subtitle class="text-right text-h6 text--primary">
          <span class="pill px-2">  6</span>
        </v-list-item-subtitle>
      </v-list-item>
     
    </v-list>
    </v-card>
  </template>
  
  <script>
  import { mapActions, mapGetters, mapMutations } from "vuex";
  export default {
    name: "ChannelCard",
    props: {
     channel: {
        type: Object,
      },
    },
    computed: {
      ...mapGetters([
         "dataSets",
         "reports"
       ]),
   
    },
    async beforeMount() {
      this.fetchReports();
      if(this.dataSets && this.dataSets.length < 1){
        await this.fetchDataSets();
      }
    },
    methods: {
      ...mapActions([
         "fetchDataSets",
         "fetchReports",
         "setCurrentChannel"
       ]),
       ...mapMutations([
         "SET_CURRENT_CHANNEL",
       ]),
      //  log(e){
      //   console.log(e)
      //  },
      toChannel() {
        console.log(this.channel.title.toLowerCase().replace(/\s/g, '_'))
        this.SET_CURRENT_CHANNEL({
          id: this.channel.id,
          name: this.channel.title.toLowerCase().replace(/\s/g, '_'),
          reg_name: this.channel.title
        })

        let data = {
          channelId: this.channel.id,
          name: this.channel.title.toLowerCase().replace(/\s/g, '_'),
          regName: this.channel.title
        };
        this.setCurrentChannel(data)
        console.log(data)
        this.$router.push(
          `/${this.channel.title.toLowerCase().replace(/\s/g, '_')}`
        );
      },
    },
    watch: {
      // dataSets() {
      //   console.log(this.dataSets)
      // },
      // report() {
      //   console.log(this.report)
      // },
    },
  };
  </script>
  
  <style scoped>
  .report-card {
    width: 85%;
    border: 1px solid lightgray;
    border-left: 5px solid #dd9036 !important;
    margin-bottom: 10px;
  }
  .pill {
    background-color: #6c757d;
    border-radius: 50%;
    color: whitesmoke;
  }
  .report-card ul,
  .details {
    list-style: none;
    margin: 0;
    padding: 0;
    transition: ease;
  }
  .report-card:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
  .v-card__title {
    word-break: normal;
    line-height: 1.5rem;
    flex-wrap: unset;
  }
  .blueFont {
    color: #1976d2;
  }
  </style>
  