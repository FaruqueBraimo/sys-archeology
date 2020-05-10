<template>
    <q-dialog
        v-model="toggleDialog"
        @show="onShowDialog"
    >
        <q-card style="width: 80vw;">
            <q-card-section class="row items-center">
                <div class="text-h6">Curso</div>
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
                    <q-select
                        label="Área do curso"
                        transition-show="scale"
                        transition-hide="scale"
                        filled
                        emit-value
                        map-options
                        v-model="saveObject.areaId"
                        :options="options"
                    />

                    <div class="row">
                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.name"
                                label="Nome do curso *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                            />
                        </div>
                       
                    </div>

                     <div class="row">
                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.description"
                                label="Descrição *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                            />
                        </div>
                       
                    </div>


                     <div class="row">
                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.requirements"
                                label="Requisitos "
                               
                            />
                        </div>
                       
                    </div>

                    <div class="row" style="height: 130px">
                        <div class="col-6 q-pr-xs">
                            <q-input
                                v-model.number="saveObject.price"
                                type="number"
                                filled
                                label="Preço"
                            />
                        </div>
                        <div class="col-6 q-pl-xs">
                            <q-input
                                v-model.number="saveObject.duration"
                                type="number"
                                filled
                                label="Duração"
                            />
                        </div>

                         <div class="col-12">
                        <q-input outlined  v-model="saveObject.beginAt" label="Data  de realização :">
                            <template v-slot:append>
                                <q-btn icon="event" round color="primary">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-date v-model="saveObject.beginAt" mask="YYYY-MM-DD">
                                        </q-date>
                                    </q-popup-proxy>
                                </q-btn>
                            </template>
                        </q-input>

                    </div>

                    </div>

                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.location"
                                label="Local do curso "
                            />
                        </div>
                    

                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.plan"
                                label="Plano do curso "
                            />
                        </div>


                    <div class="row">
                        <q-btn
                            :label="selectedId ? 'Actualizar' : 'Adicionar no rascunho'"
                            type="submit"
                            size="lg"
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
        name: "DialogAddEditCourses",
        props: ['dialogCourse', 'editObjectCourse'],
        data () {
            return {
                saveObject: {},
                model: [],
                hide: false
            }
        },
        computed: {
            ...mapState('area', ['areas']),
            toggleDialog : {
                get () {
                    return this.dialogCourse
                },
                set (val) {
                    this.$emit('closeDialog')
                }
            },
            selectedId () {
                return this.editObjectCourse ? this.editObjectCourse.id : null
            },
            options () {
                let arrays = []

                Object.keys(this.areas).forEach(id => {
                    arrays.push({
                        label:      this.areas[id].title,
                        value:      id,
                    })
                })
                return arrays
            }
        },
        mounted () {

            this.initialize ()

        },
        methods: {


            ...mapActions('course', [
                'addCourse',
                'updateCourse'
            ]),

            initialize () {
                this.saveObject = {
                    name: '',
                    requirements: '',
                    description: '',
                    benefits: '',
                    duration : '',
                    location : '',
                    plan : '',
                    price : '',
                    areaId : '',
                }
            },
            onSubmit () {

                if (this.selectedId) {

                    delete this.saveObject.id //deletando Id

                    this.updateCourse ({
                        id: this.selectedId,
                        updates: this.saveObject
                    })

                } else {

                    this.addCourse(this.saveObject)

                }

                this.$emit('closeDialog')

            },

            onShowDialog () {
                if (this.editObjectCourse) {
                    this.saveObject = this.editObjectCourse
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