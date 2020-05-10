<template>
    <q-dialog v-model="toggleDialog"
     @show="onShowDialog"
     @hide="$emit('closeDialog')"
    >
        <q-card style="width: 80vw;">
            <q-card-section class="row items-center">
                <div class="text-h6">Vaga</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="$emit('closeDialog')" />
            </q-card-section>
            <q-card-section>
                <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                >
                    <q-select
                            v-model="saveObject.customerId"
                            :options="options"
                            label="Cliente:"
                            @filter="filterFn"
                            color="teal"
                            use-input
                            emit-value
                            map-options
                            input-debounce="0"
                            clearable
                            outlined
                            options-selected-class="text-deep-orange"
                    >
                        <template v-slot:option="scope">
                            <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                            >
                                <q-item-section avatar>
                                    <q-img :src="scope.opt.icon" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label v-html="scope.opt.label" />
                                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>
                        <template v-slot:append>
                            <q-btn @click="$root.$emit('showRightDrawer', true)" icon="add" round color="primary" />
                        </template>
                    </q-select>

                    <div class="row">
                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.title"
                                label="Título da vaga *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                            />
                        </div>
                    </div>

                    <q-input
                        filled
                        v-model="saveObject.description"
                        label="Descrição da vaga *"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                    />

                    <q-input
                        filled
                        v-model="saveObject.tasks"
                        label="Funções *"
                        type="textarea"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                    />

                    <q-input
                        filled
                        v-model="saveObject.requirements"
                        label="Requisitos"
                        type="textarea"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                    />

                    <div class="col-12">
                        <q-input outlined rounded v-model="saveObject.endAt" label="Data limite:">
                            <template v-slot:append>
                                <q-btn icon="event" round color="primary">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-date v-model="saveObject.endAt" mask="YYYY-MM-DD">
                                        </q-date>
                                    </q-popup-proxy>
                                </q-btn>
                            </template>
                        </q-input>

                    </div>

                    <q-separator class="q-mt-xl"/>

                    <div class="row">
                        <q-btn rounded label="Gravar" type="submit" color="primary" class="col-8"/>
                        <q-btn rounded label="Resetar" type="reset" color="primary" flat class="col-4" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import { date } from 'quasar'
    import { showErrorMessage } from "../../../functions/handle-error-messages";



    export default {
        name: "DialogAddEditVacancy",
        props: ['dialogVocancy','editObjectVacancy'],
        data () {
            return {
                saveObject: {},
                proxyDate:   '',
                options: [],
            }
        },
        computed: {
            ...mapState ('customer', ['customers']),
            toggleDialog : {
                get () {
                    return this.dialogVocancy
                },
                set (val) {
                    this.$emit('closeDialog')
                }
            },

             selectedId () {
                return this.editObjectVacancy ? this.editObjectVacancy.id : null
            },
            objectOptions () {
                let arrays = []

                Object.keys(this.customers).forEach(id => {
                    arrays.push({
                        label:      this.customers[id].name,
                        value:      id,
                        disable:    false,
                        description: '',
                        icon:       this.customers[id].image
                    })
                })
                return arrays
            }
        },
        mounted () {
            this.initialize ()
            this.options = this.objectOptions
        },
        methods: {

            ...mapActions ('vacancy', [
                'addVacancy', 'updateVacancy'
            ]),

            showMessage () {
                alert('Por favor, aguarde, ainda estamos a trabalhar para que seja possível carregar a imagem do perfil.')
            },
            initialize () {
                this.saveObject = {
                    customerId: '',
                    title: '',
                    requirements: '',
                    tasks: '',
                    description: '',
                    endAt: '',
                }
            },
            filterFn (val, update) {
                if (val === '') {
                    update(() => {
                        this.options = this.objectOptions
                    })
                    return
                }

                update(() => {
                    const needle = val.toLowerCase()
                    this.options = this.objectOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
                })
            },
            onSubmit () {

                let timeStamp = Date.now()
                let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
                // 
                if(this.saveObject.endAt < formattedString){
                    
                    showErrorMessage("Data limite  não pode ser inferior a actual")
                }
                else{

                    if (this.selectedId) {

                        delete this.saveObject.id //deletando Id

                        this.updateVacancy ({
                            id: this.selectedId,
                            updates: this.saveObject
                        })

                    } else {

                        this.addVacancy(this.saveObject)

                    }

                    this.$emit('closeDialog')
                }
            },


           onShowDialog () {
                if (this.editObjectVacancy) {
                    this.saveObject = this.editObjectVacancy
                } else {
                    this.initialize ()
                }
            }

                ,

            onReset () {
                this.initialize ()
            }

        }

    }
</script>

<style scoped>

</style>