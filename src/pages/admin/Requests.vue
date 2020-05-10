<template>
  <q-page padding class="flex justify-left q-pt-xl  q-pl-xl">


        <q-card
      class="my-card absolute-center q-pa-xl  "
      style="min-width: 350px; max-width: 350px ; min-height: 200px;  max-height: 200px;"
      v-if="Object.keys(requests).length === 0"
    >
      <q-card-section class="text-center">
          <q-icon name="pan_tool"  size="25px"/>
      </q-card-section>


    <div class=" text-h5" >
         
          <div class="text-h5 text-center"> 
            Sem Pedidos
          </div>
    </div>
    </q-card>


    <div v-for="(request,id) in requests" :key="id">

      <q-card class="my-card q-ma-sm" flat bordered style="min-width: 350px; max-width: 350px ; min-height: 200px;  max-height: 200px;" >
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{request.name}}</q-item-label>
          <q-item-label caption>
          {{request.phone}}
          </q-item-label>
        </q-item-section>
        

         <q-card-actions vertical class=" ">
           <q-btn flat round color="red" icon="delete" @click="remove(id)" />

        </q-card-actions>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
     

        <q-separator vertical />
        <q-card-section class="col">

          {{request.message}}
        </q-card-section>
      </q-card-section>
    </q-card>
    </div>
  </q-page>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
      computed: {
          ...mapState('request', ['requests'])
      },
    mounted () {
        this.setActualPageTitle('Pedidos')

      

    },
    methods: {
        ...mapActions('settings', [
            'setActualPageTitle'
        ]),

         ...mapActions('request', [
            'deleteSubscriber'
        ])
            ,
        remove(id){

            this.$q.dialog({
        title: 'Confirmação',
        message: 'Quer remover este pedido?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
             this.deleteSubscriber(id)
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })

       

        }
        
    }

  }
</script>
