<template>
  <ChannelForm />
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import ChannelForm from "./../components/ChannelForm.vue";

export default {
  components: {
    ChannelForm,
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    ...mapMutations(["SET_CHANNEL"]),
  },
  beforeMount() {
    this.fetchUsers();
  },
  mounted() {
    this.SET_CHANNEL({ title: "", category: "public", description: "" });
  },
};
</script>

<style></style>
