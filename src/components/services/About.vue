<template>



  <div class="q-pa-md">


     <div class="row justify-center q-pl-sm-xl q-pr-sm-xl">
      <div class="col-xs-10 col-md-7 q-gutter-y-md">
        <div class="text-h5 text-blue-14 row justify-center">
      Cliente em primeiro
        </div>
        
        <div class="text-justify text-black">
          A Agência Nor recruta, seleciona, dá formação e disponibiliza empregadas domésticas em regime de part-time ou full-time. Fornecemos um serviço personalizado desde o recrutamento até à colocação e acompanhamento, garantindo assim a qualidade dos nossos serviços. As nossas candidatas são profissionais em situação legal e com referências ou experiência comprovada no serviço doméstico. Prestamos assessoria jurídica na contratação.
        </div>
      </div>
    </div>



     <div class="row justify-center">
      <div class=" col-xs-12 col-md-3 q-pa-md"  v-for="i in imagens" :key="i.img">
      <q-card class="my-card col-3">
        <q-card-section class="text-center">
      <q-img
        :src="i.img"
        basic
      >
      <div class="absolute-bottom text-subtitle2 text-center">
       <div class="text-h6">{{i.texto}}</div>
         
        </div>
      </q-img>
        </q-card-section>

        <q-card-section class="text-justify">
        </q-card-section>
      </q-card>
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
        {img:   'statics/img/pages/satisfaca.png'  , texto: ' Satisfação'},
        {img:   'statics/img/pages/Esforços.png',  texto: ' Qualidade'},
        {img:   'statics/img/pages/Trabalho-domestico.png',  texto: 'Personalização'},

      ]
   
    }
  }
}
</script>
