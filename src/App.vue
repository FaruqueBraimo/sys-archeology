<template>
   <div id="q-app" class="text-grey-9">
    <router-view  v-if="!$q.platform.is.mobile">

    </router-view>

<div class = 'q-pa-sm'   v-else> 
    <q-card
      class="my-card"
      
    >
      <q-card-section class="text-center">
          <q-icon name="desktop_access_disabled"  size="50px"/>
      </q-card-section>


    <div class=" text-body " >
              Haa..Eu te disse que pra não entrar com telefone!!!
          <div class="text-subtitle1 text-center"> 
           Soh com Computador bay...
          </div>
    </div>
    </q-card>
  </div>
  
</div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'App',
    created () {
        this.handleAuthStateChange ()
        this.listenCandidateRealTimeChanges()
        this.listenlicenseRealTimeChanges()
        this.listenreportRealTimeChanges()
      
    },
      methods: {
          ...mapActions('auth', [
              'handleAuthStateChange',
              'listenUsersRealTimeChanges',
          ]),

            ...mapActions('candidate', [
              'listenCandidateRealTimeChanges',
          ]),

           ...mapActions('report', [
              'listenreportRealTimeChanges',
          ]),

 ...mapActions('license', [
              'listenlicenseRealTimeChanges',
          ]),
         
      }
      ,
      beforeDestroy () {
          this.$q.loading.hide()
      }

 
  }
</script>
