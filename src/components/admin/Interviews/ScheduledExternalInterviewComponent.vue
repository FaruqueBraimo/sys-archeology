<template>
 
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="mail"
        label="Profissionais selecionados"
        default-opened
      >

          <ul v-for="(prof,id) in profissionais" :key="id" class=" q-ml-xl">
              <li  >
                 {{prof}}
              </li>

             
            </ul>

        <q-expansion-item
          :header-inset-level="1"
          expand-separator
          icon="info"
          label="Dados do Solicitante"
          default-opened
        >
            

            <q-expansion-item switch-toggle-side dense-toggle label="Nome" :header-inset-level="1" :content-inset-level="2">
            <q-card>
              <q-card-section>
              
            {{interview.name}}   {{interview.lastName}} 

              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item  switch-toggle-side dense-toggle label="Contacto" :header-inset-level="1" :content-inset-level="2">
            <q-card>
              <q-card-section>
               <div >
                         Telefone :  {{interview.phone}} 
                    
                  </div>

                   <div >
                        Email :  {{interview.email}} 
                    
                  </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>

        </q-expansion-item>

        <q-expansion-item :header-inset-level="1" :content-inset-level="1" expand-separator icon="schedule" label="Hora">
          <q-card>
            <q-card-section>
            {{interview.time}}
            </q-card-section>
          </q-card>
        </q-expansion-item>

      </q-expansion-item>

    
    </q-list>
</template>
<script>
    import { mapActions,mapState, mapGetters } from 'vuex'
  
    export default {
        props: ['object', 'interview'],
        name: "ScheduledInterviewComponent",
        
        mounted(){
           
        },
           computed: {
      
          ...mapState('candidate', ['candidates']),


            profissionais(){
              let arrays = {};
               Object.keys(this.object.customerName).map( (i) => {
              arrays[i] = this.candidates[i].name

            } )
            return  arrays
            }


   
           }


    }
  


</script>



<style scoped>

      


</style>