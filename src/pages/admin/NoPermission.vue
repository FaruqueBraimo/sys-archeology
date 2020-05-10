<template>
  <q-page padding>
    <div>

      <h5 class="text-negative">Sem permissão!!</h5>
      <p>Aguarde até que seja dado permissão. Ou entre em contacto conosco pelo: </p>

      <div class="col-12 col-md-3 q-gutter-md q-pa-md">
        <div class="text-h4">Contact Us</div>
        <q-separator dark />
        <div>
          Nº 185, Jose Mateus, Polana Cimento A, Maputo Mozambique
        </div>
        <div>
          <q-icon name="phone" size="sm" />
          +258 21 498 182
        </div>
        <div>
          <q-icon name="public" size="sm" />
          www.norbconsulting.com
        </div>
        <div>
          <q-icon name="mail" size="sm" />
          info@norbconsulting.com
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  export default {
      computed: {
          ...mapState('auth', ['users', 'userAuth'])
      },
    mounted () {
        this.setActualPageTitle('Norb Admin')

        let user = this.users[this.userAuth.uid]

        setTimeout(()=> {
            if (user && user.role && (user.role === 'Administrador' || user.role === 'Editor')) {
                this.$router.push('/admin')
            }
        }, 5000)

    },
    methods: {
        ...mapActions('settings', [
            'setActualPageTitle'
        ])
    }
  }
</script>
