<template>
  <div>
    <q-carousel
      class="text-white"
      animated
      v-model="slide"
    
      navigation
      infinite
      style="height: 35vh;"
    >
      <q-carousel-slide :name="1" :img-src="img" />
      <q-carousel-slide :name="2" :img-src="img2">
        <!-- <div class="absolute-center custom-caption text-center">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div> -->
      </q-carousel-slide>
      <q-carousel-slide :name="3" :img-src="img3" />
      <q-carousel-slide :name="4" :img-src="img4" />
    </q-carousel>
  </div>
</template>

<script>
export default {
props : ['link'],
  data () {
    return {
      slide: 1,
      img: this.link,
      img2: this.link,
      img3: this.link,
      img4: this.link,

   
    }
  }
}
</script>