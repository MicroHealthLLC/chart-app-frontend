<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3>Channels</h3>
        <v-btn class="mb-2" color="primary" small to="/add-channel"
          >Add Channel <v-icon small>mdi-plus</v-icon></v-btn
        >
      </div>

      <v-divider class="mb-4"></v-divider>
      <v-card>
        <v-data-table :headers="headers" :items="channels">
          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="primary" small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
            <v-btn class="ml-2" depressed outlined x-small>Request Access</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Channels",
  data() {
    return {
      headers: [
        {
          text: "Title",
          sortable: true,
          value: "title",
        },
        {
          text: "Date Added",
          sortable: true,
          value: "created_at",
        },
        {
          text: "Category",
          sortable: true,
          value: "category",
        },
        {
          text: "Description",
          sortable: false,
          value: "description",
        },
        {
          text: "Actions",
          sortable: false,
          value: "actions",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["channels"]),
  },
  methods: {
    ...mapActions(["fetchChannels"]),
    editItem(item) {
      console.log(`EDIT ${item.title}`);
    },
    deleteItem(item) {
      console.log(`DELETE ${item.title}`);
    },
  },
  beforeMount() {
    this.fetchChannels();
  },
};
</script>

<style>
td.text-start:first-child {
  font-weight: 600;
}
</style>
