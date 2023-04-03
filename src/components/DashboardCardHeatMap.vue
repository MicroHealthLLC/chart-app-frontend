<template>
    <div>
        <h4 class="pa-4">{{ heatMap.title }}</h4>
        <KPIHeatMap :heatMap="heatMap" :headers="cols" :dataItems="data"/>
    </div>
</template>

<script>
import KPIHeatMap from './KPIHeatMap.vue';
import datasetMixin from '../mixins/dataset-mixin';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "DashboardCardHeatMap",
    props: {
        heatMap: Object
    },
    components: {
        KPIHeatMap
    },
    data() {
        return {
            data: [],
            cols: []
        };
    },
    mixins: [datasetMixin],
    computed: {
        ...mapGetters([
            "currentChannels",
            "channelDataSets",
            "dataSets",
            "dataSet",
            "user",
        ]),
    },
    methods: {
        ...mapActions([
            "fetchDataSet",
        ]),
    },
    async mounted() {
        await this.fetchDataSet(this.heatMap.dataSetId)
        this.data = this.createMasterData(this.dataSet.dataValues.items)
        if (this.heatMap.columns && typeof this.heatMap.columns == "string") {
            this.cols = JSON.parse(this.heatMap.columns) 
        }
    },
    watch: {

    }
}
</script>

<style>

</style>