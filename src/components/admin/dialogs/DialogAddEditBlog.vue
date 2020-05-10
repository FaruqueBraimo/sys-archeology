<template>
    <q-dialog
        v-model="toggleDialog"
        @show="onShowDialog"
        persistent
    >
        <q-card style="width: 80vw;">
            <q-card-section class="row items-center">
                <div class="text-h6">Artigo</div>
                <q-space />
                <q-btn
                    icon="close"
                    flat
                    round
                    dense
                    @click="$emit('closeDialog')"
                />
            </q-card-section>
            <q-card-section>
                <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                >
                    <div class="row">
                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.title"
                                label="Titulo do Post *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                            />
                        </div>
                       
                    </div>


                    <p class="text-h6">Corpo</p>
                    <q-editor
                        v-model="saveObject.body"
                        :definitions="{
                            bold: {
                                label: 'Bold', icon: null, tip: 'Boldar o texto'}
                            }"
                            :toolbar="[
                                ['bold', 'italic', 'strike', 'underline'],
                                [ 'left', 'center', 'right', 'justify'] ,['upload']
                            ]"
                        />

                    <div class="row" style="height: 150px">
                        <div class="col-12">
                            <q-input
                                    filled
                                    v-model="saveObject.resume"
                                    label="Resumo:"
                                    hint="Um texto para dar uma visão geral do artigo"
                                    lazy-rules
                                    :rules="[ val => val && val.length > 0 || 'Coloque um pequeno resumo']"
                            />
                        </div>

                    </div>


                    <div class="row">
                        <q-btn
                            :label="selectedId ? 'Actualizar' : 'Adicionar no rascunho'"
                            type="submit"
                            color="primary"
                            icon="access_time"
                            class="full-width"
                        />

                    </div>
                    
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: "DialogAddEditBlog",
        props: ['dialogPost', 'editObjectPost'],
        data () {
            return {
                saveObject: {},
                model: [],
            }
        },
        computed: {
            toggleDialog : {
                get () {
                    return this.dialogPost
                },
                set (val) {
                    this.$emit('closeDialog')
                }
            },
            selectedId () {
                return this.editObjectPost ? this.editObjectPost.id : null
            },
        },
        mounted () {

            this.initialize ()

        },
        methods: {


            ...mapActions('post', [
                'addPost',
                'updatePost'
            ]),

            initialize () {
                this.saveObject = {
                    title: '',
                    category: '',
                    body: '',
                    resume: '',
                }
            },
            onSubmit () {

                if (this.selectedId) {

                    delete this.saveObject.id //deletando Id

                    this.updatePost ({
                        id: this.selectedId,
                        updates: this.saveObject
                    })

                } else {

                    this.addPost(this.saveObject)

                }

                this.$emit('closeDialog')

            },

            onShowDialog () {
                if (this.editObjectPost) {
                    this.saveObject = this.editObjectPost
                } else {
                    this.initialize ()
                }


            },

            onReset () {
                this.initialize ()
            }

        }

    }
</script>

<style scoped>

</style>