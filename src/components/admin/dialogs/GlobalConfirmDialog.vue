<template>
    <q-dialog v-model="showDialog">
        <q-card>
            <q-card-section class="row items-center">
                <!--<q-avatar icon="signal_wifi_off" color="primary" text-color="white" />-->
                <span class="q-ml-sm">Deseja tornar administrador o <b>Nome</b>?</span>

            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                    flat
                    label="Não"
                    color="primary"
                    v-close-popup
                    @click="$emit('closeDialog')"
                />
                <q-btn
                    flat
                    label="Sim."
                    color="primary"
                    v-close-popup
                    @click="$emit('closeDialog')"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: "GlobalConfirmDialog",
        props: ['confirm'],
        data () {
            return {
                showDialog: false
            }
        },
        computed: {
            ...mapState('settings', ['globalConfirm']),


        },
        methods: {
            ...mapActions('settings', ['setGlobalConfirm']),

            // cancel () {
            //     let finalObject = this.setGlobalConfirm
            // }
        },
        watch: {
          confirm (val) {
                this.showDialog = !!val
            console.log("o " + val)
            }
        }
    }
</script>

<style scoped>

</style>
