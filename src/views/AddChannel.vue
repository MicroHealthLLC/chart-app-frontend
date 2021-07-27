<template>
  <v-row>
    <!-- Title -->
    <v-col class="col-12">
      <div class="d-flex justify-space-between">
        <h3>Add Channel</h3>
        <div>
          <v-btn class="px-5 mr-2 mb-2" color="primary" depressed small
            >Save</v-btn
          >
          <v-btn class="mb-2" small outlined>Cancel</v-btn>
        </div>
      </div>
      <v-divider></v-divider>
    </v-col>
    <!-- Form Fields -->
    <v-col class="col-6">
      <v-text-field label="Title" dense> </v-text-field>
    </v-col>
    <v-col class="col-6">
      <v-select
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
      ><v-textarea class="pt-0" label="Description" rows="1"></v-textarea
    ></v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style scoped></style>
