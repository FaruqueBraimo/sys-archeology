<template>
    <div class="q-pb-sm">

        <q-card
                class="my-card "
                v-if="$q.platform.is.desktop"
        >

            <q-card-section class=" bg-cyan-6  ">

                <div class="row">

                    <div class="col-2">

                    </div>

                    <div class="row col-10  text-h5 text-white q-pa-md  ">
                        <div class="col-2 q-pl-xl q-pt-md">
                            <q-avatar size="150px" font-size="100px" color="white" text-color="cyan-6"
                                      icon="directions"/>

                        </div>

                        <div class="row col-8 q-pt-xl q-pl-lg">
                            <div class="col-8 text-h6 q-pt-md  q-mt-sm">
                                {{course.name}}
                                <div class="text-caption ">
                                   
                                   
                                </div>
                            </div>
                            <div class="col-1 q-pt-md">
                                <q-badge class="q-ml-xl  " color="deep-orange">Recente</q-badge>
                            </div>
                        </div>

                    </div>

                </div>

            </q-card-section>
            <q-separator/>


            <q-card-section class="q-pa-md">

                <div class=" row">

                    <div class="row col-9 justify-center text-center q-mt-sm">

                        <div class="col text-cyan text-h6 q-mt-xs">
                            Preço : <span class="text-black">{{course.price ? course.price + ',00 Mt': ' - '}}</span>

                        </div>

                        <div class="col text-teal text-h6 q-mt-xs">
                            Plano : <span class="text-black">{{course.plan | limitLength(20)}}</span>

                        </div>

                        <div class="col text-primary text-h6 q-mt-xs">
                            Início : <span class="text-black">{{course.endAt ? course.endAt : 'Por anunciar' }}</span>

                        </div>

                         <div class="col text-deep-orange text-h6 q-mt-xs">
                            Local : <span class="text-black">{{course.location}}</span>

                        </div>


                    </div>


                    <div class="col-3">

                        <q-btn
                                size="20px"
                                class="q-px-xl "
                                unelevated
                                color="deep-orange"
                                label="Inscreva-se"
                                @click="$emit('dialogSubscription', true)"
                                no-caps
                        />


                    </div>


                </div>


            </q-card-section>

        </q-card>

        <div>

        </div>

        <div v-if="$q.platform.is.desktop">


            <div class="row justify-center  text-body1 q-pl-sm-xl q-pr-sm-xl q-pt-md">
                <div class="col-xs-10 col-md-7 q-gutter-y-md">


                    <q-card flat bordered class="my-card" v-if="course.description">
                        <q-card-section>
                            <div class="text-h6">Descrição</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            {{course.description}}

                        </q-card-section>

                    </q-card>

                </div>

                <div class="col-xs-10 col-md-7 text-body1 q-gutter-y-md q-pt-md">


                    <q-card flat bordered class="my-card" v-if="course.requirements">
                        <q-card-section>
                            <div class="text-h6">Requitos</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            {{course.requirements}}

                        </q-card-section>

                    </q-card>

                </div>
            </div>
        </div>

        <div class="row q-pa-sm" v-if="$q.platform.is.mobile">

            <div class="q-pa-sm full-width">
                <q-card class="my-card" flat bordered>
                    <div style="height: 200px" class="bg-grey-4">
                        <q-img
                                style="width: 100%;height: 100%"
                                :src="getCourseImage(course)"
                        />
                    </div>

                    <q-card-section>
                        <div class="text-overline text-orange-9">Novo</div>
                        <div class="text-h5 q-mt-sm q-mb-xs text-center text-bold"> {{course.name}}</div>
                        <div class="text-center">
                            <q-badge color="cyan-6" align="middle">
                                {{ course.price ? course.price : '0' }},00 MT
                            </q-badge>
                        </div>

                    </q-card-section>

                </q-card>

            </div>

            <div class="q-pa-sm full-width">
                <q-list bordered class="rounded-borders">
                    <q-expansion-item>
                        <template v-slot:header>
                            <q-item-section avatar>
                                <q-icon color="cyan-6" name="info"/>
                            </q-item-section>

                            <q-item-section class="text-bold">
                                Descrição
                            </q-item-section>


                        </template>

                        <q-card>
                            <q-card-section>
                                {{course.description}}
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator/>

                    <q-expansion-item>
                        <template v-slot:header>
                            <q-item-section avatar>
                                <q-icon color="cyan-6" name="account_balance"/>
                            </q-item-section>

                            <q-item-section class="text-bold">
                                Local e Data de Início
                            </q-item-section>
                        </template>

                        <q-card>
                            <q-card-section>
                              O curso realizar-se-á no <span class="text-bold"> {{course.location}}  </span>  cuja data   <span class="text-bold">{{course.endAt ?  'é ' + course.endAt : 'será anunciada em breve' }} </span> 
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator/>

                    <q-expansion-item>
                        <template v-slot:header>
                            <q-item-section avatar>
                                <q-icon color="cyan-6" name="payment"/>
                            </q-item-section>

                            <q-item-section class="text-bold">
                                Plano
                            </q-item-section>
                        </template>

                        <q-card>
                            <q-card-section>
                                {{ course.plan }}
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </q-list>


            </div>


        </div>


        <div class="q-px-md" v-if="$q.platform.is.mobile">
            <q-btn no-caps color="cyan-6" label="Inscreva-se" @click="$emit('dialogSubscription', true)"
                   class="full-width"/>
        </div>

    </div>


</template>


<script>
    import {mapGetters} from 'vuex'
    import Header from "components/professionals/Header.vue"

    export default {

        props: ['course'],
        components: {

            Header
        },
        computed: {
            ...mapGetters('course', ['getCourseImage']),
            courseImage() {
                return this.course && this.course.image ? this.course.image : '/statics/icons/icon-128x128.png'
            }
        },
        filters: {
            limitLength(val, length) {
                return val.length > length ? val.substr(0, length) + '...' : val
            }
        }

    }
</script>

<style>

</style>