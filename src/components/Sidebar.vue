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
        { title: "Public", icon: "mdi-account-group" },
        { title: "Personal", icon: "mdi-shield-account" },
        { title: "Group", icon: "mdi-account-multiple" },
        { title: "Administration", icon: "mdi-account-cog" },
      ],
      right: null,
    };
  },
};
</script>

<style scoped></style>
