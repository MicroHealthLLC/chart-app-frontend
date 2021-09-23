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
        <v-form v-model="formValid" ref="form" class="grid mt-4">
          <div>
            <v-text-field
              v-model="channel.title"
              label="Title"
              dense
              required
              :rules="[(v) => !!v || 'Title is required']"
            >
            </v-text-field>
          </div>
          <div>
            <v-select
              v-model="channel.category"
              label="Channel Type"
              :items="[
                { title: 'Public', value: 2 },
                { title: 'Personal', value: 1 },
                { title: 'Group', value: 0 },
              ]"
              item-text="title"
              item-value="value"
              dense
            ></v-select>
          </div>
          <div v-if="channel.category == 0" class="users">
            <v-select
              :items="users"
              :item-text="(user) => `${user.first_name} ${user.last_name}`"
              item-value="id"
              label="Users"
              hint="Please add all members who will have access to this Channel"
              persistent-hint
              multiple
              chips
              deletable-chips
              return-object
              dense
              required
              :rules="usersRules"
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
              required
              :rules="[(v) => !!v || 'Description is required']"
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
  data() {
    return {
      formValid: true,
      usersRules: [
        (v) => v.length > 0 || "At least 1 user is required",
        (v) =>
          v.map((user) => user.id).includes(this.user.id) ||
          "You must be included in the group",
      ],
    };
  },
  computed: {
    ...mapGetters(["channel", "statusCode", "user", "users"]),
  },
  methods: {
    ...mapActions(["addChannel", "updateChannel"]),
    saveChannel() {
      this.$refs.form.validate();
      if (this.formValid) {
        if (this.channel.id) {
          this.updateChannel({
            id: this.channel.id,
            title: this.channel.title,
            category: this.channel.category,
            description: this.channel.description,
          });
        } else {
          this.addChannel({ ...this.channel, user_id: this.user.id });
        }
      }
    },
  },
  watch: {
    statusCode() {
      if (this.statusCode == 201) {
        this.$router.push(`/channels/${this.channel.id}/reports`);
        this.SET_STATUS_CODE(0);
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
.description,
.users {
  grid-column: 1 / span 2;
}
</style>
