<template>
    <div class="col-xs-12 col-sm-6 col-md-3 q-py-xs-sm q-pa-sm-md">
        <q-card
            class="my-card"
            :class="{'bg-red-1' : (new Date(vacancy.endAt)) < (new Date())}"
        >
           

            <img src="http://statig2.akamaized.net/bancodeimagens/e2/oy/z4/e2oyz4a6zsnn1vs0vs3pv3whl.jpg">

            <q-card-section>
                <div class="text-h6 text-primary">{{ vacancy.title | limitLength(17) }}</div>
                <div class="text-subtitle2">
                    <q-avatar
                        rounded
                        size="20px"
                    >
                        <img src="/statics/icons/icon-128x128.png">
                    </q-avatar>
                    Norb Consulting
                </div>
            </q-card-section>

            <q-card-section>
                {{ vacancy.description | limitLength(30) }}
            </q-card-section>
            <q-card-actions>
                <q-btn flat   @click="details(id)" >Detalhes

            <q-tooltip>
         Para mais info. da vaga
          </q-tooltip>

                </q-btn>
                <q-btn flat class="absolute-bottom-right q-ma-sm" icon="access_time">{{ vacancy.endAt }}
                    
                       <q-tooltip>
                      A data limite
                  </q-tooltip>
                     </q-btn>
            </q-card-actions>
        </q-card>
    </div>

</template>

<script>
    import { mapActions } from 'vuex'
    import { date } from 'quasar'
   import VacancyDetails from "pages/admin/VacancyDetails";

    export default {
        name: "VacancyComponent",
        props: ['vacancy', 'id'],
        components: { VacancyDetails},

      data () {
      return {
   
      }
    }
,
       methods: {
             ...mapActions ('vacancy', [
                'deleteVacancy'
            ]),
               
            details(id){
               this.$router.push('vagas/details/' + id)
            }
            
        },
        filters: {
            limitLength (val, length) {
                return val.length > length ? val.substr(0, length) + '...' : val
            }
            
        }
    }
</script>
<style scoped>

</style>