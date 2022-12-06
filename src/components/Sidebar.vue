<template>
  <v-navigation-drawer v-model="drawer" app permanent :mini-variant.sync="mini" v-if="user && user.attributes">
    <v-list>
      <v-list-item>
        <v-list-item-icon class="clickable" @click.stop="mini = !mini">
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-h6"
            >mRMS
            <v-icon color="primary" small
              >mdi-chart-timeline-variant-shimmer</v-icon
            ></v-list-item-title
          >
          <v-list-item-subtitle> Microhealth </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.route"
        active-class="active-nav-item"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <div v-show="!mini" class="ml-2 mt-2 text-caption">Channels</div>

      <v-list-item to="/add-channel" active-class="active-nav-item">
        <v-list-item-icon><v-icon>mdi-playlist-plus</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Create Channel</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item exact-path to="/channels" active-class="active-nav-item">
        <v-list-item-icon><v-icon>mdi-forwardburger</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Channel List</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- Public, Personal, and Group -->
      <v-list-group
        v-for="(item, index) in channels"
        :key="index"
        :prepend-icon="item.icon"
        no-action
        class="nav-group"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(child, index) in item.channels"
          :key="index"
          :to="`/channels/${child.id}`"
          link
          dense
        >
          <v-list-item-content>
            <v-list-item-title>{{ child.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <!-- Dashboards - Links to channel/id/dashboards -->
      <!-- <v-list-group
        v-if="dashboardChannels.length > 0"
        prepend-icon="mdi-monitor-dashboard"
        no-action
        class="nav-group"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Dashboards</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(child, index) in dashboardChannels"
          :key="index"
          :to="`/channels/${child.id}/dashboards`"
          link
          dense
        >
          <v-list-item-content>
            <v-list-item-title>{{ child.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group> -->
    </v-list>
    <!-- Profile and Logout Nav Items -->
    <template v-slot:append>
      <div>
        <v-divider></v-divider>
        <div v-show="!mini" class="user-name text-caption font-weight-bold">        
          <!-- <span class="ml-5">{{ user.attributes.given_name }} {{ user.attributes.family_name }}</span>  -->
        </div>
        <v-list dense nav>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-if="user && user.attributes">Hi, {{user.attributes.given_name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logOutUser" link>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      mini: false,
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home", route: "/" },
        {
          title: "Add Report",
          icon: "mdi-chart-box-plus-outline",
          route: "/add-report",
        },
        {
          title: "Add Data Set",
          icon: "mdi-table-large-plus",
          route: "/add-data-set",
        },
        { title: "Data Sets", icon: "mdi-equalizer", route: "/data-sets" },
      ],
      channelItems: [
        {
          title: "IT APPS",
          icon: "mdi-account-group",
          channels: [],
        },
        {
          title: "Business Dev",
          icon: "mdi-shield-account",
          channels: [],
        },
        {
          title: "Proposals",
          icon: "mdi-account-multiple",
          channels: [],
        },
        // { title: "Administration", icon: "mdi-account-cog" },
      ],
      right: null,
    };
  },
  methods: {
    ...mapMutations(["SET_SNACKBAR", "SET_USER"]),
    ...mapActions(["logout", "fetchChannels"]),
    async logOutUser() {
      await this.logout();
      // this.$router.push("/signin");
    },
    updateChannels() {
      this.channels.forEach((channel) => {
        if (channel.category == "public_channel") {
          this.channelItems[0].channels.push(channel);
        } else if (channel.category == "personal_channel") {
          this.channelItems[1].channels.push(channel);
        } else if (channel.category == "group_channel") {
          this.channelItems[2].channels.push(channel);
        }
      });
    },
  },
  computed: {
    ...mapGetters(["channels", "user"]),
    // dashboardChannels() {
    //   return this.channels.filter((channel) => channel.dashboards.length > 0);
    // },
  },
  mounted() {
    this.updateChannels();
    this.fetchChannels()
    console.log(this.user)
 
  },
  watch: {    
    channels() {
      this.channelItems[0].channels = [];
      this.channelItems[1].channels = [];
      this.channelItems[2].channels = [];

      this.updateChannels();
    },
    user(){
      if(this.user && this.user.attributes){
        console.log(this.user)
      } else {
        this.$router.push("/signin")
      }
    } 
  },
};
</script>

<style scoped>
.nav-group.v-list-group--active {
  /* color: #ffffff !important; */
}
.active-nav-item {
  color: #1976d2 !important;
}
.user-name {
  background-color: rgba(25, 118, 210, 0.12);
  color: #1976d2;
  margin: 8px 8px 0 8px;
  border-radius: 4px;
}
</style>
