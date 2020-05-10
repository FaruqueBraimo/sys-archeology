<template>
    <div class="q-pa-md">

        <div class="col-1" style="border-radius: 20px ; width : 100% ;">

            <div class="q-pt-md">
                <q-list bordered style="border-radius: 20px">
                    <q-item-label header>Filtrar em ({{ Object.keys(candidates).length }})</q-item-label>
                    <div class="q-ma-md">
                        <q-input borderless filled bounce="200" v-model="search" placeholder="Pesquise pela profissão">
                            <template v-slot:append>
                                 <q-icon v-if="search!='' "  name="close"  @click="search = ''" />  
                            </template>
                        </q-input>

                    </div>

                    <q-expansion-item
                            group="somegroup"
                            icon="explore"
                            label="Profissão"
                            header-class="text-primary"
                            style="border-radius: 20px"
                            default-opened

                    >
                        <q-card>
                            <q-card-section>
                                <q-option-group
                                        :options="options"
                                        label="Notifications"
                                        type="checkbox"
                                        v-model="CategorySelected"
                                />

                                <q-btn no-caps flat rounded color="primary" :label="showCategoryText" class="full-width"
                                       @click="showCategory =!showCategory"/>

                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator/>

                    <q-expansion-item group="somegroup" icon="calendar_today" label="Idade" header-class="text-purple">
                        <q-card>
                            <q-card-section>
                                <q-option-group
                                        :options="idade"
                                        label="Notifications"
                                        type="checkbox"
                                        v-model="age"
                                />
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>

                    <q-separator/>

                </q-list>
            </div>
        </div>
        <div  class="q-pa-md ">
            <q-btn unelevated @click="$router.push('/selecionadosItrevistas')" icon="meeting_room" color="primary"
                   label="Sala de entrevista" class="full-width" size="md"/>
        </div>

    </div>


</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        // name: 'ComponentName',


        data() {
            return {
                img: 'https://uploads.metropoles.com/wp-content/uploads/2019/10/16152002/Screenshot_18330.jpg',
                text: '',
                group: [],
                showCategory: false,
                showCategoryText: "Ver todas profissões",
                CategorySelected: [],
                search : '',
                age: [],
                provincias: [
                    {label: 'Maputo', value: 'bat'},
                    {label: 'Inhambane', value: 'friend', color: 'green'},
                    {label: 'Gaza', value: 'upload', color: 'red'}
                ]

                ,
                idade: [
                    {label: '18-25 anos', value: 18},
                    {label: '25-40 anos', value: 40, color: 'green'},
                    {label: '40-60 anos', value: 60, color: 'red'}
                ]

                ,
                experiencia: [
                    {label: '0-1 ano', value: 'bat'},
                    {label: '1-5 anos', value: 'friend', color: 'green'},
                    {label: '5-10 anos', value: 'upload', color: 'red'}
                ]
            }

        },
        computed: {
            ...mapState('position', ['positions']),
            ...mapState('candidate', [
                'candidates',
            ]),
            options() {
                let arrs = []
                Object.keys(this.positions).forEach((id, index) => {

                    if (this.showCategory === false) {

                        if (index < 5) {

                            arrs.push({
                                label: this.positions[id].label,
                                value: id,

                            })
                            this.showCategoryText = 'Ver todas profissões'
                        }
                    }
                    else {

                        arrs.push({
                            label: this.positions[id].label,
                            value: id,

                        })
                        this.showCategoryText = 'Mostrar Menos'

                    }

                })
                return arrs
            },

        }
        ,

        watch: {

            CategorySelected: function (val) {

                this.$emit('selecionados', val)
            },

            search(val){
                 this.$emit('search', val)   
            },

            age: function (val) {
                this.$emit('age', val)
            }
        }


    }
</script>












