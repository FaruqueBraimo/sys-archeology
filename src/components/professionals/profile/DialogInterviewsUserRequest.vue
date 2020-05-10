<template>
    <q-dialog
        v-model="toggleDialog"
    >
        <q-card style="width: 80vw;">
            <q-card-section class="row items-center">
                <div class="text-h6">Marcação de Entrevista </div>
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
                 
                    class="q-gutter-md"
                >
                    <div class="row ">
                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.name"
                                label="Nome  *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                            />
                        </div>

                          <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.lastName"
                                label="Apelido *"
                                lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                            />
                        </div>
                       
                    </div>

                     <div class="row">
                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.phone"
                                label="Telefone *"
                                type="phone"
                                 lazy-rules
                                :rules="[ val => val && val.length > 0 || 'Preencha este campo']"
                               
                            />
                        </div>
                       
                    </div>

                     <div class="row">
                        <div class="col-12">
                            <q-input
                                filled
                                v-model="saveObject.email"
                                label="Email *"
                                type="email"
                               
                            />
                        </div>
                       
                    </div>
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


                    <div class="row" >
                        <q-btn
                            type="submit"
                            color="cyan-6"
                            class="full-width"
                            label="Submeter"
                            @click="onSubmit"
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
        name: "DialogAddSubscritonCourses",
        props: ['dialogSubscription', 'id' ,'candidate'],
        data () {
            return {
                saveObject: {

                    professionals: {} 

                },
              
            }
        },
        computed: {
         
            toggleDialog : {
                get () {
                    return this.dialogSubscription 
                },
                set (val) {
                    this.$emit('closeDialog')
                }
            },
            
         
        },
        mounted () {

      

        },
        methods: {

          ...mapActions('interview', [
              'addInterview'
          ]),
            onSubmit () {
                     this.saveObject.professionals = this.candidate;   
                    this.addInterview(this.saveObject)
                    this.$emit('closeDialog')

            },


         

        }

    }
</script>

<style scoped>

</style>