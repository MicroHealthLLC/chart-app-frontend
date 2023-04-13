<template>
  <v-card class="mb-2" color="#5e93be" dark>
    <v-card-title class="d-flex flex-row flex-nowrap">
      <v-avatar class="mr-3" size="32" color="white">
        <span class="initials">{{ userInitials }}</span>
      </v-avatar>
      <span
        ><h5>{{ newsReport.title }}</h5>
        <p class="text-caption mb-0">
          {{ newsReport.user.first_name }} {{ newsReport.user.last_name }}
        </p>
        <p class="text-caption mb-0">
          {{ new Date(newsReport.updated_at).toLocaleString() }}
        </p></span
      >
    </v-card-title>

    <v-divider />

    <v-card-text class="text-caption">
      {{ newsReport.body }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NewsCard",
  props: {
    newsReport: {
      type: Object,
    },
  },
  computed: {
    userInitials() {
      return (
        this.newsReport.user.first_name[0] + this.newsReport.user.last_name[0]
      );
    },
  },
};
</script>

<style scoped>
.initials {
  color: #5e93be;
  font-size: 16px;
}
</style>
