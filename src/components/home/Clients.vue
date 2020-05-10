<template>
  <div>
    <div class="bg-cyan-6 text-white q-pa-xl q-gutter-y-md">
      <div class="text-h4 text-center">Clientes</div>
 
      <div class="row justify-center">
          <div class="col-xs-12 col-sm-6 col-md-2  q-pa-md" v-for="(item, index) in imagens" :key="index" >
           <q-card class="my-card">
                <img :src="item.cliente">
            </q-card>
          </div>
        </div>
     
     
    </div>
</div>

</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      imagens: [
        {cliente:   'statics/img/customers/cliente1.jpg'},
        {cliente:   'statics/img/customers/cliente2.png'},
        {cliente:   'statics/img/customers/cliente3.png'},
        {cliente:   'statics/img/customers/cliente4.jpg'},
        {cliente:   'statics/img/customers/cliente5.png'},

      ]
        
    }
  }

}
</script>
