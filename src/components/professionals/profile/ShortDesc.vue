<template>
  <div class="q-pa-md">

      <div class="row 	 fit"  style="min-height:550px ">

            <div class="row col-3 bg-grey-2  q-py-md"  style="min-height ">

                  <div class="bg-primary text-primary" style="max-height:374px "> >
                   <span > . </span>

                  </div>

                  <div class="col-9 q-mx-sm  " >
                <q-card class="my-card  square " square flat
      >     
                      <img :src="candidate.image ? candidate.image : img">
                      <q-card-section>
                        <div class="text-h5 text-primary q-pl-sm text-bold text-uppercase	 text-center">    {{ candidate.name }} </div>
                          <div class="text-h5 text-black q-pl-sm  text-subtitle2  text-center " v-for="(i,index) in candidate.professions" :key="i"> {{ i | professionals(positions,index) }} </div>

                      </q-card-section>

                    </q-card>
                  </div>

            </div>
            <div class="col-8 q-pa-md"> 
                    <div class="row text-black text-h6 text-bold">
                      <div class="col-1 ">
                              <q-icon name="person_pin" class="text-primary" style="font-size: 1.4em;" />
                        </div> 
                       <div class="row col q-pr-sm">
                       
                       <div class="col">
                            PERFIL
                       </div>

                       <div class="col  q-pl-xl items-end justify-end">
                    <q-btn unelevated   no-caps color="primary" label="Marcar entrevista"  v-if="selected===false"    @click="$emit('addToInterview')"> 

                      <q-tooltip
                      transition-show="rotate"
                      transition-hide="rotate"
                       content-class="bg-deep-orange text-caption"
                       
                    >
                      Adicionar profissional a sala de entrevistas
                    </q-tooltip>

                    </q-btn>
                    <q-chip clickable v-if="selected===true" class="text-caption q-mt-sm" size="15px" color="primary" text-color="white" icon="done">
                     Selecionado
                  </q-chip>
                       </div>
          
                    
                       </div> 
                      </div>

                      <div>
                    <q-card class="my-card q-pl-md"  flat square>
                    <q-card-section class="q-pl-xl">
                      {{ candidate.description }}
                    </q-card-section>
                    
                  </q-card>
                  <q-separator/>
                      </div>

                       <div class="row text-black text-h6 text-bold q-pt-md">
                      <div class="col-1 ">
                              <q-icon name="work" class="text-primary" style="font-size: 1.4em;" />
                        </div> 
                       <div class="row col q-pr-sm">
                       
                       <div class="col text-uppercase	">
                            experiência
                       </div>
                    
                       </div> 
                      </div>

                      <div>
                    <q-card class="my-card q-pl-md"  flat square>
                    <q-card-section class="q-pl-xl">
                      {{ candidate.experience }}
                    </q-card-section>
                    
                  </q-card>
                  <q-separator/>
                      </div>

                      <div class="row text-black text-h6 text-bold q-pt-md">
                          <div class="col-1 ">
                                  <q-icon name="school" class="text-primary" style="font-size: 1.4em;" />
                            </div> 
                              <div class="row col q-pr-sm">
                              
                                  <div class="col text-uppercase 	">
                                      formação acadêmica
                                  </div>
                            
                              </div> 
                      </div>

                      <div>
                    <q-card class="my-card q-pl-md"  flat square>
                    <q-card-section class="q-pl-xl">
                      {{ candidate.school }}
                    </q-card-section>
                    
                  </q-card>
                  <q-separator/>
                      </div>

                        <div class="row text-black text-h6 text-bold q-pt-md">
                          <div class="col-1 ">
                                  <q-icon name="person" class="text-primary" style="font-size: 1.4em;" />
                            </div> 
                              <div class="row col q-pr-sm">
                              
                                  <div class="col text-uppercase	">
                                      Dados Pessoais
                                  </div>
                            
                              </div> 
                      </div>

                      <div>
                    <q-card class="my-card q-pl-md"  flat square>
                    <q-card-section class="q-pl-xl">
            <div>
                <q-chip square > 
                    <q-avatar icon="calendar_today" color="light-green-6" text-color="white" />
                           <span class="q-pl-sm"> {{candidate.birthDate | dateFormated }}</span>
                            <q-tooltip>Idade</q-tooltip>

                  </q-chip>
             </div>

             <div>
                <q-chip square > 
                    <q-avatar icon="location_on" color="deep-orange" text-color="white" />
                           <span class="q-pl-sm"> {{candidate.bairro}}</span>
                            <q-tooltip>Bairro</q-tooltip>
                  </q-chip>
             </div>
                    </q-card-section>
                    
                  </q-card>
                      </div>
            </div>






      </div>




   
  </div>
</template>

<script>
    import { date } from 'quasar'
        import {mapActions, mapState, mapGetters} from 'vuex'


export default {
  // name: 'ComponentName',

   props: ['candidate','selected'],
  data () {
    return {
       img: 'statics/img/people/moca-curso.jpg',
      texto : 'a',
     lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

    }
  }
,


mounted(){

   
},

computed:{
 ...mapState('position', [
                'positions'
            ]),

},

 filters: {
            dateFormated (val) {
                        let date1 = Date.now()
                        let unit = 'years'
                        let diff = date.getDateDiff(date1, val, unit)
                        if(diff>0) {
                            return diff + ' anos de idade'
                        }
                        else{
                            return  'Desconhecida'
                        }

            },
      professionals(val,arg,i){          
          return     i > 0  ?   ' & ' +  arg[val].label   : arg[val].label 
      }

    }
}
</script>
