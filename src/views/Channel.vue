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
  mounted() {
    this.fetchChannel(this.$route.params.channelId);
  },
  watch: {
    $route() {
      this.fetchChannel(this.$route.params.channelId);
    },
  },
};
</script>

<style></style>
