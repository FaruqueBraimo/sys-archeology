<template>
    <div class="" :class="object.style ? object.style : 'col-12'">
        <q-input
            bottom-slots
            outlined 
            filled
            rounded
            v-model="searchText"
        >
            <template v-slot:prepend>
                <q-icon name="search" />
            </template>

            <template v-slot:append>
                <q-btn
                    v-if="text.length"
                    @click="text = ''"
                    round
                    dense
                    flat
                    icon="close"
                />
                <!--TODO: desativar e implementar estas opções de filtro-->
                <!--<q-btn-->
                    <!--label="Filtrar"-->
                    <!--icon="short_text"-->
                    <!--:class="{'q-mx-md' : object.canShowAddBtn}"-->
                    <!--flat-->
                <!--&gt;-->
                    <!--<slot></slot>-->
                <!--</q-btn>-->
                <q-btn
                    v-if="object.canShowAddBtn"
                    @click="$emit('showDialog')"
                    round
                    color="primary"
                    icon="add"
                />
            </template>
        </q-input>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        props: ['object'],
        name: "SearchAndAddComponent",
        data () {
            return {
                text: '',
            }
        },
        computed: {
            ...mapState('candidate', ['candidateSearchKey']),
            ...mapState('vacancy', ['vacancySearchKey']),

            searchText: {
                get() {
                    return this.object.type === 'vacancy' ? this.vacancySearchKey : this.candidateSearchKey
                },
                set(val) {
                    this.object.type === 'vacancy' ? this.setVacancySearchKey (val) : this.setCandidateSearchKey (val)
                }
            }
        },
        methods: {
            ...mapActions('candidate', ['setCandidateSearchKey']),
            ...mapActions('vacancy', ['setVacancySearchKey']),
        }


    }
</script>

<style scoped>

</style>