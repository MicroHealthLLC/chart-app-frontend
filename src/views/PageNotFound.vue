<template>
  <v-row class="justify-center">
    <v-col cols="12" sm="6">
      <v-img src="404.svg" alt="page-not-found" />
      <div class="d-flex justify-center">
        <v-btn to="/" color="#1d336f" text>
          <v-icon left> mdi-home </v-icon> Return Home
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style scoped></style>
