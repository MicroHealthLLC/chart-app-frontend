<template>
  <v-card>
    <v-toolbar
      color="info"
      dark
    >
      Edit Channel Details
    </v-toolbar>
    <v-card-text>
      <v-form
        ref="form"
        v-model="formValid"
        class="mt-4"
      >
        <v-text-field
          v-model="title"
          label="Title"
          required
          :rules="[(v) => !!v || 'Title is required']"
        />
        <v-select
          v-if="false"
          v-model="category"
          label="Channel Type"
          :items="[
            { title: 'Public', value: 'public_channel' },
            { title: 'Personal', value: 'personal_channel' },
            { title: 'Group', value: 'group_channel' },
          ]"
          item-text="title"
          item-value="value"
        />
        <v-select
          v-if="category == 'group_channel'"
          v-model="channel.members"
          :items="users"
          :item-text="(user) => `${user.first_name} ${user.last_name}`"
          item-value="id"
          label="Group Members"
          hint="Please add all members who will have access to this Channel"
          persistent-hint
          multiple
          chips
          deletable-chips
          return-object
          dense
          required
          :rules="usersRules"
        />
        <v-textarea
          v-model="description"
          class="mt-4"
          label="Description"
          background-color="grey lighten-5"
          outlined
          auto-grow
          required
          :rules="[(v) => !!v || 'Description is required']"
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        outlined
        small
        @click="closeForm"
      >
        Close
      </v-btn>
      <v-btn
        color="primary"
        depressed
        small
        @click="editChannel"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      category: "",
      description: "",
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
    ...mapGetters(["channel", "user", "users"]),
  },
  methods: {
    ...mapActions(["updateChannel"]),
    closeForm() {
      this.$emit("closeform");
    },
    editChannel() {
      this.$refs.form.validate();

      if (this.formValid) {
        this.updateChannel({
          id: this.channel.id,
          title: this.title,
          category: this.categoryEnum(),
          description: this.description,
          member_ids: this.channel.members.map((member) => member.id),
        });
      }
    },
    categoryEnum() {
      if (this.channel.category == "group_channel") {
        return 0;
      } else if (this.channel.category == "personal_channel") {
        return 1;
      } else {
        return 2;
      }
    },
  },
  watch: {
    channel() {
      this.title = this.channel.title;
      this.category = this.channel.category;
      this.description = this.channel.description;
    },
  },
  mounted() {
    this.title = this.channel.title;
    this.category = this.channel.category;
    this.description = this.channel.description;
  },
};
</script>

<style></style>
