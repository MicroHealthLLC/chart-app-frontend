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
      <v-divider></v-divider>
    </v-col>
    <!-- Form Fields -->
    <v-col class="col-6">
      <v-text-field v-model="channel.title" label="Title" dense> </v-text-field>
    </v-col>
    <v-col class="col-6">
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
    </v-col>
    <v-col class="col-12 py-0"
      ><v-textarea
        v-model="channel.description"
        class="pt-0"
        label="Description"
        rows="1"
        dense
      ></v-textarea
    ></v-col>
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

<style scoped></style>
