<template>
  <v-row class="fill-height">
    <v-col class="d-flex justify-center align-center">
      <div class="text-center">
        <h1><v-icon x-large> mdi-alert-outline </v-icon> 403</h1>
        <p>You are not authorized to view this content!</p>
        <v-btn class="fill-width" color="info" to="/"> Return Home </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Forbidden",
};
</script>

<style></style>
