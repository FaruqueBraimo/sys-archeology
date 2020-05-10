<template>
  <q-page padding class="flex justify-left q-pt-xl  q-pl-xl">



      
      <reportComponent
      v-for='i in 20'
      :key='i'
      class='q-pa-lg'
      
      />

      <q-page-sticky position="bottom-right q-pr-xl" :offset="[17, 17]">
            <q-btn unelevated size='xl'  class ='q-pa-sm' fab icon="add" color="primary" />
          </q-page-sticky>

   
  
  </q-page>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
    import  reportComponent from "../../components/admin/reports/reportComponent";



  export default {
      components: {
reportComponent
      },
    mounted () {
        this.setActualPageTitle('Relatorios dos Arqueologos')

      

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
