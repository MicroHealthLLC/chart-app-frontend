<template>
    <div>  

<v-row>
Current Channel {{this.currentChannel.name}}
ID: {{this.currentChannel.id}}
</v-row>
    
  
  
    </div>
   
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    name: "ChannelHome",
    components: {
     },
    computed: {
      ...mapGetters(["channels", "news", "reports", "user", "dataSets", "currentChannel"]),
      reportCount() {
        return (
          this.reports.length
        );
      },
    },
    methods: {
      ...mapActions(["fetchNews", "fetchChannels", "fetchCurrentUser", "fetchDataSets"]),
    },
    beforeMount() {

     console.log(this.user)
    },
    watch:{
      reports(){
        console.log(this.reports)
      },
      dataSets() {
        console.log(this.dataSets)
      },
    }
  
  };
  </script>
  
  <style scoped>
  .rmsLogoFont{
    color: #1D336F;
    font-weight: 900;
    font-size: 2.8rem;
    font-style: italic;
    line-height: .8;
  }
  .v-application a {
    text-decoration: none;
    color: unset;
  }
  .details {
    list-style: none;
    margin: 0;
    padding: 0;
    transition: ease;
  }
  .mhOrange{
    color: #DD9036 !important;
    font-weight: 400;
    font-style: italic;
  }
  .v-card__title {
    line-height: 1;
    word-break: normal;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  .btn-container {
    width: 100%;
  }
  .placeholder {
    height: 150px;
  }
  .btn-container {
    grid-column: 1 / span 3;
  }
  h3 a:hover {
    color: #1976d2;
  }
  </style>
  