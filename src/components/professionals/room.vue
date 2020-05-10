<template>
  <div class="">


          <div class="row justify-center" v-if="removed===true">
                {{status_removed}}

                  </div>  

<div v-if="$q.platform.is.mobile" class="q-pa-sm">

          


      <template v-for="(employee, id) in roomAdded" >
                  <q-item class="q-mb-sm" clickable v-ripple :key="id" > 
                      <q-item-section avatar>
                          <q-avatar size="32px">
                              <img  :src="employee && employee.image ? employee.image : img" >
                          </q-avatar>
                          <q-icon
                                                            
                          />
                      </q-item-section>

                      <q-item-section v-if="employee">
                          <q-item-label> {{employee.name}}</q-item-label>
                      </q-item-section>

                      <q-item-section side>
                          <q-btn
                              outline
                              no-caps
                              rounded
                              flat
                              size="sm"
                              color="red "
                              icon="delete"
                
                             @click="removeProfessional(id)"

                          />
                      </q-item-section>
                  </q-item>
              </template>

            
</div>


<div class="   "  v-if="$q.platform.is.desktop">
     
<table-room-added  
:roomAdded="roomAdded"
@removeFromRoom='removeFromRomm_status =$event'
/>


    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="tamanho > 0"   >
            <q-fab
              icon="meeting_room"
              direction="up"
              color="positive"
              
            >
              <q-fab-action  color="red" icon="delete" @click="removeAll()" />
              <q-fab-action color="primary" icon="done"  @click="dialogSubscription = true"/>
            <q-fab-action  color="teal" icon="add"  @click="$router.push('/professionals')"/>

            </q-fab>
          </q-page-sticky>


    <dialog-interviews-user-request
      :dialogSubscription="dialogSubscription" 
      @closeDialog="closeDialog()"
      :candidate="roomAdded"
     
      />  

  </div>

</template>

<script>
import DialogInterviewsUserRequest from "components/professionals/profile/DialogInterviewsUserRequest.vue"
import Categoria from  "components/professionals/categorias/Categoria.vue"
import mixin from '../../mixins/mixin.js'
 import { mapActions, mapState, mapGetters } from 'vuex'

import Profissionais from  "components/professionals/categorias/Profissionais.vue"
import TableRoomAdded from  "components/professionals/TableRoomAdded.vue"



export default {
  // name: 'ComponentName',
  
  
 mixins: [mixin],

  components:{
   Categoria,
   Profissionais,
   DialogInterviewsUserRequest,
   TableRoomAdded
      },
      data () {
        return {
           drawer: false,
          miniState: false,
          selecionados : '',
          age : '' ,
           img: 'statics/img/people/moca-curso.jpg',
          removed: false,
          status_removed :'',
          dialogSubscription: false,
          removeFromRomm_status : false

        }

    },

     computed: {


         ...mapState ('candidate', [
               'candidates'
           ]),
             roomAdded () {
                let arrs = []
                let room_professional ={}

                     if ( this.$q.localStorage.has('InterviewRoom') == true ) {
                           arrs = this.$q.localStorage.getItem('InterviewRoom')
                        }

                       arrs.map(o => {

                                let emp = this.candidates[o.professional]
                                
                                room_professional[o.professional] = emp

                         }
                    )
                    if(this.removed === true){
                         return room_professional
                    }
                   
             
              return room_professional
             }
             }
            ,
        methods:{
    closeDialog () {
          this.dialogSubscription = false
      }
            ,

            removeProfessional(id){
               let  arrs = this.$q.localStorage.getItem('InterviewRoom')
                console.log(arrs)
                 arrs.map(o => {
                        if( o.professional === id){
                            arrs.splice(o, 1);
                            this.$q.localStorage.set('InterviewRoom',arrs)
                             this.removed = true
                                      setTimeout(() => {
                                           this.removed = false
                                      }, 100);  

                        }    
                 })    

            },

            removeAll(){

            this.$q.dialog({
        title: 'Confirmação',
        message: 'Deseja remover todos profissionais da entrevista ? '
      }).onOk(() => {
        this.$q.localStorage.remove('InterviewRoom')
        this.removed = true
                            this.status_removed = 'Sala de entrevistas vazias'
      
        this.$q.notify({
        message: 'Removidos com sucesso',
        color: 'cyan-6'
      })
    

      })
            }

            },

            watch:{

                removeFromRomm_status(val){
                  this.removeProfessional(val)
                }

            }
            



  }
</script>
