<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">      
        <h3><v-icon class="mr-2 pb-2" color="green darken-2">mdi-television-classic</v-icon>Channels</h3>
        <v-btn class="mb-2" color="primary" small to="/add-channel"
          >Add Channel <v-icon small>mdi-plus</v-icon></v-btn
        >
      </div>

      <v-divider class="mb-4"></v-divider>

      <v-card>
        <v-data-table :headers="headers" :items="channels">
          <!-- Formatted Date -->
          <template v-slot:item.createdAt="{ item }">
            <span>{{ new Date(item.createdAt).toLocaleDateString() }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon color="primary" small @click="deleteChannel(item)">
              mdi-delete
            </v-icon>
            <!-- <v-btn class="ml-2" depressed outlined x-small
              >Request Access</v-btn
            > -->
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
          width: "25%",
        },
        {
          text: "Date Added",
          sortable: true,
          value: "createdAt",
        },
        {
          text: "Category",
          sortable: true,
          value: "type",
        },
        {
          text: "Description",
          sortable: false,
          value: "description",
          width: "40%",
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
    ...mapActions(["fetchChannel", "fetchChannels", "removeChannel"]),
    async editItem(item) {
      let id = item.id
      await this.fetchChannel(id)
      this.$router.push(`/channels/${id}`) 
    },
    deleteChannel(item) {
      this.$confirm(
        `Are you sure you want to delete the ${item.title} channel?`,
        "Confirm Delete",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
       ).then(() => {
        this.removeChannel({ id: item.id });
      });     
    },
  },
  beforeMount() {
    this.fetchChannels();
  },
};
</script>

<style scoped>
::v-deep .text-start:first-child {
  font-weight: 600;
}
::v-deep .text-start:nth-child(3) {
  text-transform: capitalize;
}
</style>
