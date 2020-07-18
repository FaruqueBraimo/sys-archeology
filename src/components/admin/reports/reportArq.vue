<template>
    <div class="col-12    ">
        <q-card class="my-card text-center  ">

            <q-btn
                color=""
                flat
                icon="more_horiz"
                class="absolute-top-right"
             
            >
                <q-menu>

                    <q-list style="">
                        <!--TODO: implementar a actualização de vagas-->
                        <q-item clickable v-close-popup>
                            <q-item-section   >Editar</q-item-section>
                        </q-item>
                        <!--TODO: Implementar a remoção de vagas-->
                        <q-item clickable v-close-popup class="text-red"  >
                            <q-item-section  >Remover </q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
                <q-avatar color="primary" text-color="white"  icon="bar_chart"></q-avatar>



          
            <div style="">
                <q-card-section class='text-grey-7 text-bold'> 
                    <p> {{repo.arqId.label || ''}} </p>
                    <iframe :src="repo.url"> </iframe>
                </q-card-section>

               
                <q-card-actions>
                   
                    <q-btn
                            flat
                            color="primary"
                            class="full-width q-ma-sm"
                            label = 'Abrir Documento'
                            @click="open(repo.url)"
                            >
                       
                        <q-tooltip>
                            Abrir relatorio em formato pdf
                        </q-tooltip>
                    </q-btn>
                     <q-btn
                            flat
                            color="secondary"
                            class="full-width q-ma-sm"
                            label = 'Ver detalhes'
                            @click="info(repo.description)"
                            >
                       
                        <q-tooltip>
                            Mais Informação sobre a licença
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
    export default {
        name: "VacancyComponent",
        props: ['repo', 'id'],
        components: { },
      data () {
      return {
     doc: 'https://firebasestorage.googleapis.com/v0/b/arqueologs.appspot.com/o/reports%2FWyP7mdjRlkA2HGKuTWU0.pdf?alt=media&token=a3148a66-70b8-4b11-97e2-3df1d960fafd'
      }
    },
        computed: {
        },
       methods: {
             ...mapActions ('vacancy', [
                'deleteVacancy'
            ]),
            open(url){
                window.open(url,"_blanc")

            },
          
            info(info){
          
      this.$q
        .dialog({
          title: "Detalhes",
          message: info,
          ok: "Está bem",
          cancel: false,
         
          persistent: true
        })
        
    
      
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