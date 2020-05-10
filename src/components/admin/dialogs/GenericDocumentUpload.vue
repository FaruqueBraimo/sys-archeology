<template>
    <q-dialog v-model="toggleDialog" position="top" @hide="$emit('closeForm')">
        <q-card>
            <q-toolbar>
                <q-avatar>
                    <img :src="getImage">
                </q-avatar>

                <q-toolbar-title v-if="object.headerTitle">{{ object.headerTitle }}</q-toolbar-title>
                <q-toolbar-title v-else><span class="text-weight-bold">Upload</span> imagem do(a) {{ getName }}</q-toolbar-title>

                <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>

            <q-card-section style="max-height: 50vh;width: 100%" class="scroll">

                <div class="q-pa-md">

                    <q-form
                        @submit="onSubmit"
                        class="q-gutter-md"
                    >
                        <div class="row">
                            <q-uploader
                                :url="onSubmit"
                                accept="application/pdf"
                                style="width: 100%"
                                :label="object.label"
                            />
                        </div>

                        <div class="q-gutter-xs">
                            <!--<q-btn label="Gravar" type="submit" color="primary"/>-->
                            <q-btn
                                label="Fechar"
                                @click="$emit('closeForm')"
                                color="orange"
                                :loading="uploadProgress > 0"
                            />

                        </div>
                    </q-form>

                </div>

            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "GenericDocumentUpload",
        props: ['object', 'toChangeDocument', 'uploadProgress'],
        data () {
            return {
                toggleDialog: false
            }
        },
        methods: {
            ...mapActions ('customer', [
                'storeCustomerPhoto'
            ]),

            onSubmit (file) {

                this.$emit(this.object.action, file)

            },
        },
        computed: {
            getName () {
                return this.toChangeDocument ? this.toChangeDocument.name : ''
            },
            getImage () {
                return this.toChangeDocument && this.toChangeDocument.image ? this.toChangeDocument.image : '/statics/icons/icon-128x128.png'
            },
        },
        watch: {
            toChangeDocument (val) {
                this.toggleDialog = !!val
            }
        }
    }
</script>

<style scoped>

</style>