<template>
  <q-page padding>
    <!-- content -->

    <div class="row">

      <search-and-add-component
        @showDialog="dialogCandidate = true"
        :object="{
            canShowAddBtn: true,
            type: 'candidate'
        }"
      >
        
      </search-and-add-component>

      <div class="col-12" style="margin-bottom: 70px;">
        <q-markup-table>

          <candidates-table-header-component />

          <tbody>

          <candidates-table-row-component
              v-for="(candidate, id) in candidates"
             
              :candidate="Object.assign({id: id}, candidate)"
              :key="id"
          />
          </tbody>
        </q-markup-table>
        <div class="row q-py-md">
          <q-btn
              v-if="hasNext (candidates)"
              label="Carregar mais"
              class="full-width"
              color="primary"
              :loading="loading"
              @click="listenCandidatesOnGenericConditition('getNext10')"
          />
        </div>
      </div>

    </div>

    <q-dialog v-model="dialog">
      <div class="row">
      <q-card  style="width: 700px; max-width: 80vw;" class="bg-white">
    
        <q-card-actions align="right">
          <q-btn label="Trocar Curiculo" color="primary" @click="dialogUpCV = true, dialog = false" />
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
      </div>
    </q-dialog>

 

    <dialog-add-edit-candidate
        :dialogCandidate="dialogCandidate"
        :editObjectCandidate="editObjectCandidate"
        @closeDialog="closeDialog()"
    />

    <generic-image-upload
        :object="{label: 'Nova imagem de candidato:', action: 'saveImage'}"
        :toChangePhoto="userToChangePhoto"
        :uploadProgress="uploadProgress"
        @closeForm="userToChangePhoto = null"
        @saveImage="saveImage($event, userToChangePhoto)"
    />

    <generic-document-upload
        :object="{label: 'Novo CV do candidato:', action: 'saveDoc', headerTitle: 'Currículo do candidato ' + candidateName(userToChangeDoc)}"
        :toChangeDocument="userToChangeDoc"
        :uploadProgress="uploadProgress"
        @closeForm="userToChangeDoc = null"
        @saveDoc="saveDocument($event, userToChangeDoc)"
    />

    <global-confirm-dialog :confirm="confirm" @closeDialog="confirm = true" />

  </q-page>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
// import pdf from 'vue-pdf'
  import SearchAndAddComponent from "../../components/admin/SearchAndAddComponent";
  import GlobalConfirmDialog from "../../components/admin/dialogs/GlobalConfirmDialog";
  import DialogAddEditCandidate from "../../components/admin/dialogs/DialogAddEditCandidate";
  import CandidatesTableHeaderComponent from "../../components/admin/candidates/CandidatesTableHeaderComponent";
  import CandidatesTableRowComponent from "../../components/admin/candidates/CandidatesTableRowComponent";
  import GenericImageUpload from "../../components/admin/dialogs/GenericImageUpload";
  import GenericDocumentUpload from "../../components/admin/dialogs/GenericDocumentUpload";


export default {
  // name: 'PageName',
  data () {
    return {
      dialog: false,
      dialogCandidate: false,
      editObjectCandidate: null,
      userToChangePhoto: null,
      userToChangeDoc: null,
      name: '',
      text: '',
      accept: false,
      age: '',
      dialogUpCV: false,
      confirm: false,
     saveObject : {
        name: '',
        requirements: '',
        tasks: '',
        description: '',
      }

    }
  },
    computed: {
        ...mapState ('candidate', [
            'candidates', 'uploadProgress', 'loading'
        ]),
       
        ...mapGetters ('candidate', [
            'searchCandidates', 'hasNext'
        ]),
    },
    mounted () {
        this.updatePageTitle ()
    },
    beforeDestroy () {
      this.listenCandidatesOnGenericConditition()
    },
  methods: {
      ...mapActions('settings', [
          'setActualPageTitle'
      ]),

      ...mapActions('candidate', [
          'deleteCandidate',
          'updateCandidate',
          'storeCandidatePhoto',
          'listenCandidatesOnGenericConditition'
      ]),

      updatePageTitle () {
          this.setActualPageTitle('Candidatos (' + Object.keys(this.candidates).length + ')')
      },
      closeDialog () {
          this.dialogCandidate = false
          this.editObjectCandidate = null
      },

      candidateName (user) {
          return user && user.name ? user.name : ''
      },

      confirmDeleteCandidate (id) {
          let name = this.candidates[id].name
          this.$q.dialog({
              title: 'Confirmar',
              message: 'Quer mesmo deletar o ' + name + '?',
              cancel: true,
              persistent: true
          }).onOk(() => {
              this.deleteCandidate({
                  id: id,
                  sucessMessage:  'Candidato eliminado com sucesso!'
              })
          })
      },

      saveImage (image, candidate) {

          let id = candidate.id

          this.storeCandidatePhoto({
              id: id,
              file: image[0],
              successMessage: 'Imagem do candidato actualizada com sucesso',
              progressMessage: 'Gravando imagem do candidato ' + candidate.name
          })


      },

      saveDocument (image, candidate) {

          let id = candidate.id

          this.storeCandidatePhoto({
              id: id,
              file: image[0],
              successMessage: 'CV do candidato actualizado com sucesso',
              progressMessage: 'Gravando o CV do candidato ' + candidate.name,
              isCV: true
          })


      },

  },
  components: {
      GenericDocumentUpload,
      GenericImageUpload,
    GlobalConfirmDialog,
    CandidatesTableRowComponent,
    CandidatesTableHeaderComponent,
    DialogAddEditCandidate,
    SearchAndAddComponent,
  },
  watch: {
      editObjectCandidate (val) {
          if (val) {
              this.dialogCandidate = true
          }
      },
      uploadProgress(val) {
          if (val > 98) {
              this.userToChangePhoto = null
          }
      },
      candidates (val) {
          this.updatePageTitle ()
      }
  }
}
</script>
