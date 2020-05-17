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

          <licenses-table-header-component />

          <tbody>

          <licenses-table-row-component
              v-for="(license, id) in licenses"
                @editlicense="editObjectCandidate = $event"
                @deletelicense="confirmDeleteCandidate(id)"
             
                 :license="Object.assign({id: id}, license)"
                :key="id"
          />
          </tbody>
        </q-markup-table>
        <div class="row q-py-md">
          <q-btn
              v-if="hasNext (licenses)"
              label="Carregar mais"
              class="full-width"
              color="primary"
              :loading="loading"
              @click="listenlicensesOnGenericConditition('getNext10')"
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

 

    <DialogAddEditlicense
        :dialogCandidate="dialogCandidate"
        :editObjectCandidate="editObjectCandidate"
        @closeDialog="closeDialog()"
    />

    


  </q-page>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
// import pdf from 'vue-pdf'
  import SearchAndAddComponent from "../../components/admin/SearchAndAddComponent";
  import DialogAddEditlicense from "../../components/admin/dialogs/DialogAddEditlicense";
  import  licensesTableHeaderComponent from "../../components/admin/licenses/licensesTableHeaderComponent";
  import  licensesTableRowComponent from "../../components/admin/licenses/licensesTableRowComponent";


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
        ...mapState ('license', [
            'licenses', 'loading'
        ]),
       
        ...mapGetters ('candidate', [
            'searchlicenses', 'hasNext'
        ]),
    },
    mounted () {
        this.updatePageTitle ()
    },
    beforeDestroy () {
      this.listenlicensesOnGenericConditition()
    },
  methods: {
      ...mapActions('settings', [
          'setActualPageTitle'
      ]),

      ...mapActions('license', [
          'deletelicense',
          'updatelicense',
          
      ]),

      updatePageTitle () {
          this.setActualPageTitle('Licenças (' + Object.keys(this.licenses).length + ')')
      },
      closeDialog () {
          this.dialogCandidate = false
          this.editObjectCandidate = null
      },

      candidateName (user) {
          return user && user.name ? user.name : ''
      },

      confirmDeleteCandidate (id) {
          let name = this.licenses[id].arqId.label
          this.$q.dialog({
              title: 'Confirmar',
              message: 'Quer mesmo deletar a licenca do ' + name + '?',
              cancel: true,
              persistent: true
          }).onOk(() => {
              this.deletelicense({
                  id: id,
                  sucessMessage:  'Licenca eliminada com sucesso!'
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
      
    
    licensesTableRowComponent,
    licensesTableHeaderComponent,
    DialogAddEditlicense,
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
      licenses (val) {
          this.updatePageTitle ()
      }
  }
}
</script>
