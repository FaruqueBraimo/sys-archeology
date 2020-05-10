<template>
    <q-tabs shrink>
        <q-route-tab
            :label="tab.label"
            :to="tab.to"
            v-for="(tab, i) in tabs"
            :key="i"
            exact
            
        />
        <q-route-tab
            v-if="!userAuth"
            label="Entrar"
            to="/auth/login"
            exact
        />
        <q-btn
            v-else
            label="User"
            flat
        >
            <q-menu>
                <q-list style="min-width: 100px">
                    <q-item to="/admin" clickable v-close-popup>
                        <q-item-section>Admin</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item @click="logOut" clickable v-close-popup>
                        <q-item-section>Sair</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
    </q-tabs>
</template>

<script>

    export default {
        name: "DesktopMenuOptionComponent",
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