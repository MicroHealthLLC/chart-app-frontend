<template>
  <ChannelForm />
</template>

<script>
import { mapMutations } from "vuex";
import ChannelForm from "./../components/ChannelForm.vue";

export default {
  components: {
    ChannelForm,
  },
  methods: {
    ...mapMutations(["SET_CHANNEL"]),
  },
  mounted() {
    this.SET_CHANNEL({ title: "", category: "public", description: "" });
  },
};
</script>

<style></style>
