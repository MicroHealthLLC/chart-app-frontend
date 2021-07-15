<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    permanent
    color="primary"
    :mini-variant.sync="mini"
    dark
  >
    <v-list>
      <v-list-item>
        <v-list-item-icon class="clickable" @click.stop="mini = !mini">
          <v-icon>mdi-menu</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-h6"
            >mRMS
            <v-icon small
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
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        v-for="item in channelItems"
        :key="item.title"
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
          v-for="child in item.channels"
          :key="child.title"
          :to="`/channels/${child.id}`"
          link
          dense
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <template v-slot:append>
      <div>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
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
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      mini: false,
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home", route: "/" },
        { title: "Add Data Set", icon: "mdi-plus", route: "/add-data-set" },
        { title: "Create Channel", icon: "mdi-playlist-plus" },
        { title: "Request Channel", icon: "mdi-forwardburger" },
      ],
      channelItems: [
        {
          title: "Public",
          icon: "mdi-account-group",
          channels: [],
        },
        {
          title: "Personal",
          icon: "mdi-shield-account",
          channels: [],
        },
        {
          title: "Group",
          icon: "mdi-account-multiple",
          channels: [],
        },
        { title: "Administration", icon: "mdi-account-cog" },
      ],
      right: null,
    };
  },
  computed: {
    ...mapGetters(["channels"]),
  },
  created() {
    this.channels.public.forEach((channel) =>
      this.channelItems[0].channels.push(channel)
    );
    this.channels.personal.forEach((channel) =>
      this.channelItems[1].channels.push(channel)
    );
    this.channels.group.forEach((channel) =>
      this.channelItems[2].channels.push(channel)
    );
  },
};
</script>

<style scoped>
.nav-group.v-list-group--active {
  color: #ffffff !important;
}
</style>
