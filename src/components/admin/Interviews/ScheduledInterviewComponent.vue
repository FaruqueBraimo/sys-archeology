<template>
    <q-list
        bordered
        class="rounded-borders col-12"
        :class="object.class"
    >

        <customer-interview-component
            :object="object"
            :interview="interview"
            @editInterview="$emit('editInterview', $event)"
            @confirmDeleteInterview="$emit('confirmDeleteInterview', $event)"
        />

        <q-separator/>

        <q-list  padding class="rounded-borders">
            <q-item-label header>
                <div class="row">

                    <div class="col-6">
                        <div class="row">
                            <div class="col-12">
                                Convocados para entrevista ({{ totalInvited (interview) }}) de ({{ Object.keys(filteredCandidates).length }})
                            </div>
                            <div class="col-12">
                                <q-checkbox v-model="onlyInvited" label="Mostar apenas os convocados" color="positive" />
                            </div>
                        </div>
                    </div>


                    <search-candidates-component
                        v-if="searching"
                        @searching="textSearch = $event"
                        @notSearching="searching = false;textSearch = ''"
                    />

                    <div v-else class="col-6 text-right">
                        <div>
                            <!--TODO: Permitir adicionar candidatos reais para uma entrevista-->
                            <!--<q-btn class="q-mx-sm" size="12px" flat dense round icon="add" />-->
                            <q-btn @click="searching = true" size="12px" flat dense round icon="search" />
                        </div>
                    </div>

                </div>


            </q-item-label>

            <interview-missing-data-component
                v-if="!interview.vacancyId || !interview.customerId"
                :interview="interview"
                @editInterview="$emit('editInterview', interview)"
            />


            <template v-else>
                <div v-if="loading && !Object.keys(candidatesForPosition).length" class="flex flex-center" style="min-height: 300px">
                    <div>
                        <q-spinner-rings
                            color="primary"
                            size="7em"
                        />
                        <q-tooltip :offset="[0, 8]">A carregar candidatos</q-tooltip>
                    </div>
                </div>
                <template v-else-if="Object.keys(filteredCandidates).length">
                    <invited-component
                        v-for="(candidate, key, index) in filteredCandidates"
                        :key="key"
                        v-if="onlyInvited && isInvited(key) || !onlyInvited"
                        :candidate="Object.assign({id: key}, candidate)"
                        :invitedCandidates="interview.invitedCandidates"
                        :interview="interview"
                        @candidateSelected="updateCandidatesInterview($event)"
                        @tornFuncCandidate="confirmFuncCandidate($event)"
                    />
                    <div class="row">
                        <q-btn
                            v-if="hasNext (candidates)"
                            label="Carregar mais"
                            class="full-width"
                            color="primary"
                            :loading="loading"
                            @click="filteredForInterview('getNext10')"
                        />
                    </div>

                </template>

                <div v-else style="min-height: 250px" class="flex flex-center">
                    <q-icon name="info"/> Ainda não há candidatos para esta área da vaga.
                </div>

            </template>

        </q-list>

    </q-list>
</template>

<script>
    import { mapActions,mapState, mapGetters } from 'vuex'
    import CustomerInterviewComponent from "./CustomerInterviewComponent";
    import InvitedComponent from "./InvitedComponent";
    import SearchCandidatesComponent from "./SearchCandidatesComponent";
    import InterviewMissingDataComponent from "./InterviewMissingDataComponent";
    export default {
        props: ['object', 'interview'],
        name: "ScheduledInterviewComponent",
        components: {
            InterviewMissingDataComponent,
            SearchCandidatesComponent, InvitedComponent, CustomerInterviewComponent},
        data () {
            return {
                searching:  false,
                onlyInvited:  false,
                textSearch: '',
                saveObject: {}
            }
        },
        computed: {
            ...mapState ('auth', ['userAuth']),
            ...mapState ('candidate', ['candidates', 'candidatesForPosition', 'loading']),
            ...mapGetters ('candidate', ['hasNext']),
            ...mapState ('position', [
                'positions'
            ]),
            filteredCandidates () {
                return this.searchCandidates(this.textSearch, this.candidatesForPosition, this.positions)
            }
        },
        mounted () {
            if (!Object.keys(this.candidatesForPosition).length) {
                this.filteredForInterview ()
            }

        },
        methods: {

            ...mapActions ('interview', [
                'updateInterview'
            ]),
            ...mapActions ('candidate', [
                'updateCandidate', 'filteredForInterview'
            ]),
            searchCandidates (textSearch, candidates, profissions) {
                let object = {}

                Object.keys(candidates).forEach(key => {
                    let candidate = candidates[key]
                    let userPositions = candidates[key].professions

                    if (candidate.name.toLowerCase().includes(textSearch.toLowerCase())
                        || this.positionNames(userPositions, profissions).toLowerCase().includes(textSearch.toLowerCase())
                        || candidate.bairro.toLowerCase().includes(textSearch.toLowerCase())
                    ) {
                        object[key] = candidate
                    }
                })
                return object
            },
            totalInvited (interview) {
                return interview && interview.invitedCandidates ? interview.invitedCandidates.length : 0
            },
            isInvited (id) {
                return this.interview.invitedCandidates.includes(id)
            },
            updateCandidatesInterview (candidates) {

                this.updateInterview({
                    id: this.interview.id,
                    updates: {
                        invitedCandidates: candidates
                    },
                })

            },
            confirmFuncCandidate (candidate) {

                let name = candidate.name
                let id = candidate.id
                this.saveObject = candidate;

                delete this.saveObject.id;

                this.$q.dialog({
                    title: 'Confirmar',
                    message: 'Confirma a aprovação do \'' + name + '\' nesta entrevista?',
                    cancel: true,
                }).onOk(() => {

                    // Nova implementação
                    // A coluna, aprovedAt, passa a ser o indicador de se um certo candidato já é ou não funcionário.
                    // Dessa forma temos: A data em que o mesmo foi aprovado, por quem foi aprovado e
                    // não precisamos de criar nova colection no firebase.
                    this.saveObject.aprovedAt = new Date();
                    this.saveObject.aprovedBy = this.userAuth.uid;
                    this.saveObject.aprovedForCustomerId = this.interview.customerId;
                    this.saveObject.aprovedForVacancyId = this.interview.vacancyId;
                    this.saveObject.aprovedInInterviewId = this.interview.id;

                    // console.log('this.saveObject: ', this.saveObject)
                    // console.log('id: ', id)
                    //
                    // return
                    this.updateCandidate ({
                        id: id,
                        updates: this.saveObject
                    })

                    // this.$router.push('/admin/employees')
                })

            },


            positionNames (userPositions, positions) {
                let strs = ''
                if (userPositions && userPositions.length) {
                    userPositions.forEach(e => {

                        strs = strs.length > 0 ? strs + ', ' : strs
                        strs += positions[e] ? positions[e].label : ''

                    })
                }
                return strs
            }
        }
    }
</script>

<style scoped>

</style>