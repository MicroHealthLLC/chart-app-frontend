<template>
  <v-row>
    <!-- Title -->
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3 class="pr-2">
          <v-icon class="gre pr-2 pb-1">
            mdi-television-classic
          </v-icon>
          <span v-if="channel.id">Update Channel</span>
          <span v-else>Create Channel</span>
        </h3>
        <div>
          <v-btn
            class="px-5 mr-2 mb-2"
            color="primary"
            depressed
            small
            @click="saveChannel"
          >
            Save
          </v-btn>
          <v-btn
            class="mb-2"
            small
            outlined
            @click="resetAndGoBack"
          >
            Close
          </v-btn>
        </div>
      </div>
      <v-divider class="mb-4" />
      <!-- Form Fields -->
      <v-card class="pa-4">
        <v-form
          ref="form"
          v-model="formValid"
          class="grid mt-4"
        >
          <div>
            <v-text-field
              v-model="channel.title"
              label="Title"
              dense
              required
              :rules="[(v) => !!v || 'Title is required']"
            />
          </div>
          <div class="ml-auto">
            <el-select
              v-model="channel.type"
              value-key="id"
              filterable
              clearable
              allow-create
              default-first-option
              placeholder="Channel Type"
              size="small"
            >
              <el-option
                v-for="item in uniqueTypes"
                :key="item.id"
                :label="item.title"
                :value="item"
              />
            </el-select>
            <!-- JUAN TO DO (12/1/2023) :
          IF user selects Group, need to display a multi-select component where user can select users to save in group. -->

            <!-- <v-select
              v-model="channel.category"
              label="Channel Type"
              :items="[
                { title: 'Public', value: 'public_channel' },
                { title: 'Personal', value: 'personal_channel' },
                { title: 'Group', value: 'group_channel' },
              ]"
              item-text="title"
              item-value="value"
              dense
            ></v-select> -->
          </div>
          <!-- <div v-if="channel.category == 'group_channel'" class="users">
            <v-select
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
            ></v-select>
          </div> -->
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
            />
          </div>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import channelsMixin from "../mixins/channels-mixin";

export default {
  name: "ChannelForm",
  mixins: [channelsMixin],
  data() {
    return {
      formValid: true,
      options: [
        {
          value: "HTML",
          label: "HTML",
          id: 1,
        },
        {
          value: "CSS",
          label: "CSS",
          id: 2,
        },
        {
          value: "JavaScript",
          label: "JavaScript",
          id: 3,
        },
      ],
      value: [],
      usersRules: [
        (v) => v.length > 0 || "At least 1 user is required",
        (v) =>
          v.map((user) => user.id).includes(this.user.id) ||
          "You must be included in the group",
      ],
    };
  },
  computed: {
    ...mapGetters([
      "channel",
      "channels",
      "statusCode",
      "user",
      "users",
      "channelTypes",
    ]),
    uniqueTypes() {
      let channel_types = this.channelTypes;
      return [...new Set(channel_types.map((item) => item.title))];
    },
  },
  methods: {
    ...mapActions([
      "addChannel",
      "updateChannelById",
      "addChannelType",
      "fetchChannelTypes",
      "fetchChannels",
    ]),
    ...mapMutations(["SET_STATUS_CODE"]),
    resetAndGoBack() {
      //this.$router.go(-1)
      this.channel.type = null;
      this.$refs.form.reset();
      this.$emit("closeChannelForm");
    },
    saveChannel() {
      this.$refs.form.validate();
      if (this.formValid) {
        //Need to add a new channel type if it doesn't exist
        if (!this.uniqueTypes.includes(this.channel.type)) {
          this.addChannelType({
            title: this.channel.type,
          });
        }
        if (this.channel.id) {
          this.updateChannelById({
            id: this.channel.id,
            title: this.channel.title,
            description: this.channel.description,
            type: this.channel.type,
          });
        } else {
          this.addChannel({
            ...this.channel,
          });
        }
        this.$refs.form.reset();
        this.channel.type = null;
        this.$emit("closeChannelForm");
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
    // statusCode() {
    //   if (this.statusCode == 201) {
    //     this.$router.push(`/channels/${this.channel.id}/reports`);
    //     this.SET_STATUS_CODE(0);
    //   }
    // },
    channels() {
      if (this.channels) {
        //console.log("Channels")
        //console.log(this.$route.path)
        //console.log(this.channels)
      }
    },
    channel() {
      this.data = this.channel;
      if (this.data.length > 0) {
        //console.log(this.data)
      }
      // else this.$refs.form.reset();
    },
  },
  mounted() {
    this.fetchChannelTypes();
    this.fetchChannels();
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}
.gre {
  color: #388e3c !important;
}
.description,
.users {
  grid-column: 1 / span 2;
}
</style>
