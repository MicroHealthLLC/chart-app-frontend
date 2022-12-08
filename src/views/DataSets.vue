<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3>Data Sets</h3>
        <v-btn class="mb-2" color="primary" small to="/add-data-set">Add Data Set <v-icon
            small>mdi-plus</v-icon></v-btn>
      </div>

      <v-divider class="mb-4"></v-divider>
      <v-card>
        <v-data-table :headers="headers" :items="dataSets">
          
          <!-- Formatted Date -->
          <template v-slot:item.created_at="{ item }">
            <span>{{ new Date(item.createdAt).toLocaleDateString() }}</span>
          </template>
          <template v-slot:item.user="{ item }">
            <span>{{ item.user }}</span>
          </template>

          <!-- Action Buttons -->
          <template v-slot:item.actions="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon color="primary" small class="mr-2" @click="editItem(item)" v-bind="attrs" v-on="on">
                  mdi-table-eye
                </v-icon>
              </template>
              <span>View</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-if="(item.user == `${user.attributes.given_name} ${user.attributes.family_name}`)"
                  color="primary" small @click="deleteItem(item)" v-bind="attrs" v-on="on">
                  mdi-delete
                </v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>
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
          width: "25%",
        },
        {
          text: "Description",
          sortable: false,
          value: "description",
          width: "30%",
        },
        {
          text: "Date Added",
          sortable: true,
          value: "created_at",
        },
        {
          text: "Created By",
          sortable: true,
          value: "user",
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
    ...mapGetters(["dataSets", "user"]),
  },
  methods: {
    ...mapActions(["fetchDataSets", "removeDataSet", "fetchDataSet"]),
    log(e) {
      console.log(e)
    },
    editItem(item) {
      console.log(item)
      this.fetchDataSet(item.id)
      this.$router.push(`/data-sets/${item.id}`)
    },
    deleteItem(item) {
      this.$confirm(
        `Are you sure you want to delete the "${item.title}" Data Set?`,
        "Confirm Delete",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          type: "warning",
        }
       ).then(() => {
        this.removeDataSet({ id: item.id });
      });
    },
  },
  beforeMount() {
    this.fetchDataSets();
  },
  mounted() {
    console.log(this.user)
    console.log(this.dataSets)
  }
};
</script>

<style scoped>
::v-deep .text-start:first-child {
  font-weight: 600;
}
</style>
