<template>
    <!-- <q-carousel
      class="text-white"
      animated
      v-model="slide"
      arrows
      navigation
      
      infinite
    >
      <q-carousel-slide :name="1" :img-src="img">
   
      </q-carousel-slide>
    </q-carousel> -->
   


   <div >
    <q-carousel
      arrows
      animated
      v-model="slide"
      height="400px"
    >
      <q-carousel-slide name="first" img-src="statics/img/pages/Trabalho-domestico.png" v-if="$q.platform.is.mobile">     
      </q-carousel-slide>

         <q-carousel-slide name="first" img-src="statics/img/pages/EmpregadasPerfeitas.png" v-if="$q.platform.is.desktop" >     
      </q-carousel-slide>
         <q-carousel-slide name="second" img-src="statics/img/pages/Nor.png" v-if="$q.platform.is.mobile" >     
      </q-carousel-slide>
         <q-carousel-slide name="third" img-src="statics/img/pages/satisfaca.png" v-if="$q.platform.is.mobile" >     
      </q-carousel-slide>
    </q-carousel>

     <div class="row bg-cyan q-pa-md justify-center">
              <div class="col-xs-12 col-sm-5 q-pa-sm text-white">
                Encontre a funcionária ideial pra si, ao melhor preco e com o melhor horário
              </div>
              <div class="col-xs-12 col-sm-5 row justify-end">
                <q-btn
                  to="/professionals"
                  color="blue-grey"
                  rounded
                  size="sm"
                  text-color="white"
                  label="Procura um funcionario?"
                >
                  <q-icon name="arrow_right" />
                </q-btn>
              </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 'first',
      img: 'statics/img/pages/EmpregadasPerfeitas.png',
      img2: 'http://www.conteto.com.br/blog/wp-content/uploads/2018/02/392808009973012.jpg'   

    }
  }
}
</script>