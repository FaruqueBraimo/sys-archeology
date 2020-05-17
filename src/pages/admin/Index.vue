<template>
  <q-page padding>
    <div class="row inline q-pa-md">
      <div class="col q-pr-md">
        <q-card class="my-card text-white" style="  background-image: linear-gradient(#1488CC, #2B32B2);
">
          <q-card-section>
            <div class="text-h5" v-if="Object.keys(candidates).length>0">{{Object.keys(candidates).length}}</div>
              <q-skeleton type="QRadio"  v-else  class="bg-warning" />
            <div class="text-subtitle2">Arquologos</div>
          </q-card-section>
          <q-card-section>
            Numero total de arqueologos registados no sistema
              <q-linear-progress indeterminate color="warning" class="q-mt-sm" />
          </q-card-section>
        </q-card>
      </div>
      <div class="col q-pr-md">
        <q-card class="my-card text-white" style="  background-image: linear-gradient(#0F2027, #203A43,#2c5364);
">
          <q-card-section>
            <div class="text-h5" v-if="Object.keys(licenses).length>0">{{Object.keys(licenses).length}} </div>
               <q-skeleton type="QRadio"  v-else  class="bg-red-5"  />
            <div class="text-subtitle2">Licenças</div>
          </q-card-section>
          <q-card-section>
            Numero total de Licenças atibuidas aos arqueologos
              <q-linear-progress indeterminate color="red-5" class="q-mt-sm" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col q-pr-md" >
        <q-card class="my-card text-white" style="  background-image: linear-gradient(#FF416C, #FF4B2B);
">  
          <q-card-section>
            <div class="text-h5" >444</div>
            <div class="text-subtitle2">Relatorios</div>
          </q-card-section>
          <q-card-section>
            Numero total de Relatorios submetidos pelos arqueologos
              <q-linear-progress indeterminate color="primary" class="q-mt-sm" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col">
        <q-card class="my-card text-white" style="  background-image: linear-gradient(#b92b27, #1565C0);
">
          <q-card-section>
            <div class="text-h5" v-if="Object.keys(users).length>0" >{{Object.keys(users).length}}</div>
               <q-skeleton type="QRadio"  v-else  class="bg-green"   />
            <div class="text-subtitle2">Usuarios</div>
          </q-card-section>
          <q-card-section>
                      Numero total de Utilizadores activos no sistemas
                        <q-linear-progress indeterminate color="green" class="q-mt-sm" />

          </q-card-section>
        </q-card>
      </div>
    </div>

  <div class=" text-bold text-h5 text-center q-pt-xl"> 
      Em breve aqui vai nascer um gráfico lindo, sozinho! 
    </div>

      
      
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import lineChart from "../../components/admin/dialogs/line-chart";

import { date } from "quasar";

export default {
 components: {   lineChart
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
    ...mapState("license", ["licenses", ])



  },
   methods: {
      ...mapActions('settings', [
          'setActualPageTitle'
      ]),}
};
</script>
