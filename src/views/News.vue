<template>
  <v-row>
    <v-col>
      <div class="d-flex justify-space-between">
        <h3>News</h3>
        <v-btn
          class="mb-2"
          color="primary"
          small
          @click="openDialog"
        >
          Add News <v-icon small>
            mdi-plus
          </v-icon>
        </v-btn>
      </div>

      <v-divider class="mb-4" />

      <v-card>
        <v-data-table
          :headers="headers"
          :items="news"
        >
          <!-- Formatted Date -->
          <template v-slot:item.created_at="{ item }">
            <span>{{ new Date(item.created_at).toLocaleDateString() }}</span>
          </template>
          <!-- Action Buttons -->
          <template v-slot:item.actions="{ item }">
            <v-icon
              color="primary"
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              color="primary"
              small
              @click="openDeleteDialog(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <!-- Modal form for news -->
      <v-dialog
        v-model="dialog"
        width="50%"
        @click:outside="closeDialog"
      >
        <v-card>
          <v-toolbar
            class="mb-4"
            color="info"
            dark
          >
            <h3 v-if="activeNews.id">
              Update News
            </h3>
            <h3 v-else>
              Add News
            </h3>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="activeNews.title"
                label="Title"
                required
                :rules="[(v) => !!v || 'Title is required']"
              />
              <v-textarea
                v-model="activeNews.body"
                label="Body"
                required
                :rules="[(v) => !!v || 'Body is required']"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              outlined
              small
              @click="closeDialog"
            >
              Close
            </v-btn>
            <v-btn
              color="primary"
              depressed
              small
              @click="saveNews"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- Delete Prompt -->
      <v-dialog
        v-model="deleteDialog"
        max-width="400"
        @click:outside="closeDeleteDialog"
      >
        <v-card>
          <v-card-title>Delete {{ deleteableNews.title }}?</v-card-title>
          <v-divider class="mx-4 mb-2" />
          <v-card-text>
            Are you sure you would like to delete this News?
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn
              small
              outlined
              color="secondary"
              @click="closeDeleteDialog"
            >
              Cancel
            </v-btn>
            <v-btn
              small
              depressed
              color="error"
              @click="removeNews"
            >
              Delete
            </v-btn>
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
      deleteDialog: false,
      deleteableNews: {},
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
    ...mapGetters(["activeNews", "news", "user"]),
  },
  methods: {
    ...mapActions(["addNews", "deleteNews", "fetchNews", "updateNews"]),
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
      this.SET_ACTIVE_NEWS(item);
      this.dialog = true;
    },
    saveNews() {
      if (this.$refs.form.validate()) {
        let data = {
          ...this.activeNews,
        };

        if (this.activeNews.id) {
          this.updateNews(data);
        } else {
          data.user_id = this.user.id;
          this.addNews(data);
        }
        this.dialog = false;
      }
    },
    openDeleteDialog(news) {
      this.deleteDialog = true;
      this.deleteableNews = news;
    },
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.deleteableNews = {};
    },
    removeNews() {
      this.deleteNews(this.deleteableNews.id);
      this.deleteDialog = false;
    },
  },
  beforeMount() {
    this.fetchNews();
  },
};
</script>

<style scoped>
::v-deep .text-start:first-child {
  font-weight: 600;
}
</style>
