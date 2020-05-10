<template>
  <div id="q-app">
    <router-view />
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
      
    },
      methods: {
          ...mapActions('auth', [
              'handleAuthStateChange',
              'listenUsersRealTimeChanges',
          ]),

            ...mapActions('candidate', [
              'listenCandidateRealTimeChanges',
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
