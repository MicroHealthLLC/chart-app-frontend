<template>
  <GaugeForm />
  </template>
  
  <script>
  import GaugeForm from "../components/GaugeForm.vue";
  
  export default {
    name: "Gauge",
    components: {
      GaugeForm
    },
    mounted() {
      console.log(this.gauge)
    }
  };
  </script>
  
  <style scoped></style>