<template>
  <div class="q-pa-md q-gutter-y-md">
    <div class="row q-pa-md justify-center">
      <div class="col-8 q-gutter-y-md">
        <div class="text-h4">
          O que considerar quando pretende contratar uma empregada doméstica interna?
        </div>
        <div class="text-justify text-body1">
          Recorrer a empregadas domésticas internas é a melhor solução para muitos casos, nomeadamente quando é necessário apoio a crianças (serviço de babysitting) ou idosos frequentemente. No entanto, muitas vezes, colocam-se questões relacionadas com a confiança e com as referências de quem vai passar a fazer quase parte da família.
        </div>
      </div>
      <div class="col-2">
        <q-btn color="primary" rounded label="Contratar Empregada" size="lg" />
      </div>
    </div>

    <!-- card1 -->
    <div class="row justify-center">
      <div class="col-3 q-pa-md" v-for="i in 3" :key="i">
        <q-card class="my-card">

          <q-img src="https://www.domesticalegal.com.br/wp-content/uploads/2017/03/post-blog-6.jpg" spinner-color="white" />
          
          <q-card-section class="text-center">
            <div class="text-h5">
              Algum texto
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-10 q-pa-md" v-for="i in 3" :key="i">
        <q-card class="my-card" v-if="i == 1">
          <q-carousel
            v-model="slide"
            transition-prev="scale"
            transition-next="scale"
            swipeable
            animated
            control-color="white"
            navigation
            padding
            arrows
            height="300px"
            class="bg-primary text-white shadow-1 rounded-borders"
          >
            <q-carousel-slide name="style" class="column no-wrap flex-center">
              <q-icon name="style" size="56px" />
              <div class="q-mt-md text-center">
                {{ lorem }}
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="tv" class="column no-wrap flex-center">
              <q-icon name="live_tv" size="56px" />
              <div class="q-mt-md text-center">
                {{ lorem }}
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="layers" class="column no-wrap flex-center">
              <q-icon name="layers" size="56px" />
              <div class="q-mt-md text-center">
                {{ lorem }}
              </div>
            </q-carousel-slide>
            <q-carousel-slide name="map" class="column no-wrap flex-center">
              <q-icon name="terrain" size="56px" />
              <div class="q-mt-md text-center">
                {{ lorem }}
              </div>
            </q-carousel-slide>
          </q-carousel>
        </q-card>
        <q-card v-else class="my-card">
          <q-card-section>
          <div class="text-h5">
            Algum titulo
          </div>
          </q-card-section>
          <q-card-section class="text-justify">
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- <div class="row justify-center">
      <div class="col-5 q-pa-md" v-for="i in 2" :key="i">
        <q-card class="my-card">
          <q-card-section>
          test card
          </q-card-section>
        </q-card>
      </div>
    </div> -->

    <div class="row justify-center">
      <div class="col-10 q-pa-md" >
         <q-btn rounded color="primary" class="full-width" label="Contrata empregada residencial agora" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam ipsum magnam, quam aspernatur labore excepturi eveniet voluptatum ducimus temporibus et odit cupiditate. Quia at vel facilis omnis pariatur nobis tenetur?',
      slide: 'style',
    }
  }
}
</script>
