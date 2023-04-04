<template>
  <ChannelForm />
</template>

<script>
import { mapActions } from "vuex";
import ChannelForm from "./../components/ChannelForm";

export default {
  components: {
    ChannelForm,
  },
  methods: {
    ...mapActions(["fetchChannel"]),
  },
  watch: {
    $route() {
      this.fetchChannel(this.$route.params.channelId);
    },
  },
  mounted() {
    this.fetchChannel(this.$route.params.channelId);
    console.log();
  },
};
</script>

<style></style>
