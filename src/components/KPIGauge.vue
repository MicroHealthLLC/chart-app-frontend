<template>
    <vue-speedometer class="mx-5" :value="gauge.value" :maxValue="gauge.maxValue" :minValue="gauge.minValue" :width="200" needleColor="black" :paddingVertical=20 :segmentColors="setSegments(gauge.chartType, 'color')" :segments="setSegments(gauge.chartType, 'count')" :forceRender="true" />
    </template>
    
    <script>
    import VueSpeedometer from 'vue-speedometer';
    
    export default {
      name: "KPIGauge",
      components: {
        VueSpeedometer,
      },
      props: {
        gauge: Object,
      },
      methods: {
        setSegments(chartType, prop) {
        if (chartType == "Traditional" ) {
          return prop == 'color' ? ['tomato', 'gold', 'limegreen'] 
            : (prop == 'count') ? 3 : ''
        } else if (chartType == "Middle") {
          return prop == 'color' ? ['tomato', 'gold', 'limegreen', 'gold', 'tomato'] 
            : (prop == 'count') ? 5 : ''
        } else {
          return prop == 'color' ? ['tomato', 'gold', 'limegreen'] 
            : (prop == 'count') ? 3 : ''
        }
      }  
      },
      mounted() {
        console.log(this.gauge)
      }
    };
    </script>
    
    <style scoped></style>