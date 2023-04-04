<template>
  <div>
    <v-row>
      <h2 class="mt-5">
        CHANNEL HOME
      </h2>
      <br>
      <p>Current Channel {{ this.currentChannel.name }}</p>

      ID: {{ this.currentChannel.id }}
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ChannelHome",
  components: {},
  computed: {
    ...mapGetters([
      "channels",
      "news",
      "reports",
      "user",
      "dataSets",
      "currentChannel",
      "currenttChannel",
      "currentChannels",
    ]),
    reportCount() {
      return this.reports.length;
    },
  },
  methods: {
    ...mapActions([
      "fetchNews",
      "fetchChannels",
      "fetchCurrentUser",
      "fetchDataSets",
      "fetchCurrentChannels",
      "removeCurrentChannel",
    ]),
  },
  watch: {
    reports() {
      console.log(this.reports);
    },

    currentChannels() {
      if (this.currentChannels && this.currentChannels.length > 0) {
        this.removeCurrentChannel(this.currentChannels[0].id);
        console.log(this.currentChannels);
        console.log(this.currentChannels[0].channelId);
        console.log(this.currentChannels[0].regName);
      }
      if (this.currentChannels && this.currentChannels.length > 1) {
        console.log(this.currentChannels);
        this.removeCurrentChannel({ id: this.currentChannels[1].id });
      }
    },
    // currenttChannel() {
    //   if(this.currenttChannel){
    //     console.log(this.currenttChannel)
    //   }
    // },
    dataSets() {
      console.log(this.dataSets);
    },
  },
  beforeMount() {
    this.fetchCurrentChannels();
    console.log(this.currentChannels);
  },
};
</script>

<style scoped>
.rmsLogoFont {
  color: #1d336f;
  font-weight: 900;
  font-size: 2.8rem;
  font-style: italic;
  line-height: 0.8;
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
.mhOrange {
  color: #dd9036 !important;
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
