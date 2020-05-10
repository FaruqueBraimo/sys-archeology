<template>
    <q-item clickable v-ripple :class="{aproved : candidatedAproved}">
        <q-avatar
            size="md"
            class="q-ma-sm"
            text-color="white">
            <q-img src="https://www.w3schools.com/howto/img_avatar2.png" spinner-color="white" />
        </q-avatar>

        <q-item-section>
            <q-item-label lines="1">{{ candidate.name }}</q-item-label>
            <q-item-label caption>{{ dateFormated }}</q-item-label>
        </q-item-section>

        <q-item-section side >
            <div>
                <q-btn
                    color="white"
                    v-if="invitedForInterview.includes(candidate.id)"
                    :text-color="candidatedAproved ? 'positive' : 'primary'"
                    :icon="candidatedAproved ? 'check_circle' : 'done_all'"
                    flat
                    round
                    @click="$emit(candidatedAproved ? '' : 'tornFuncCandidate', candidate)"
                >
                    <q-tooltip :content-class="candidatedAproved ? 'bg-positive' : 'bg-primary'" :offset="[10, 10]">
                        {{ candidate.aprovedInInterviewId === interview.id ? 'Aprovado na entrevista' : 'Aprovar funcionario'}}
                    </q-tooltip>
                </q-btn>

                <q-toggle v-if="!candidatedAproved" color="blue" v-model="invitedForInterview" :val="candidate.id" />
            </div>
        </q-item-section>
    </q-item>
</template>

<script>
    import { date } from 'quasar'
    export default {
        name: "InvitedComponent",
        props: ['candidate', 'invitedCandidates', 'interview'],
        data () {
            return {
                isInvited: false,
                invitedForInterview: []
            }
        },
        computed: {
            candidatedAproved () {
                return this.candidate.aprovedInInterviewId === this.interview.id
            },
            dateFormated () {
                return date.formatDate(this.candidate.createdAt.toDate(), 'YYYY-MM-DD hh:mm ')
            }
        },
        mounted () {
            this.invitedForInterview = this.invitedCandidates ? this.invitedCandidates : []

            this.$root.$on('candidateSelected', (invitedCandidates, interviewId) => {

                if (interviewId === this.interview.id) {
                    this.invitedForInterview = invitedCandidates ? invitedCandidates : []
                }

            })

        },
        watch: {
            invitedForInterview (val) {
                this.$emit('candidateSelected', val)
                this.$root.$emit('candidateSelected', val, this.interview.id)
            }
        }


    }
</script>

<style scoped>
    .aproved {
        background: #eee;
    }

</style>