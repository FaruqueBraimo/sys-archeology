<template>
  <div>
    <div class="row justify-center q-pl-sm-xl q-pr-sm-xl">
      <div class="col-xs-10 col-md-7 q-gutter-y-md">
        <div class="text-h4 text-blue-14">
          AGENCIA NOR
        </div>
        <div class="text-justify text-black">
          A Agência Nor recruta, seleciona, dá formação e disponibiliza empregadas domésticas em regime de part-time ou full-time. Fornecemos um serviço personalizado desde o recrutamento até à colocação e acompanhamento, garantindo assim a qualidade dos nossos serviços. As nossas candidatas são profissionais em situação legal e com referências ou experiência comprovada no serviço doméstico. Prestamos assessoria jurídica na contratação.
        </div>
        <div class="text-left row q-mt-xl">
          <div class="q-pr-md col-xs-12 col-sm-4 q-pt-xs-sm">
            <q-btn class="full-width"  @click="$router.push('/about')" color="cyan-6" :size="$q.screen.lg ? 'md' : 'sm'" rounded text-color="white" label="Saiba Mais" />
          </div>
          <div class="q-pr-md col-xs-12 col-sm-4 q-pt-xs-sm">
            <q-btn class="full-width" @click="$router.push('/vagas')"   color="cyan-6" :size="$q.screen.lg ? 'md' : 'sm'" rounded text-color="white" label="Procura emprego" />
          </div>
          <div class="q-pr-md col-xs-12 col-sm-4  q-pt-xs-sm">
            <q-btn class="full-width"   color="cyan-6" :size="$q.screen.lg ? 'md' : 'sm'" rounded text-color="white" label="Procurar profissionais" to="/Professionals" />
          </div>
        </div>
      </div>
      <div class="col-md-3 q-py-xs-xl row q-gutter-x-md justify-end">
        <img
          src="statics/img/pages/Boneco.png"
          spinner-color="white"
          style="height: 50vh;"
        />
      </div>
    </div>
    <!-- comp 3 -->
    <div class="row justify-center">
      <div class=" col-xs-12 col-md-3 q-pa-md" v-for="(a, i) in about" :key="i">
        <q-card
          dark
          bordered
          class="bg-orange my-card"
        >
          <q-card-section class="text-center">
            <q-icon :name="a.icon" size="80px" />
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-h6">{{a.desc}}</div>
          </q-card-section>

          <q-separator dark inset />

          <q-card-section class="text-justify">
            {{a.text}}
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
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      about: [
        {desc: 'SELEÇÃO PERSONALIZADA', icon: 'group', text: 'Selecionamos candidatas de acordo com as suas preferências.'},
        {desc: 'RAPIDEZ', icon: 'directions_run', text: 'Garantimos até cinco opções para si em 48 horas.'},
        {desc: 'AUTONOMIA', icon: 'watch_later', text: 'O cliente entrevista e escolhe o/a candidata/o na nossa plataforma.'}
      ]
    }
  }
}
</script>
