<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3>News</h3>
        <v-btn class="mb-2" @click="openDialog" color="primary" small
          >Add News <v-icon small>mdi-plus</v-icon></v-btn
        >
      </div>

      <v-divider class="mb-4"></v-divider>

      <v-card>
        <v-data-table :headers="headers" :items="news">
          <!-- Formatted Date -->
          <template v-slot:item.created_at="{ item }">
            <span>{{ new Date(item.created_at).toLocaleDateString() }}</span>
          </template>
          <!-- Action Buttons -->
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
      <!-- Modal form for news -->
      <v-dialog v-model="dialog" width="50%">
        <v-card>
          <v-toolbar class="mb-4" color="info" dark>
            <h3 v-if="activeNews.id">Update News</h3>
            <h3 v-else>Add News</h3>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="activeNews.title"
                label="Title"
                required
                :rules="[(v) => !!v || 'Title is required']"
              ></v-text-field>
              <v-textarea
                v-model="activeNews.body"
                label="Body"
                required
                :rules="[(v) => !!v || 'Body is required']"
              ></v-textarea>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="closeDialog" outlined small>Close</v-btn>
            <v-btn @click="saveNews" color="primary" depressed small
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "News",
  data() {
    return {
      dialog: false,
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
          value: "created_at",
        },
        {
          text: "Body",
          sortable: false,
          value: "body",
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
    ...mapGetters(["activeNews", "news"]),
  },
  methods: {
    ...mapActions(["addNews", "fetchNews", "updateNews"]),
    ...mapMutations(["SET_ACTIVE_NEWS"]),
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.SET_ACTIVE_NEWS({
        title: "",
        body: "",
      });
    },
    editItem(item) {
      console.log(`EDIT ${item.title}`);
      this.SET_ACTIVE_NEWS(item);
      this.dialog = true;
    },
    deleteItem(item) {
      console.log(`DELETE ${item.title}`);
    },
    saveNews() {
      if (this.$refs.form.validate()) {
        if (this.activeNews.id) {
          this.updateNews(this.activeNews);
        } else {
          this.addNews(this.activeNews);
        }
      }
    },
  },
  beforeMount() {
    this.fetchNews();
  },
};
</script>

<style></style>
