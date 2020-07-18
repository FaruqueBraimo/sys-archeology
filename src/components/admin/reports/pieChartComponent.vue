<template>
	<div class=" ">
		<GChart
			type="PieChart"
			:data="chartData"
			:options="chartOptions"
			:settings="{ packages: ['corechart', 'table', 'map'] }"
			resizeDebounce="400"
		/>
	</div>
</template>

<script>
	import { GChart } from 'vue-google-charts';
	import { mapActions, mapState, mapGetters } from 'vuex';

	export default {
		components: {
			GChart
		},

		computed: {
			...mapState('product', [
				'products',
				
			]),
		},

		mounted() {
			Object.keys(this.products).forEach((element, key) => {
					// this.optionalUsers.push({
					// 	value: element,
					// 	label: this.users[element].name
					// });
					if(key < 5){
						this.chartData[3] = ['Juntssas', 11],
						this.chartData[1] = ['ProdutosX' , 'QuantidaY']
						this.chartData[2] = ['ProdutosX' , 'QuantidaY']
						this.chartData[3] = ['ProdutosX' , 'QuantidaY']


					}

				});

		},

		data() {
			return {
				// Array will be automatically processed with visualization.arrayToDataTable function
				chartData: [
					['Produtos', 'Quantidade'],
					['Maputo', 11],
					['Angoche', 2],
					['Marracuene', 2],
					['Matola', 2],
					['Nampula', 7]
				],
				chartOptions: {
					width: 590,

					chart: {
          title: 'My Daily Activities',
					},
					series: {
						0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
						1: { axis: 'brightness' } // Bind series 1 to an axis named 'brightness'.
					}
				}
			};
		}
	};
</script>

<style scoped></style>
