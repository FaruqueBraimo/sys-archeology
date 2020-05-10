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
                :options="events"
                event-color="orange"
                today-btn
            />
          </div>
          <div class="row">
         
         
          <div class="col-12 q-my-md ">
            <q-btn
               
                label="Ver Intrevistas Interna"
                :size="$q.platform.is.mobile ? 'sm' : 'md'"
                color="teal"
                @click="$router.push('/admin/interviews')"
                
             
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
                :key="dateID">

                <scheduled-external-interview-component
                 v-for="(interview, id, index) in item.interviews"
                    :key="index"
                    :interview="Object.assign({id: id}, interview)"
                    :object="{
                        customerName: interviews[id].professionals,
                    }"
                  
                   
                    />              

              </q-tab-panel>

            </q-tab-panels>
          </div>
          <!--<div v-for="n in 20" :key="n" class="q-my-md">{{ n }}. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</div>-->
        </div>
      </template>

    </q-splitter>

   
  </q-page>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import InvitedComponent from "../../components/admin/Interviews/InvitedComponent";
    import CustomerInterviewComponent from "../../components/admin/Interviews/CustomerInterviewComponent";
    import ScheduledExternalInterviewComponent from "../../components/admin/Interviews/ScheduledExternalInterviewComponent";
    import DialogAddEditInterviews from "../../components/admin/dialogs/DialogAddEditInterviews";
    export default {
      components: {DialogAddEditInterviews, ScheduledExternalInterviewComponent, CustomerInterviewComponent, InvitedComponent},
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
          ...mapState('interview', ['interviews']),
          ...mapState('candidate', ['candidates']),
          ...mapState('settings', ['globalConfigs']),
          events () {
              let evs = []
              Object.keys(this.interviews).forEach(id => {

                  if(this.interviews[id].professionals){
                  evs.push(this.interviews[id].date)
                  console.log(evs)

                  }
              })
              return evs
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


      Object.keys(this.interviews).map( (name) => {
           
           console.log(this.interviews[name].createdAt)
      })






          setTimeout(() => {
              if (this.globalConfigs.interviewsDate) {

                  console.log('this.globalConfigs.interviewsDate: ', this.globalConfigs.interviewsDate)
                  this.date = this.globalConfigs.interviewsDate

                  let objectCopy = Object.assign({},this.globalConfigs)

                  objectCopy.interviewsDate = ''

                  this.setGlobalConfigs(objectCopy)

                  console.log('this.globalConfigs.interviewsDate: ', this.globalConfigs.interviewsDate)
              }
          },200)


          this.setActualPageTitle('Entrevistas Externas')
      },

      methods: {
          ...mapActions('settings', [
              'setActualPageTitle', 'setGlobalConfigs'
          ]),
          ...mapActions('interview', [
              'deleteInterview'
          ]),
          getCustomerImage (customer) {
              return customer && customer.image ? customer.image : '/statics/icons/icon-128x128.png'
          },

          getCustomerName (customer) {
              return customer && customer.name ? customer.name : 'Desconhecido'
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
