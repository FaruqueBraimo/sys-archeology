<template>
  <div class="">

<div v-if="$q.platform.is.mobile">



 <Categoria      
       @age ="age = $event"
       @search='search=$event'
 
       @selecionados="selecionados = $event"

      />
      
    

 <Profissionais
      
       :selecionados="selecionados"
      :age ="age"
      :search ='search'
      
      />

</div>


<div class="row"  v-if="$q.platform.is.desktop">
      <div class="col-3 "  >
      <Categoria
       @age ="age = $event"
              @search='search=$event'


       @selecionados="selecionados = $event"

      />
      </div>
      <div class="col-9 q-pl-md" >     
      <Profissionais
      
       :selecionados="selecionados"
      :age ="age"
            :search ='search'

      />
      </div>
      
    </div>
<div v-if="$q.platform.is.mobile">
<q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="tamanho > 0"   >
            <q-fab
              icon="meeting_room"
              direction="up"
              color="positive"
              @click="$router.push('/selecionadosItrevistas')"
              
            >
              
            </q-fab>
          </q-page-sticky>
</div>
    
      
  </div>

</template>

<script>
import Categoria from  "components/professionals/categorias/Categoria.vue"
import mixin from '../../mixins/mixin.js'

import Profissionais from  "components/professionals/categorias/Profissionais.vue"

const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }

]

export default {
  // name: 'ComponentName',
 mixins: [mixin],

  components:{
   Categoria,
   Profissionais
      },
      data () {
        return {
           drawer: false,
          miniState: false,
          selecionados : '',
          age : '' ,
          search: ''
         

        }
    },



  }
</script>
