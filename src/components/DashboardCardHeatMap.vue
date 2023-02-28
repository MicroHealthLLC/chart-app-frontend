<template>
	<div>
		<span class="d-flex">
			<h4 class="pa-4">{{ heatMap.title }}</h4>
			<v-btn class="ml-0 mt-2" icon @click.prevent="toHeatMap(heatMap.id)"><v-icon small>fa-solid
					fa-up-right-from-square</v-icon></v-btn>
		</span>
		<v-btn @click="fullscreenHeatMap" class="chart-menu" icon>
			<v-icon>mdi-fullscreen</v-icon>
		</v-btn>
		<KPIHeatMap :heatMap="heatMap" :headers="cols" :dataItems="data" />
		<v-dialog v-model="fullscreen" fullscreen eager>
			<v-card>
				<v-toolbar class="px-5" color="info" dark>
					<h3>{{ heatMap.title }}</h3>
					<v-spacer></v-spacer>
					<v-btn @click="fullscreen = false" icon><v-icon>mdi-close-thick</v-icon></v-btn>
				</v-toolbar>
				<KPIHeatMap :heatMap="heatMap" :headers="cols" :dataItems="data" />
			</v-card>
		</v-dialog>
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
			cols: [],
			fullscreen: false,
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
		toHeatMap(id) {
			this.$router.replace(`/${this.currentChannels[0].name}/heatMaps/${id}`)
		},
		fullscreenHeatMap() {
			this.fullscreen = true;
			/* setTimeout(() => {
				this.$refs.fullscreenchart.loadChart();
			}, 100); */
		},
	},
	async mounted() {
		await this.fetchDataSet(this.heatMap.dataSetId)
		this.data = this.createMasterData(this.dataSet.dataValues.items)
		if (this.heatMap.columns && typeof this.heatMap.columns == "string") {
			this.cols = JSON.parse(this.heatMap.columns)
			this.heatMap.columns = JSON.parse(this.heatMap.columns)
		}
		if (this.heatMap.options && typeof this.heatMap.options == 'string') {
			this.heatMap.options = JSON.parse(this.heatMap.options)
		}
	},
	watch: {
	}
}
</script>

<style>
.chart-menu {
	position: absolute;
	top: 10px;
	right: 10px;
}
</style>