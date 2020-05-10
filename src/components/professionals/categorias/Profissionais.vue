<template>
    <div class="q-mt-md q-mb-md">
        <div class="row justify-left ">
            <div v-if="Object.keys(search !='' ? employees2 : employees).length === 0" class=" q-pa-xl text-bold text-h6">
                <p>Nenhum profissional encontrado para  
                    <span class="text-red">
                        '{{search != '' ? search : selecionadoLabel }}'
                    </span>
                      </p>
            </div>
            
           
            <template v-if="$q.platform.is.desktop">
                <div class="col-xs-12 col-md-4 q-pa-md" v-for="(employee, id) in searchCandidates(search !='' ? employees2 : employees, positions)"
                     :key="id">
                    <q-card class="my-card"  square flat>
                        <q-img
                                :src="employee.image ? employee.image : img"
                                basic
                                style="height: 265px;"
                                @click="details(id)"

                        >
                            <div class="absolute-bottom text-subtitle1 text-center text-no-wrap">
                                {{employee.name}}
                            </div>
                        </q-img>

                        <q-space>
                        </q-space>

                        <q-space>
                        </q-space>

                        <q-card-actions>
                            <q-btn unelevated class="full-width" color="cyan" label="Ver perfil"
                                   @click="$router.push('/professionals/profile/' + id)"/>
                        </q-card-actions>

                    </q-card>
                </div>
            </template>

        </div>


        <div v-if="$q.platform.is.mobile">
            <template  v-for="(employee, id) in searchCandidates(search !='' ? employees2 : employees, positions)">
                <q-item class="q-mb-sm" clickable v-ripple :key="id">
                    <q-item-section avatar>
                        <q-avatar size="32px">
                            <img :src="employee.image ? employee.image : img">
                        </q-avatar>
                        <q-icon

                        />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label> {{employee.name}}</q-item-label>
                    </q-item-section>

                    <q-item-section side>
                        <q-btn
                                label="Ver Perfil"
                                outline
                                no-caps
                                rounded
                                size="sm"
                                color="cyan-6 "

                                @click="$router.push('/professionals/profile/' + id)"

                        />
                    </q-item-section>
                </q-item>

            </template>
        </div>


        <div class="row q-px-md">
            <q-btn
                label="Carregar mais"
                class="full-width"
                color="primary"
                :loading="loading"
                @click="listenCandidatesOnGenericConditition('getNext10')"
            />
        </div>
    </div>

</template>

<script>
    import {mapActions, mapState, mapGetters} from 'vuex'
    import {date} from 'quasar'

    export default {
        props: ['selecionados', 'age', 'search'],

        name: 'profissionais',

        data() {
            return {
                img: 'statics/img/people/moca-curso.jpg',
                text: '',
                selecionadoLabel :''

            }
        },
        computed: {
            ...mapState('candidate', [
                'candidates', 'loading'
            ]),
            ...mapGetters('candidate', [
                'searchCandidates'
            ]),
            ...mapState('position', [
                'positions'
            ]),

                  employees2() {
                let emps = {}


                Object.keys(this.candidates).forEach(key => {

                    let emp = this.candidates[key]

                    if (!emp.aprovedAt) {

                        emp.professions.map(o => {
                         let   position = {}
                         position = this.positions[o].label
                         let positionLower = position.toLowerCase()
                        let  areaToSearch = this.search
                    
                         
                    
                                 if( positionLower.includes(areaToSearch.toLowerCase())) {
                                        emps[key] = emp   
                                }

    
                                                           
                            }

                            

                        )

                       

                      
                    }
                })
                return emps
            }
                ,

            employees() {
                let emps = {}

                if (!this.selecionados.length && !this.age.length  && !this.search.length)  {
                    return this.candidates
                }


                Object.keys(this.candidates).forEach(key => {

                    let emp = this.candidates[key]

                    if (!emp.aprovedAt) {

                        emp.professions.map(o => {
                         let   position = {}
                         position = this.positions[o].label
                         let positionLower = position.toLowerCase()
                        let  areaToSearch = this.search
                    
                         

                            if (this.selecionados.includes(o)  ) {

                                 emps[key] = emp
                                 
                                }
                                
                                // else if( positionLower.includes(areaToSearch.toLowerCase())) {
                                //         emps[key] = emp   
                                // }

    
                                                           
                            }

                            

                        )

                       

                        let formattedString = date.formatDate(emp.birthDate, 'YYYY-MM-DD')
                        let date1 = Date.now()
                        let unit = 'years'
                        let diff = date.getDateDiff(date1, formattedString, unit)
                        if (this.age.includes(18)  ) {

                            if (diff > 18 && diff < 25) {
                                emps[key] = emp
                            }
                        }
                        if (this.age.includes(40)) {

                            if (diff > 25 && diff < 40) {
                                emps[key] = emp
                            }
                        }
                        if (this.age.includes(60)) {
                            if (diff > 40 && diff < 60) {
                                emps[key] = emp
                            }
                        }

                      
                    }
                })
                return emps
            }
        },



    watch : {
            selecionados(val) {
            this.selecionadoLabel =   this.positions[this.selecionados].label   

            }



            },
        
        methods: {
            ...mapActions('candidate', ['listenCandidatesOnGenericConditition']),
        },
        candidateImage() {
            return this.candidate && this.candidate.image ? this.candidate.image : '/statics/icons/icon-128x128.png'
        }
    }
</script>

