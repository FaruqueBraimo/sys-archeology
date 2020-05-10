<template>
  <q-page padding>
    <!-- content -->
    <q-splitter
      v-model="splitterModel"
      :horizontal="$q.platform.is.mobile"
      style="height: 80vh"
    >
      <template v-slot:before>
        <div class="q-pa-md">
          <!--<div class="text-h4 q-mb-md">Selecione a data:</div>-->
          <div style="">
            <q-date
                style="width: 1000px;"
                v-model="date"
                :events="events"
                :event-color="(date) => hasInterviewArea(date) ? 'primary' : 'red'"
                :options="events"
                today-btn
            />
          </div>
          <div class="row">
          <div class=" col-6 q-my-md">
            <q-btn
                v-if="date !== '2019/12/01'"
                @click="dialogInterviews = true"
                label="Agendar Entrevista"
                :size="$q.platform.is.mobile ? 'sm' : 'md'"
                icon="add"
                style="height: 75px"
                color="primary"
             
            />
          </div>
          <div class="col-6 q-my-md q-pl-xs">
            <q-btn
                v-if="date !== '2019/12/01'"
                label="Ver Intrevistas Extenas"
                :size="$q.platform.is.mobile ? 'sm' : 'md'"
                color="teal"
                style="height: 75px"
                @click="$router.push('/admin/externalInterviews')"

             
            />
          </div>
          </div>
          <div style="height: 30px"></div>
        </div>
      </template>

      <template v-slot:separator>
        <q-avatar color="primary" text-color="white" :size="$q.platform.is.mobile ? 'sm' : '40px'" icon="drag_indicator" />
      </template>

      <template v-slot:after>
        <div class="q-pa-sm-md q-py-xs-md">
          <!--<div class="text-h4 q-mb-md">Cliente:</div>-->
          <div>
            <q-tab-panels
                v-model="date"
                animated
                class="bg-transparent"
                transition-prev="jump-up"
                transition-next="jump-up"
            >
              <q-tab-panel
                v-for="(item, dateID) in groupByDates"
                :name="dateID"
                :key="dateID"
                class="row justify-center q-gutter-y-md"
              >
                <scheduled-interview-component
                    v-for="(interview, id, index) in interviewsICansee(item.interviews)"
                    :key="index"
                    :interview="Object.assign({id: id}, interview)"
                    :object="{
                        totalInvited: 9,
                        customerImage: getCustomerImage(customers[interview.customerId]),
                        customerName: getCustomerName(customers[interview.customerId]),
                        interviewStatus:  'Entrevista ' + (index + 1),
                    }"
                    @editInterview="interviewToEdit = $event"
                    @confirmDeleteInterview="confirmDeleteInterview"
                />
              </q-tab-panel>

              <q-tab-panel :name="date">

                <div class="flex flex-center" style="height: 400px">

                    <div>
                      <q-btn
                          label="Agendar Entrevista"
                          @click="dialogInterviews = true"
                          icon="add"
                          flat
                      />
                    </div>

                </div>

              </q-tab-panel>

            </q-tab-panels>
          </div>
          <!--<div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>-->
        </div>
      </template>

    </q-splitter>

    <dialog-add-edit-interviews
        :dialogInterviews="dialogInterviews || !!interviewToEdit"
        :interviewToEdit="interviewToEdit"
        @closeDialog="closeDialog"
    />
  </q-page>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import InvitedComponent from "../../components/admin/Interviews/InvitedComponent";
    import CustomerInterviewComponent from "../../components/admin/Interviews/CustomerInterviewComponent";
    import ScheduledInterviewComponent from "../../components/admin/Interviews/ScheduledInterviewComponent";
    import DialogAddEditInterviews from "../../components/admin/dialogs/DialogAddEditInterviews";
    export default {
      components: {DialogAddEditInterviews, ScheduledInterviewComponent, CustomerInterviewComponent, InvitedComponent},
      data () {
        return {
          splitterModel: 30,
            dialogInterviews: false,
            interviewToEdit: null,
            date: new Date(),
          // events: ['2019/12/19', '2019/12/25', '2019/12/16'] //TODO: mostrar as datas reais com entrevistas
        }
      },
      computed: {
          ...mapState('auth', ['userAuth', 'users']),
          ...mapState('interview', ['interviews']),
          ...mapState('customer', ['customers']),
          ...mapState('settings', ['globalConfigs']),
          events () {
              let evs = []
              Object.keys(this.interviewsICansee(this.interviews)).forEach(id => {
                  evs.push(this.interviews[id].date)
              })
              return evs
          },
          user () {
              return this.users[this.userAuth.uid]
          },
          isAdmin () {
              return this.users && this.userAuth.uid && this.user && this.user.role === 'Administrador'
          },
          groupByDates () {
              let grouped = {}
              Object.keys(this.interviews).forEach(id => {

                  let date = this.interviews[id].date
                  let intes = {}

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


              })
              return grouped
          },
      },
      mounted () {

          setTimeout(() => {
              if (this.globalConfigs.interviewsDate) {

                  this.date = this.globalConfigs.interviewsDate

                  let objectCopy = Object.assign({},this.globalConfigs)

                  objectCopy.interviewsDate = ''

                  this.setGlobalConfigs(objectCopy)
              }
          },200)


          this.setActualPageTitle('Entrevistas')
      },

      methods: {
          ...mapActions('settings', [
              'setActualPageTitle', 'setGlobalConfigs'
          ]),
          ...mapActions('interview', [
              'deleteInterview'
          ]),
          interviewsICansee (interviews) {
              let inters = {}
              Object.keys(interviews).forEach(id => {
                  let interview = interviews[id]
                  if (this.canISeeThisInterview(interview)) {
                      inters[id] = interview
                  }
              })
              return inters
          },
          canISeeThisInterview (interview) {
              return (interview.createdBy && interview.createdBy === this.userAuth.uid) || this.isAdmin
          },
          hasInterviewArea (date) {

              let has = true
              Object.keys(this.interviews).forEach(id => {
                  if (this.interviews[id].date === date && !this.interviews[id].vacancyId) {
                      has = false
                  }
              })
              return has
          },
          getCustomerImage (customer) {
              return customer && customer.image ? customer.image : '/statics/icons/icon-128x128.png'
          },
          getCustomerName (customer) {
              return customer && customer.name ? customer.name : 'Cliente desconhecido'
          },

          closeDialog () {
              this.dialogInterviews = false;
              this.interviewToEdit = null
          },
          confirmDeleteInterview (interview) {

              let name = this.customers[interview.customerId].name

              this.$q.dialog({
                  title: 'Deletar entrevista',
                  message: 'A entrevista do cliente \'' + name + '\', será deletada, confirma?',
                  cancel: true,
                  persistent: true,
                  ok: {
                      color: 'red-8'
                  }
              }).onOk(() => {

                  this.deleteInterview (interview.id)

              })

          }
      }
    }
</script>
