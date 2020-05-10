<template>
  <div class="q-pa-md">

     <div class="row justify-center q-pl-sm-xl q-pr-sm-xl">
      <div class="col-xs-10 col-md-7 q-gutter-y-md">
        <div class="text-h5 text-blue-14 row justify-center">
      Serviços
        </div>
        
        <div class="text-justify text-black">
          A Agência Nor recruta, seleciona, dá formação e disponibiliza empregadas domésticas em regime de part-time ou full-time. Fornecemos um serviço personalizado desde o recrutamento até à colocação e acompanhamento, garantindo assim a qualidade dos nossos serviços. As nossas candidatas são profissionais em situação legal e com referências ou experiência comprovada no serviço doméstico. Prestamos assessoria jurídica na contratação.
        </div>
      </div>
    </div>

      <div class="row justify-center    offset-md-6">
      <div class=" col-xs-12 col-md-3 q-pa-md  "  v-for="i in services" :key="i.desc">
      <q-card class="my-card" >
          <q-item clickable v-ripple class="q-pa-lg" to="">
            <q-item-section avatar>
              <q-icon name="style" size="50px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6 text-grey-8">{{i.desc}}</q-item-label>
              <q-item-label caption>February 22nd, 2019</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>

            </div>
            <div class="row justify-center    offset-md-6">
      <div class=" col-xs-12 col-md-3 q-pa-md  "   v-for="i in services2" :key="i.descricao">
      <q-card class="my-card" >
          <q-item clickable v-ripple class="q-pa-lg" to="">
            <q-item-section avatar>
              <q-icon name="style" size="50px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6 text-grey-8">{{i.descricao}}</q-item-label>
              <q-item-label caption>February 22nd, 2019</q-item-label>
            </q-item-section>
          </q-item>
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

  services: [
        {desc: 'Terceirização de mão de obra',},
        {desc: 'Marketing promocional'},
        {desc: 'Trabalho temporário'},

      ]

,
      services2: [
        {descricao: 'Protocolos '},
        {descricao: 'Staff para eventos'},
        {descricao: 'Apoio a eventos'},

      ]

    }
  }
}
</script>
