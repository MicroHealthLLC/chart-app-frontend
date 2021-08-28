<template>
  <v-row>
    <!-- Title -->
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3 v-if="channel.id">Update Channel</h3>
        <h3 v-else>Add Channel</h3>
        <div>
          <v-btn
            @click="saveChannel"
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            >Save</v-btn
          >
          <v-btn class="mb-2" small outlined>Cancel</v-btn>
        </div>
      </div>

      <v-divider class="mb-4"></v-divider>

      <!-- Form Fields -->
      <v-card class="pa-4">
        <v-form class="grid mt-4">
          <div>
            <v-text-field v-model="channel.title" label="Title" dense>
            </v-text-field>
          </div>
          <div>
            <v-select
              v-model="channel.category"
              label="Channel Type"
              :items="[
                { title: 'Public', value: 'public' },
                { title: 'Personal', value: 'personal' },
                { title: 'Group', value: 'group' },
              ]"
              item-text="title"
              item-value="value"
              dense
            ></v-select>
          </div>
          <div class="description">
            <v-textarea
              v-model="channel.description"
              label="Description"
              dense
              outlined
              clearable
              background-color="grey lighten-5"
              auto-grow
            ></v-textarea>
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ChannelForm",
  computed: {
    ...mapGetters(["channel"]),
  },
  methods: {
    ...mapActions(["addChannel", "updateChannel"]),
    saveChannel() {
      if (this.channel.id) {
        this.updateChannel({
          id: this.channel.id,
          title: this.channel.title,
          category: this.channel.category,
          description: this.channel.description,
        });
      } else {
        this.addChannel(this.channel);
      }
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
.description {
  grid-column: 1 / span 2;
}
</style>
