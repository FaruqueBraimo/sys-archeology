<template>
  <q-page padding>

    <search-and-add-component
        @showDialog="dialogCanditade = true"
        :object="{
          canShowAddBtn: false,
          type: 'candidate'
        }"
    >
      <q-menu
          transition-show="rotate"
          transition-hide="rotate"
      >
        <q-list style="min-width: 100px">
          <q-item clickable>
            <q-item-section>Registados hoje </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Registados ontem</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Registados esta semana</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section>Ordenar: por recentes</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Ordenar: por antigos</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section>Mostrar: deletados</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </search-and-add-component>

    <!-- content -->
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left bg-green-3 ellipsis">Funcionario</th>
          <th class="text-right bg-green-3 ellipsis">Telefone</th>
          <th class="text-right bg-green-3 ellipsis">Contratante</th>
          <th class="text-right bg-green-3 ellipsis">Telefone Contratante</th>
          <th class="text-right bg-green-3 ellipsis">Ação</th>
        </tr>
      </thead>
      <tbody>

          <employee-table-row-component
            v-for="(employee, id) in searchCandidates(employees, positions)"
            :key="id"
            :employee="Object.assign({id: id}, employee)"
            @switchToCandidate="switchToCandidate(id)"
            @deleteEmployee="deleteEmployee(id)"
            @changePhoto="userToChangePhoto = $event"
          />

      </tbody>
    </q-markup-table>
    <div class="row">
      <q-btn
          label="Carregar mais"
          v-if="hasNext (employees)"
          class="full-width"
          color="green-3"
          :loading="loading"
          @click="listenEmployeesOnGenericConditition('getNext10')"
      />
    </div>

    <generic-image-upload
        :object="{label: 'Nova imagem do funcionário:', action: 'saveImage'}"
        :toChangePhoto="userToChangePhoto"
        :uploadProgress="uploadProgress"
        @closeForm="userToChangePhoto = null"
        @saveImage="saveImage($event, userToChangePhoto)"
    />

  </q-page>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    import SearchAndAddComponent from "../../components/admin/SearchAndAddComponent";
    import EmployeeTableRowComponent from "../../components/admin/employees/EmployeeTableRowComponent";
    import GenericImageUpload from "../../components/admin/dialogs/GenericImageUpload";
    export default {
        components: {GenericImageUpload, EmployeeTableRowComponent, SearchAndAddComponent},

        mounted () {
            this.updateTitle ()
        },

        data () {
            return {
                userToChangePhoto: null
            }
        },

       computed: {
           ...mapState ('employee', [
               'employees', 'uploadProgress', 'loading'
           ]),
           ...mapGetters ('candidate', [
               'searchCandidates', 'hasNext'
           ]),
           ...mapState ('position', [
               'positions'
           ]),


       },
        methods: {
            ...mapActions('settings', [
                'setActualPageTitle'
            ]),
            ...mapActions('employee', [
                'deleteCandidate',
                'updateCandidate',
                'storeCandidatePhoto',
                'listenEmployeesOnGenericConditition'
            ]),


            updateTitle () {
                this.setActualPageTitle('Funcionários (' + Object.keys(this.employees).length + ')')
            },
            saveImage (image, user) {

                let id = user.id

                this.storeCandidatePhoto({
                    id: id,
                    file: image[0],
                    successMessage: 'Imagem do funcionário actualizada com sucesso',
                    progressMessage: 'Gravando imagem do funcionário ' + user.name
                })

            },
            deleteEmployee (id) {

                this.$q.dialog({
                    title: 'Confirme',
                    message: 'Deseja mesmo eliminar completamente o funcionário \'' + this.employees[id].name + '\'?',
                    ok: {
                        color: 'negative',
                    },
                    cancel: {
                        // push: true,
                    },
                    persistent: true
                }).onOk(() => {

                    this.deleteCandidate({
                        id: id,
                        sucessMessage:  'Funcionário eliminado com sucesso!'
                    })

                })

            },
            switchToCandidate (id) {

                this.$q.dialog({
                    title: 'O(A) \'' + this.employees[id].name + '\' vai deixar de ser funcionário',
                    message: 'Deseja tornar o funcionário \'' + this.employees[id].name + '\', um candidato? (O funcionário já não fará mais parte do quadro pessoal)',
                    ok: {
                        color: 'primary',
                    },
                }).onOk(() => {

                    this.updateCandidate ({
                        id: id,
                        updates: {
                            aprovedAt: '',
                            aprovedBy: '',
                            aprovedForCustomerId: '',
                            aprovedForVacancyId: '',
                            aprovedInInterviewId: '',
                        },
                        sucessMessage:  'O(A) \'' + this.employees[id].name + '\' deixou de ser funcionário'
                    })


                })

            },
        },
        watch: {
            uploadProgress(val) {
                if (val > 98) {
                    this.userToChangePhoto = null
                }
            },
            employees (val) {
                this.updateTitle ()
            }
        }
    }
</script>
