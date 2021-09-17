<template>
  <v-card class="mb-2" color="#5e93be" dark
    ><v-card-title class="d-flex flex-row flex-nowrap"
      ><v-icon class="mr-3">mdi-account-circle</v-icon>
      <span
        ><h5>{{ newsReport.title }}</h5>
        <p class="text-caption mb-0">
          {{ newsReport.user.first_name }} {{ newsReport.user.last_name }}
        </p>
        <p class="text-caption mb-0">
          {{ new Date(newsReport.updated_at).toLocaleString() }}
        </p></span
      ></v-card-title
    >

    <v-divider></v-divider>

    <v-card-text class="text-caption">{{
      newsReport.body
    }}</v-card-text></v-card
  >
</template>

<script>
export default {
  name: "NewsCard",
  props: {
    newsReport: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
