<template>
  <v-navigation-drawer
    v-if="user && user.attributes"
    app
    permanent
    :mini-variant.sync="mini"
  >
    <v-list>
      <v-list-item>
        <v-list-item-icon
          class="clickable"
          :disabled="tru"
          @click="mini = !mini"
        >
          <v-icon :class="mini == true ? 'liteGrey' : 'blu'">
            mdi-menu
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            link
            class="text-h6 text-bold cursor"
            @click="goHome"
          >
            <b>mRMS</b>
            <v-icon
              color="orange darken-2"
              class="pb-1"
              medium
            >
              mdi-chart-box-outline
            </v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="mb-2" />
    <span class="text-h6 pl-3 pt-2 bluey">{{ regName }}</span>
    <v-list
      dense
      nav
    >
      <v-list-item
        :disabled="tru"
        :to="`/${pathName}/data-sets`"
        link
      >
        <v-list-item-icon>
          <v-icon
            :class="mini == true ? 'whitesmok' : 'blu'"
          >
            mdi-equalizer
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Datasets</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        :disabled="tru"
        :to="`/${pathName}/reports`"
        link
      >
        <v-list-item-icon>
          <v-icon
            :class="mini == true ? 'whitesmok' : 'or'"
          >
            mdi-chart-box-outline
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Reports</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        :disabled="tru"
        :to="`/${pathName}/gauges`"
        link
      >
        <v-list-item-icon>
          <v-icon
            :class="mini == true ? 'whitesmok' : 'redd'"
          >
            mdi-gauge
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>KPIs</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        :disabled="tru"
        :to="`/${pathName}/dashboards`"
        link
      >
        <v-list-item-icon>
          <v-icon
            :class="mini == true ? 'whitesmok' : 'cya'"
          >
            mdi-monitor-dashboard
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboards</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- <v-list dense nav>
    <div v-show="!mini" class="ml-2 mt-2 text-caption text-dark">Report Channels</div> -->
    <!-- Public, Personal, and Group -->
    <!-- <v-list-group
        v-for="(item, index) in channels"
        :load="log(channels)"
        :key="index"
        :prepend-icon="item.icon"
        no-action
        class="nav-group"
      >
        <template v-slot:activator>
          <v-list-item-content>
          <v-list-item-title ><span class="pr-2"> (3)</span>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </template>
           <v-list-item
          v-for="(child, index) in reports"
          :key="index"
          link
          dense>
      
          <v-list-item-content>
            <v-list-item-title v-show="child.channelId == item.id">{{ child.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>    -->
    <!-- </v-list> -->
    <!-- Profile and Logout Nav Items -->
    <template v-slot:append>
      <div>
        <v-divider />
        <div
          v-show="!mini"
          class="user-name text-caption font-weight-bold"
        />
        <v-list
          dense
          nav
        >
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="blue-grey darken-2">
                mdi-account
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-if="user && user.attributes"
              >
                Hi, {{ user.attributes.given_name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-show="$route.name == 'Home'"
            link
            @click="createChannel"
          >
            <v-list-item-icon>
              <v-icon class="gre">
                mdi-television-classic
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Create Channel</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-show="$route.name == 'Home'"
            @click="requestChannel"
          >
            <v-list-item-icon>
              <v-icon class="warn">
                mdi-television-classic
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Request Channel</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            :to="`/settings`"
            link
          >
            <v-list-item-icon>
              <v-icon color="purple-grey darken-2">
                mdi-cog-outline
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            link
            @click="logOutUser"
          >
            <v-list-item-icon>
              <v-icon color="orange darken-2">
                mdi-logout
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <v-dialog
        v-model="showRequestForm"
        width="30%"
      >
        <v-card>
          <v-card-title class="pl-0">
            <v-icon
              class="warn px-2"
              medium
            >
              mdi-television-classic
            </v-icon>
            Request Channel(s)
          </v-card-title>
          <v-divider />
          <template>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-container class="grey lighten-5">
                    <v-row
                      v-for="ch in channels"
                      :key="ch.id"
                    >
                      <v-col>{{ ch.title }}</v-col>
                      <v-col>
                        <v-btn
                          class="ma-2"
                          dark
                          color="teal"
                        >
                          REQUEST
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>

                  <!-- <v-list-item-title  v-for="ch in reports" :key="ch.id"><h3>{{ ch.title }}</h3></v-list-item-title>
              <v-list-item-title  v-for="ch in reports" :key="ch.id"><v-btn>{{ ch.title }}</v-btn></v-list-item-title> -->
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </template>
        </v-card>
        <!-- <ChannelModalForm @closeform="closeForm" /> -->
      </v-dialog>
      <v-dialog
        v-model="showAddChannelForm"
        width="40%"
      >
        <v-card class="px-4 py-4">
          <ChannelForm @closeChannelForm="closeChannelForm" />
        </v-card>
      </v-dialog>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import ChannelForm from "./ChannelForm.vue";

export default {
  components: {
    ChannelForm,
  },
  data() {
    return {
      mini: true,
      drawer: true,
      tru: false,
      regName: "",
      pathName: "",
      channelId: null,
      showRequestForm: false,
      showAddChannelForm: false,
      channelList: [],
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
    ...mapActions([
      "logout",
      "fetchChannels",
      "fetchReports",
      "removeCurrentChannel",
      "fetchCurrentChannels",
    ]),
    async logOutUser() {
      if (this.channelId) {
        let id = this.channelId;
        this.removeCurrentChannel({ id: id });
      }
      await this.logout();
      // this.$router.push("/signin");
    },
    log(e) {
      console.log(e);
    },
    requestChannel() {
      this.showRequestForm = true;
    },
    createChannel() {
      this.showAddChannelForm = true;
    },
    closeChannelForm() {
      this.showAddChannelForm = false;
    },
    goHome() {
      if (this.channelId) {
        let id = this.channelId;
        this.removeCurrentChannel({ id: id });
      }
      this.$router.push("/");
    },
    resetChannelStation() {},
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
    ...mapGetters([
      "channels",
      "user",
      "reports",
      "currentChannel",
      "currentChannels",
    ]),
    // dashboardChannels() {
    //   return this.channels.filter((channel) => channel.dashboards.length > 0);
    // },
  },
  watch: {
    currentChannels() {
      if (this.currentChannels && this.currentChannels[0]) {
        console.log(this.currentChannels);
        console.log(this.currentChannels[0].channelId);
        console.log(this.currentChannels[0].regName);
        this.mini = false;
        this.tru = false;
        this.channelId = this.currentChannels[0].id;
        this.regName = this.currentChannels[0].regName;
        this.pathName = this.currentChannels[0].name;
      } else {
        this.mini = true;
        this.tru = true;
        this.regName = "";
      }
    },
    mini() {
      if (this.mini == true) {
        return true;
      }
      console.log(this.mini);
    },
    channels() {
      this.channelItems[0].channels = [];
      this.channelItems[1].channels = [];
      this.channelItems[2].channels = [];

      this.updateChannels();
    },
    user() {
      if (this.user && this.user.attributes) {
        // console.log(this.user)
      } else {
        this.$router.push("/signin");
      }
    },
  },
  mounted() {
    this.updateChannels();
    this.fetchChannels();
    this.fetchCurrentChannels();
    this.fetchReports();
  },
};
</script>

<style scoped>
.nav-group.v-list-group--active {
  /* color: #ffffff !important; */
}
.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  min-height: 400px;
}
.active-nav-item {
  color: #1976d2 !important;
}
.bluey {
  color: #1d336f;
}
.lightGrey {
  color: whitesmoke !important;
}
.whitesmok {
  color: ghostwhite !important;
}
.redd {
  color: #d32f2f !important;
}
.warn {
  color: #e4a11b !important;
}
.blu {
  color: #1976d2 !important;
}
.gry {
  color: grey !important;
}
.gre {
  color: #388e3c !important;
}
.or {
  color: #dd9036 !important;
}
.cya {
  color: #00bcd4 !important;
}
.cursor {
  cursor: pointer;
  color: #1d336f;
  font-weight: 900;
  font-style: italic;
}
.user-name {
  background-color: rgba(25, 118, 210, 0.12);
  color: #1976d2;
  margin: 8px 8px 0 8px;
  border-radius: 4px;
}
</style>
