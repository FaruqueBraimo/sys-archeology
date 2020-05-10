<template>
    <q-dialog
        v-model="toggleDialog"
      
    >
        <q-card style="width: 80vw;">
            <q-card-section class="row items-center">
                <div class="text-h6">Subscrição</div>
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
        props: ['dialogSubscription', 'id'],
        data () {
            return {
                saveObject: {

                    courseId: '' 
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

            ...mapActions('subscribedCourse', [
              'addSubcriber',
            ]),
           
            onSubmit () {

                this.saveObject.courseId = this.id;
                this.addSubcriber(this.saveObject)

                this.$emit('closeDialog')

            },
        }

    }
</script>

<style scoped>

</style>