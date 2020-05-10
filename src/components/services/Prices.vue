<template>
  <div class="q-pa-md q-gutter-y-md">
    <div class="row justify-center">
      <div class="text-h5 text-blue-14 row justify-center">
      Preços
        </div>

    </div>


      

     <div class="row justify-center">
      <div class=" col-xs-12 col-md-3 q-pa-md"  v-for="i in 3" :key="i">
      <q-card class="my-card col-3" >
        <q-card-section class="text-center">
          <q-icon name="style"  size="100px"/>
        </q-card-section>
        <q-card-section class="text-center">
          <div v-if="i == 1" class="text-h6">Básico</div>
          <div v-else-if="i == 2" class="text-h6">Home</div>
          <div v-else class="text-h6">Empresarial</div>
        </q-card-section>
        <q-card-section class="text-justify" style="padding: 0;">
          <q-list separator>
            <q-item clickable v-ripple class="text-green">
              <q-item-section avatar>
                <q-icon name="done_all" />
              </q-item-section>
              <q-item-section>Single line item</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="text-red">
              <q-item-section avatar>
                <q-icon name="close" />
              </q-item-section>
              <q-item-section>Single line item</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section class="text-center text-h5 bg-blue-4 text-grey-2">
          200 000 00 Mt
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
      lorem: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat ipsam ducimus nihil iusto dolore distinctio.'
    }
  }
}
</script>
