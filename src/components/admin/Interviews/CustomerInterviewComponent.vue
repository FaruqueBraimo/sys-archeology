<template>
    <q-item>

        <q-badge class="absolute-top-right" color="positive">{{ object.interviewStatus }}</q-badge>

        <q-avatar size="xl" text-color="white" class="q-mr-lg q-my-md">
            <q-img :src="object.customerImage" spinner-color="white" />
        </q-avatar>
        <q-item-section>
            <q-item-label :class="{'text-negative' : !interview.customerId}">
                {{ object.customerName}}
            </q-item-label>
            <q-item-label :class="{'text-negative' : !interview.vacancyId}">
                <b>{{ getVacancyName(interview) }}</b>
            </q-item-label>
            <q-item-label caption>{{ interview.date }} - {{ interview.time }}</q-item-label>
        </q-item-section>
        <q-item-section side>
            <div class="text-grey-8 q-gutter-xs">

                <q-btn
                    v-if="Object.keys(candidatesForPosition).length > 50"
                    @click="resetCandidatesForPosition"
                    size="12px"
                    flat
                    dense
                    round
                    icon="autorenew"
                    color="negative"
                    label="Liberar memória"
                >
                </q-btn>
                <q-btn
                    size="12px" flat dense round icon="more_vert"
                >
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <!--TODO: implementar a actualização de vagas-->
                            <q-item clickable v-close-popup>
                                <q-item-section   @click="$emit('editInterview', interview)">Editar</q-item-section>
                            </q-item>
                            <!--TODO: Implementar a remoção de vagas-->
                            <q-item clickable v-close-popup class="text-red"  >
                                <q-item-section @click="$emit('confirmDeleteInterview', interview)" >Remover </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>

            </div>
        </q-item-section>

    </q-item>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "CustomerInterviewComponent",
        props: ['object', 'interview'],
        computed: {
            ...mapState('vacancy', [
                'vacancies'
            ]),
            ...mapState('candidate', [
                'candidatesForPosition'
            ]),
        },
        methods: {
            ...mapActions('candidate', [
                'resetCandidatesForPosition'
            ]),
            getVacancyName (interview) {
                return this.vacancies[interview.vacancyId] ? this.vacancies[interview.vacancyId].title : 'Área não especificada.'
            }
        }
    }
</script>

<style scoped>

</style>