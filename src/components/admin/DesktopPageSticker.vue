<template>
    <q-page-sticky expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
            <q-btn
                round
                flat
                :color="btnColor('admin')"
                stack
                no-caps
                size="26px"
                class="GPL__side-btn"
                to="/admin"
            >
                <q-icon size="22px" name="home" />
                <div class="GPL__side-btn__label">Inicio</div>
            </q-btn>

            <template >

                <q-btn round flat :color="btnColor('candidates')" stack no-caps size="26px" class="GPL__side-btn" to="/admin/candidates">
                    <q-icon size="22px" name="group" />
                    <div class="GPL__side-btn__label">Arqueologos</div>
                </q-btn>

                <q-btn round flat :color="btnColor('licencas')" stack no-caps size="26px" class="GPL__side-btn" to="/admin/licencas">
                    <q-icon size="22px" name="receipt" />
                    <div class="GPL__side-btn__label">Licenças</div>
                  
                </q-btn>
               

                <q-btn round flat :color="btnColor('relatorios')" stack no-caps size="26px" class="GPL__side-btn" to="/admin/relatorios">
                    <q-icon size="22px" name="assessment" />
                    <div class="GPL__side-btn__label">Relatorios</div>
                </q-btn>

                 <q-btn round flat :color="btnColor('interviews')" stack no-caps size="26px" class="GPL__side-btn" to="/admin/interviews">
                    <q-icon size="22px" name="account_circle" />
                    <div class="GPL__side-btn__label">Minha Conta</div>
                </q-btn>

            </template>

        </div>
    </q-page-sticky>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "DesktopPageSticker",
        computed: {
            ...mapState('auth', ['users', 'userAuth']),

            routePath () { return this.$route.fullPath},

            user () {
                return this.users[this.userAuth.uid]
            },

            isEditor () {
                return this.users && this.userAuth.uid && this.user && this.user.role === 'Editor'
            }
        },
        methods : {
            btnColor (text) {
                return this.routePath.toString().endsWith(text) ? 'primary' : 'grey-8'
            }
        },

    }
</script>

<style scoped>

</style>