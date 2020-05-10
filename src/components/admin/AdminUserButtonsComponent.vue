<template>
    <div class=" row no-wrap ">


        <q-btn
           
            class="q-ma-none q-pa-xs"
            exact
            rounded
            flat
          
            icon="exit_to_app"
            label="Sair"
            @click="confirm"
        />

    
    </div>
</template>

<script>
    export default {
        name: "AdminUserButtonsComponent",
        props: ['isAdmin', 'isEditor'],
        methods: {
            confirm () {
                this.$q.dialog({
                    title: 'Confirme',
                    message: 'Deseja sair do sistema?',
                    ok: 'Sim',
                    cancel: true,
                    cancel:'Não',
                    persistent: true
                }).onOk(() => {
                    this.$router.push('/')
                })
            },

        }
    }
</script>

<style scoped>

</style>