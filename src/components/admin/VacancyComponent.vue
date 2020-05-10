<template>
    <div class="col-xs-12 col-sm-6 col-md-3 q-py-xs-sm q-pa-sm-md">
        <q-card class="my-card">

            <q-btn
                color="white"
                flat
                icon="more_horiz"
                class="absolute-top-right"
            >
                <q-menu>
                    <q-list style="min-width: 100px">
                        <!--TODO: implementar a actualização de vagas-->
                        <q-item clickable v-close-popup>
                            <q-item-section   @click="$emit('editVacancy', vacancy)">Editar</q-item-section>
                        </q-item>
                        <!--TODO: Implementar a remoção de vagas-->
                        <q-item clickable v-close-popup class="text-red"  >
                            <q-item-section @click="removeVancancy(id,vacancy.title)" >Remover </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>


            <img
                @click="details(id)"
                :src="getVacancyImage(vacancy)"
                style="height: 200px"
            >

            <div style="min-height: 200px">
                <q-card-section>
                    <div class="text-h6 text-primary">{{ vacancy.title | limitLength(17) }}</div>
                    <div class="text-subtitle2">
                        <q-avatar
                                rounded
                                size="20px"
                        >
                            <img :src="customerImage(vacancy.customerId)">
                        </q-avatar>
                        {{ customerName (vacancy.customerId)}}
                    </div>
                </q-card-section>

                <q-card-section>
                    {{ vacancy.description | limitLength(30) }}
                </q-card-section>
                <q-card-actions>
                    <q-btn class="absolute-bottom-left q-ma-sm" flat   @click="details(id)" >Detalhes

                        <q-tooltip>
                            Para mais info. da vaga
                        </q-tooltip>

                    </q-btn>
                    <q-btn
                            flat
                            :color="vacancy.publishedAt ? 'green' : 'grey'"
                            class="absolute-bottom-right q-ma-sm"
                            icon="access_time">
                        {{ vacancy.endAt }}
                        <q-tooltip>
                            A data limite
                        </q-tooltip>
                    </q-btn>
                </q-card-actions>
            </div>
        </q-card>
    </div>

</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    import { date } from 'quasar'
   import VacancyDetails from "pages/admin/VacancyDetails";

    export default {
        name: "VacancyComponent",
        props: ['vacancy', 'id'],
        components: { VacancyDetails},

      data () {
      return {
   
      }
    },
        computed: {
            ...mapState ('customer', ['customers']),
            ...mapGetters ('vacancy', ['getVacancyImage']),
        },
       methods: {
             ...mapActions ('vacancy', [
                'deleteVacancy'
            ]),

           customerImage (id) {
                return id && this.customers[id] && this.customers[id].image ? this.customers[id].image : '/statics/icons/icon-128x128.png'
           },
           customerName (id) {
               return id && this.customers[id] && this.customers[id].name ? this.customers[id].name : 'Norb Consulting'
           },
            removeVancancy(id,titulo){
                this.$q.dialog({
                    title: 'Confirmar',
                    message: 'Quer mesmo deletar a vaga ' + titulo + '?',
                    cancel: true,
                    persistent: true
                }).onOk(() => {
                    this.deleteVacancy(id);
                })                  
            },

            details(id){

               this.$router.push('/admin/vacancy/' + id)
      
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