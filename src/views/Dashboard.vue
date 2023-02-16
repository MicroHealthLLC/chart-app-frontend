<template>
  <v-container>
    <v-row>
      <v-col cols="11">
        <div class="d-flex justify-space-between">
          <h3 v-if="(!isReadOnly && dashboard.id)">Update {{ dashboard.title }}</h3>
          <h3 v-else-if="dashboard.id">View {{ dashboard.title }}</h3>
          <div>
            <v-btn v-if="!isReadOnly" @click="saveDashboard" class="px-5 mr-2 mb-2" color="primary" depressed
              small>Save</v-btn>
            <v-btn v-else @click="editForm" class="px-5 mr-2 mb-2" color="primary" depressed small>Edit</v-btn>
            <v-btn v-if="isReadOnly" class="mb-2" @click="resetAndGoBack" small outlined>Close</v-btn>
            <v-btn v-if="!isReadOnly" class="mb-2" @click="cancelForm" small outlined>Cancel</v-btn>
          </div>
        </div>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';


export default {
  name: "Dashboard",
  components: {

  },
  data() {
    return {
      isReadOnly: false,
    }
  },
  methods: {
    ...mapActions(['fetchDashboards', 'fetchHeatMaps', 'fetch']),
    saveDashboard() {

    },
    cancelForm() {

    },
    resetAndGoBack() {

    },
  },
  computed: {
    ...mapGetters(["dashboard", "dashboards"])
  },
  mounted() {
    console.log(this.dashboard)
  }
};
</script>

<style scoped>

</style>
