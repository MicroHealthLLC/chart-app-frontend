<template>
  <ul class="text-caption">
    <li>
      <strong
        ><v-icon small>mdi-file-chart-outline</v-icon> Total Reports:</strong
      >
      {{ reportCount }}
    </li>
    <li>
      <strong> <v-icon small>mdi-text</v-icon> Description:</strong>
      {{ description }}
    </li>
    <li>
      <strong>Category: </strong>
      <span class="category">{{ category }}</span>
    </li>
    <li>
      <strong>Created By: </strong>
      <span class="created-by">{{ createdBy }}</span>
    </li>
    <li v-if="category == 'group_channel'">
      <strong>Members: </strong>
      <v-chip
        v-for="(member, index) in members"
        :key="index"
        x-small
        color="info"
        class="mr-1 mb-1"
        >{{ member.first_name }} {{ member.last_name }}</v-chip
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: "ChannelDetails",
  props: {
    reportCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    createdBy: {
      type: String,
      default: "",
    },
    members: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.category,
.created-by {
  text-transform: capitalize;
}
</style>
