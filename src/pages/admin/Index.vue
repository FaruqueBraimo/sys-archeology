<template>
  <q-page padding>
    <div v-if="getTotal(todayInterviews) > 0">
      <q-banner class="bg-green-2 q-mt-xs">
        <template v-slot:avatar>
          <q-icon name="mic" color="green" />
        </template>
          Atenção que hoje tens: {{ getTotal(todayInterviews) }} entrevista{{ getTotal(todayInterviews) > 1 ? 's' : '' }} agenda{{ getTotal(todayInterviews) > 1 ? 's' : '' }}.
        <template v-slot:action>
          <q-btn
            flat
            color="primary"
            label="Ver entrevista(s)"
            no-caps
            @click="showInterviews (todayFormated)"
          />
          <q-btn
                flat
                color="primary"
                label="Marcar entrevista"
                no-caps
                to="/admin/interviews"
          />
        </template>
      </q-banner>

    </div>
    <div v-else>
      <q-banner class="bg-green-2 q-mt-xs">
        <template v-slot:avatar>
          <q-icon name="mic_off" color="primary" />
        </template>
        Sem  entrevistas para hoje!
        <template v-slot:action>
          <q-btn
                  flat
                  color="primary"
                  label="Marcar entrevista"
                  to="/admin/interviews"
          />
        </template>
      </q-banner>

    </div>
  </q-page>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { date } from 'quasar'
  export default {

    mounted () {
        this.setActualPageTitle('Página Inicial')

        if (!this.users) {
            this.$router.push('/')
        }
        let user = this.users[this.userAuth.uid]

        //Redireciona o user para outra página, caso o user não seja Administrador nem Editor

      


    },
      computed: {
          ...mapState('settings', ['globalConfigs']),
          ...mapState('auth', ['users', 'userAuth']),
          todayInterviews () {
              return this.groupByDates[this.todayFormated] && this.groupByDates[this.todayFormated].interviews ?
                  this.groupByDates[this.todayFormated].interviews : {}
          },
          todayFormated () {
              return date.formatDate(new Date(), 'YYYY/MM/DD')
          },
          user () {
              return this.users[this.userAuth.uid]
          },
          isAdmin () {
              return this.users && this.userAuth.uid && this.user && this.user.role === 'Administrador'
          },
          groupByDates (interviews) {
              let grouped = {}
              Object.keys(this.interviews).forEach(id => {

                  let date = this.interviews[id].date
                  let interview = this.interviews[id]
                  let intes = {}

                  // Validar se posso saber dessas entrevistas.
                  if (this.canISeeThisInterview(interview)) {

                      if (grouped[date] && grouped[date].date) { // Outra entrevista na mesma data encontrada.

                          intes = grouped[date].interviews //recuperando as outras entrevistas nesta data
                          intes[id] = this.interviews[id] //adicionando a nova entrevista

                      } else {

                          intes[id] = this.interviews[id]

                      }

                      grouped[date] = {
                          date: date,
                          interviews: intes,
                      }

                  }

              })
              return grouped
          },
      },
    methods: {
        ...mapActions('settings', [
            'setActualPageTitle', 'setGlobalConfigs'
        ]),
        getTotal (interviews) {
            return Object.keys(interviews).length
        },
        canISeeThisInterview (interview) {
            return (interview.createdBy && interview.createdBy === this.userAuth.uid) || this.isAdmin
        },
        showInterviews (date) {

            let objectCopy = Object.assign({},this.globalConfigs)

            objectCopy.interviewsDate = date

            this.setGlobalConfigs(objectCopy)


            this.$router.push('/admin/interviews/')
        }
    },

  }
</script>
