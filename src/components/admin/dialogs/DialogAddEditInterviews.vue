<template>
    <q-dialog
        v-model="toggleDialog"
        position="top"
        @show="initData()"
        @hide="$emit('closeDialog')"
    >
        <q-card style="width: 30vw;">
            <q-card-section class="row items-center">
                <div class="text-h6">Agendar entrevista <q-icon name="access_time"/></div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section>

                <q-form
                    @submit="onSubmit"
                    @reset="onReset"
                    class="q-gutter-md"
                >
                      <q-select
                        outlined
                        v-model="saveObject.vacancyId"
                        :options="opcao"
                        label="Vaga"
                        color="teal"
                        use-input
                        emit-value
                        map-options
                        input-debounce="0"
                        clearable
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
                      </q-select>

                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <q-input
                                outlined
                                label="Data da entrevista"
                                v-model="saveObject.date"
                                mask="date"
                                lazy-rules
                                :rules="['date']"
                            >
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                            <q-date
                                                v-model="saveObject.date"
                                                @input="() => $refs.qDateProxy.hide()"
                                                mask="YYYY-MM-DD HH:mm"
                                            />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>

                        </div>
                        <div class="col-xs-12 col-md-6 q-pl-md-md">
                            <q-input
                                outlined
                                v-model="saveObject.time"
                                label="Hora"
                            >
                                <template v-slot:append>
                                    <q-icon name="access_time" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="saveObject.time" mask="HH:mm" format24h />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>

                        </div>
                    </div>

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

                    <div style="height: 100px"></div>

                    <div class="row">
                        <q-btn
                            rounded
                            label="Agendar"
                            type="submit"
                            color="primary"
                            class="col-8"
                            :loading="loading"
                        />
                        <!--<q-btn rounded label="Resetar" type="reset" color="primary" flat class="col-4" />-->
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>

    import { mapActions, mapState } from 'vuex'
    export default {
        name: "DialogAddEditInterviews",
        props: ['dialogInterviews', 'interviewToEdit', 'preStart'],
        data () {
            return {
                saveObject: {},
                options: [],
                opcao: []
            }
        },
        computed: {

            ...mapState ('auth', ['userAuth']),
            ...mapState ('customer', ['customers']),
            ...mapState ('vacancy',['vacancies']),
            ...mapState ('interview',['loading']),


            toggleDialog : {
                get () {
                    return this.dialogInterviews
                },
                set (val) {
                    this.$emit('closeDialog')
                }
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
            },

            objectVacancy () {
                let arrays = []

                Object.keys(this.vacancies).forEach(id => {
                    arrays.push({
                        label:      this.vacancies[id].title,
                        value:      id,
                        disable:    false,
                        description: '',
                        icon:       ""
                    })
                })
                return arrays
            }

        },
        mounted () {

            this.options = this.objectOptions
            this.opcao = this.objectVacancy
        },
        methods: {

            ...mapActions ('interview', ['addInterview', 'updateInterview']),
            ...mapActions('position', ['listenPositionRealTimeChanges']),
            ...mapActions('customer', ['listenCustomerRealTimeChanges']),

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
            showMessage () {
                alert('Por favor, aguarde, ainda estamos a trabalhar para que seja possível carregar a imagem do perfil.')
            },
            initData () {

                this.listenCustomerRealTimeChanges()
                this.listenPositionRealTimeChanges()

                if (this.interviewToEdit && this.interviewToEdit.id) {

                    this.saveObject = this.interviewToEdit

                } else {
                    this.initialize ()
                }

                if (this.preStart) {
                    this.saveObject.vacancyId = this.preStart.vacancyId
                    this.saveObject.customerId = this.preStart.customerId
                }
            },
            initialize () {
                this.saveObject = {
                    vacancyId: '',
                    customerId: '',
                    date: '',
                    time: '',
                    invitedCandidates: []
                }
            },
            onSubmit () {

                this.saveObject.createdBy = this.userAuth.uid
                if (this.interviewToEdit && this.interviewToEdit.id) {

                    let id = this.interviewToEdit.id
                    delete this.saveObject.id

                    this.updateInterview({
                        id: id,
                        updates: this.saveObject,
                        successMessage: 'Entrevista actualizada com sucesso!'
                    }) //actualizando o existente

                } else {
                    this.addInterview(this.saveObject) //adicionando um novo registo
                }


            },

            onReset () {
                this.initialize ()
            }

        },
        watch: {
            loading (val) {
                if (!val && this.saveObject.date) {
                    this.$emit('closeDialog')
                }
            }
        }

    }
</script>

<style scoped>

</style>