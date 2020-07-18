<template>
  
  <q-page padding class="q-pt-sm">
		<div class="row  q-pa-md justify-center items-center">
			<div class="col q-pa-sm">
				<q-card class="report-card text-grey-10" flat bordered>
					<q-card-section>
						<div class="row">
							<div
								class=" col "
								v-if="Object.keys(reports).length > 0"
							>
								<div>Relatorios</div>
								<span class="text-green-5 text-h4">
									{{ Object.keys(reports).length }}</span
								>
							</div>
							<q-skeleton type="QRadio" v-else />

							<div class=" col text-right text-green-5 q-pa-md ">
								<q-icon
									name="apps"
									style="font-size: 3.0em;"
								/>
							</div>
						</div>

						<div>
							<q-linear-progress
								indeterminate
								color="green-5"
								class="q-mt-sm"
							/>
						</div>
					</q-card-section>
				</q-card>
			</div>

			<div class="col q-pa-sm">
				<q-card class="report-card text-grey-10" flat bordered>
					<q-card-section>
						<div class="row">
							<div
								class=" col "
								v-if="Object.keys(candidates).length > 0"
							>
								<div>Arqueologos</div>
								<span class="text-primary text-h4">
									{{ Object.keys(candidates).length }}</span
								>
							</div>
							<q-skeleton type="QRadio" v-else />

							<div class=" col text-right text-primary q-pa-md ">
								<q-icon
									name="person"
									style="font-size: 3.0em;"
								/>
							</div>
						</div>

						<div>
							<q-linear-progress
								indeterminate
								color="primary"
								class="q-mt-sm"
							/>
						</div>
					</q-card-section>
				</q-card>
			</div>

			<div class="col q-pa-sm">
				<q-card class="report-card text-grey-10" flat bordered>
					<q-card-section>
						<div class="row">
							<div
								class=" col "
								v-if="Object.keys(licenses).length > 0"
							>
								<div>Licenças</div>
								<span class="text-deep-orange text-h4">
									{{ Object.keys(licenses).length }}</span
								>
							</div>
							<q-skeleton type="QRadio" v-else />

							<div
								class=" col text-right text-deep-orange q-pa-md "
							>
								<q-icon
									name="receipt"
									style="font-size: 3.0em;"
								/>
							</div>
						</div>

						<div>
							<q-linear-progress
								indeterminate
								color="deep-orange"
								class="q-mt-sm"
							/>
						</div>
					</q-card-section>
				</q-card>
			</div>

			<div class="col q-pa-sm">
				<q-card class="report-card text-grey-10" flat bordered>
					<q-card-section>
						<div class="row">
							<div
								class=" col "
								v-if="Object.keys(users).length > 0"
							>
								<div>Utilizadores</div>
								<span class="text-secondary text-h4">
									{{ Object.keys(users).length }}</span
								>
							</div>
							<q-skeleton type="QRadio" v-else />

							<div
								class=" col text-right text-secondary q-pa-md "
							>
								<q-icon
									name="group"
									style="font-size: 3.0em;"
								/>
							</div>
						</div>

						<div>
							<q-linear-progress
								indeterminate
								color="secondary"
								class="q-mt-sm"
							/>
						</div>
					</q-card-section>
				</q-card>
			</div>
		</div>

		<div class="row ">
			
		<div class=" col text-bold  text-h5 text-center ">
			<report-component/>
		</div>
			<div class="col"> 
							<pieChartComponent/>
							

					</div>
		 </div>		
		 		<div class="row q-pt-md">
					 <div class="col-6   q-pl-xl">
					Gráfico de actividades dos ultimos 5 anos
					</div><div class="col-6   q-pl-xl">
						Licenças por area de trabalho
					</div>

				 </div>
					<div class="container body-content">
   
    
	<div class='text-center text-bold q-pt-xl'> 
		 <hr  class="q-mb-sm"/>
		  <p>Desenvolvido por Agostinho Jose &copy; 2020</p>
	 </div>

</div>			

	</q-page>
	
</template>

<script>
import { mapActions, mapState } from "vuex";
import reportComponent from '../../components/admin/reports/reportComponent';
		import pieChartComponent from '../../components/admin/reports/pieChartComponent';

import { date } from "quasar";

export default {
 components: {   pieChartComponent, reportComponent
  },
  data () {
    return {
      chartData: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
    }
  },
  mounted() {
    this.setActualPageTitle("Página Inicial");

    if (!this.users) {
      this.$router.push("/");
    }
    let user = this.users[this.userAuth.uid];

    //Redireciona o user para outra página, caso o user não seja Administrador nem Editor
  },
  computed: {
    ...mapState("settings", ["globalConfigs"]),
    ...mapState("auth", ["users", "userAuth"]),
    ...mapState("candidate", ["candidates", ]),
    ...mapState("license", ["licenses", ]),
  ...mapState ('report', [
            'reports', 
        ]),
       


  },
   methods: {
      ...mapActions('settings', [
          'setActualPageTitle'
      ]),}
};
</script>
