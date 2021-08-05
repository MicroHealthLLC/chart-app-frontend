<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3>Data Sets</h3>
        <v-btn class="mb-2" color="primary" small to="/add-data-set"
          >Add Data Set <v-icon small>mdi-plus</v-icon></v-btn
        >
      </div>

      <v-divider class="mb-4"></v-divider>
      <v-card>
        <v-data-table :headers="headers" :items="dataSets">
          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="primary" small @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DataSets",
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
    ...mapGetters(["dataSets"]),
  },
  methods: {
    ...mapActions(["fetchDataSets"]),
    editItem(item) {
      console.log(`EDIT ${item.title}`);
    },
    deleteItem(item) {
      console.log(`DELETE ${item.title}`);
    },
  },
  beforeMount() {
    this.fetchDataSets();
  },
};
</script>

<style></style>
