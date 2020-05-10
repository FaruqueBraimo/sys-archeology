<template>
    <q-btn
        flat
        round
        dense
        icon="menu"
    >
        <q-menu>
            <q-list style="min-width: 250px">
                <q-item
                    v-for="(tab, i) in tabs"
                    :to="tab.to"
                    exact
                    :key="i"
                    clickable v-close-popup
                >
                    <q-item-section>{{ tab.label }}</q-item-section>
                </q-item>
                <template v-if="userAuth">
                    <q-item
                        to="/admin"
                        exact
                        clickable v-close-popup
                    >
                        <q-item-section>Admin</q-item-section>
                    </q-item>
                    <q-item
                        @click="logOut"
                        exact
                        clickable v-close-popup
                    >
                        <q-item-section>Sair</q-item-section>
                    </q-item>
                </template>

                <q-item
                    v-else
                    to="/auth/login"
                    exact
                    clickable v-close-popup
                >
                    <q-item-section>Entrar</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "MobileMenuOptionComponent",
        props: ['tabs', 'userAuth'],
        methods: {
            logOut () {

                this.$q.dialog({
                    title: 'Terminar a sessão',
                    message: 'A sua sessão será terminada confirma?',
                    cancel: true,
                    persistent: true,
                    color: ''
                }).onOk(() => {
                    this.$emit('logoutUser')
                })

            }
        }
    }
</script>

<style scoped>

</style>