<template>
<q-page  class="bg-white">
<div class="row ">

   <div class="col " >
<q-card clickable v-ripple class="my-card"  
          flat
          >
 
      <q-card-section class="text-center	">
          <q-avatar  size="80px"   >
              
                 <img  :src="candidate.image ? candidate.image : img">
        </q-avatar>
      </q-card-section>
      <q-card-section class="text-center text-bold">
        <div>{{candidate.name}}</div>
      
    <div class="text-caption"> {{candidate.birthDate | dateFormated }}</div>
    <q-chip clickable v-if="selected===true" class="text-caption" color="teal" text-color="white" icon="done">
      Selecionado
    </q-chip>
      </q-card-section>
        
        <q-card-section class="text-center ">
        
         <div class="">
 Residente do bairro de {{candidate.bairro }} 
          </div>
      </q-card-section>
    </q-card>
  </div>
    </div>

        <div  class="q-pa-md" v-if="selected===false">
 <q-btn no-caps color="cyan-6"   @click="$emit('addToInterview')" label="Adicionar a entevista"  class="full-width"/>
        </div>

 <div class="q-pa-md bg-white" >
    <q-list bordered class="rounded-borders">
      <q-expansion-item class="q-pa-sm ">
        <template v-slot:header>
          <q-item-section avatar>
                 <q-icon color="cyan-6" name="perm_identity" />
          </q-item-section>

          <q-item-section class="text-bold">
           Perfil
          </q-item-section>

         
        </template>

        <q-card >
          <q-card-section>
          {{candidate.description }} 
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item  class="q-pa-sm ">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="cyan-6" name="work_outline" />
          </q-item-section>

          <q-item-section class="text-bold">
           Experiência
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
           {{candidate.experience }}
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />

      <q-expansion-item  class="q-pa-sm ">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="cyan-6" name="account_balance" />
          </q-item-section>

          <q-item-section class="text-bold">
           Formação Academica
          </q-item-section>
        </template>

        <q-card>
          <q-card-section>
           {{candidate.school }}
          </q-card-section>
        </q-card>
      </q-expansion-item>


        <q-separator />

      <q-expansion-item  class="q-pa-sm ">
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon color="cyan-6" name="work" />
          </q-item-section>

          
          <q-item-section class="text-bold text-capitalize " >
           áreas de trabalho
          </q-item-section>
        </template>
 
        <q-card>
          <q-card-section class="no-wrap"  v-for="(i,index) in candidate.professions" :key="i">
              {{ i | professionals(positions,index) }}  </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>



</q-page>
</template>


<script>
 import { date } from 'quasar'
        import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  // name: 'ComponentName',

   props: ['candidate','selected'],

   computed:{
 ...mapState('position', [
                'positions'
            ]),

},

  data () {
    return {
        img: 'statics/img/people/moca-curso.jpg',
         icon: false,
         
    }
  }
,

 methods: {
    showNotif () {
      this.$q.notify({
        message: 'Poderá marcar entevista em breve ',
        caption: 'Lamentamos',
        color: 'cyan-6'
      })
    }
  }
,

 filters: {
        dateFormated (val) {
                        let date1 = Date.now()
                        let unit = 'years'
                        let diff = date.getDateDiff(date1, val, unit)
                        if(diff>0) {
                            return diff + ' anos de idade'
                        }
                        else{
                            return  'Idade Desconhecida'
                        }

            },
      professionals(val,arg,i){          
          return     i > 0  ?   ' & ' +  arg[val].label   : arg[val].label 
      }

}

}
</script>
