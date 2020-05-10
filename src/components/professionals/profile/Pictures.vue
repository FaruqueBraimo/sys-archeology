<template>
  <div class="q-pa-xl">
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <div class="col-4 q-pa-sm" v-for="i in 6" :key="i">
            <q-img src="https://pbs.twimg.com/media/DZ_u9E5W0AEEr-x.jpg" spinner-color="white"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
    
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>
