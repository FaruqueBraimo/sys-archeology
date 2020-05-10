<template>
  <q-page padding>
    <!-- content -->

    <div class="row">

      <search-and-add-component
        @showDialog="dialogPost = true"
        :object="{
            canShowAddBtn: true,
            type: 'post'
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
      
      <div class="col-12" style="margin-bottom: 70px;">
        <q-markup-table>

          <blogs-table-header-component />

          <tbody>

          <blogs-table-row-component
              v-for="(post, id) in posts"
              @editPost="editObjectPost = $event"
              @deletePost="confirmDeletePost(id)"
              @changePhoto="postToChangePhoto = $event"
              :post="Object.assign({id: id}, post)"
              :key="id"
          />

          </tbody>
        </q-markup-table>
      </div>
    </div>

    <dialog-add-edit-blog
        :dialogPost="dialogPost"
        :editObjectPost="editObjectPost"
        @closeDialog="closeDialog()"
    />

    <generic-image-upload
        :object="{label: 'Nova imagem de post:', action: 'saveImage', headerTitle: 'Upload de imagem do post'}"
        :toChangePhoto="postToChangePhoto"
        @closeForm="postToChangePhoto = null"
        @saveImage="saveImage($event, postToChangePhoto)"
    />

    <global-confirm-dialog :confirm="confirm" @closeDialog="confirm = true" />

  </q-page>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import pdf from 'vue-pdf'
  import SearchAndAddComponent from "../../components/admin/SearchAndAddComponent";
  import GlobalConfirmDialog from "../../components/admin/dialogs/GlobalConfirmDialog";
  import DialogAddEditBlog from "../../components/admin/dialogs/DialogAddEditBlog";
  import BlogsTableHeaderComponent from "../../components/admin/blog/BlogsTableHeaderComponent";
  import BlogsTableRowComponent from "../../components/admin/blog/BlogsTableRowComponent";
  import GenericImageUpload from "../../components/admin/dialogs/GenericImageUpload";


export default {
  // name: 'PageName',
  data () {
    return {
      dialog: false,
      dialogPost: false,
      editObjectPost: null,
      postToChangePhoto: null,
      confirm: false,

    }
  },
    computed: {
        ...mapState ('post', [
            'posts', 'loading'
        ]),
        ...mapGetters ('post', [
            'searchPosts'
        ]),
    },
    mounted () {

        this.setActualPageTitle('Artigos (' + Object.keys(this.posts).length + ')')
    },
  methods: {
      ...mapActions('settings', [
          'setActualPageTitle'
      ]),
      ...mapActions('post', [
          'deletePost', 'updatePost', 'storePostPhoto'
      ]),

      closeDialog () {
          this.dialogPost = false
          this.editObjectPost = null
      },

      confirmDeletePost (id) {
          let name = this.posts[id].title
          this.$q.dialog({
              title: 'Confirmar',
              message: 'Quer mesmo deletar o post ' + name + '?',
              cancel: true,
              persistent: true
          }).onOk(() => {
              this.deletePost(id)
          })
      },

      saveImage (image, post) {

          let id = post.id

          this.storePostPhoto({
              id: id,
              file: image[0],
              successMessage: 'Imagem do artigo actualizada com sucesso'
          })


      },
      
  },
  components: {
      GenericImageUpload,
    GlobalConfirmDialog,
    BlogsTableRowComponent,
    BlogsTableHeaderComponent,
    DialogAddEditBlog,
    SearchAndAddComponent,
    pdf
  },
  watch: {
      editObjectPost (val) {
          if (val) {
              this.dialogPost = true
          }
      },
      uploadProgress(val) {
          if (val > 98) {
              this.postToChangePhoto = null
          }
      }
  }
}
</script>
