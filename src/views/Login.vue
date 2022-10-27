<template>
<div></div>
</template>

<script>
import { Auth } from "aws-amplify";

export default {
  name: "Login",
  methods: {
    fedSignIn() {
      Auth.federatedSignIn()
    }
  },
  mounted() {
    this.fedSignIn()
  },
};
</script>

