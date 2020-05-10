<template>
    <div class="col-12 text-right">
        <q-input
            v-model="searchText"
            @input="$emit('searching', searchText)"
        >
            <template v-slot:prepend>
                <q-icon name="search" />
            </template>
            <template v-slot:append>
                <q-btn
                    @click="$emit('notSearching')"
                    icon="close"
                    round
                    color="orange"
                />
            </template>
        </q-input>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "SearchCandidatesComponent",
        data () {
            return {
                searchText: ''
            }
        },
        // computed: {
        //     ...mapState('candidate', ['candidateSearchKey']),
        //
        //     searchText: {
        //         get() {
        //             return this.candidateSearchKey
        //         },
        //         set(val) {
        //             this.setCandidateSearchKey (val)
        //         }
        //     }
        // },
        // methods: {
        //     // ...mapActions('candidate', ['setCandidateSearchKey']),
        // }
    }
</script>

<style scoped>

</style>