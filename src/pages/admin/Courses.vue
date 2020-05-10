<template>
  <q-page padding>
    <div class="row">

      <search-and-add-component
        @showDialog="dialogCourse = true"
        :object="{
            canShowAddBtn: true,
            type: 'course'
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

          <courses-table-header-component />

          <tbody>

          <courses-table-row-component
              v-for="(course, id) in courses"
              @editCourse="editObjectCourse = $event"
              @changePhoto="courseToChangePhoto = $event"
              @courseSubscription="courseSubscription = $event"
              @deleteCourse="confirmDeleteCourse(id)"
              @idCourse="idCourse = $event"
              :course="Object.assign({id: id}, course)"
              :key="id"
          />

          </tbody>
        </q-markup-table>
      </div>
    </div>

    <dialog-add-edit-courses
        :dialogCourse="dialogCourse"
        :editObjectCourse="editObjectCourse"
        @closeDialog="closeDialog()"
    />


 
    <course-supscription
       :courseSubscription="courseSubscription"
       @closeDialog="closeDialog()"
       :idCourse="idCourse"

    />


    <generic-image-upload
        :object="{label: 'Nova imagem de course:', action: 'saveImage'}"
        :toChangePhoto="courseToChangePhoto"
        @closeForm="courseToChangePhoto = null"
        @saveImage="saveImage($event, courseToChangePhoto)"
    />

    <global-confirm-dialog :confirm="confirm" @closeDialog="confirm = true" />

  </q-page>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import SearchAndAddComponent from "../../components/admin/SearchAndAddComponent";
  import GlobalConfirmDialog from "../../components/admin/dialogs/GlobalConfirmDialog";
  import DialogAddEditCourses from "../../components/admin/dialogs/DialogAddEditCourses";
  import CoursesTableHeaderComponent from "../../components/admin/courses/CoursesTableHeaderComponent";
  import CoursesTableRowComponent from "../../components/admin/courses/CoursesTableRowComponent";
  import GenericImageUpload from "../../components/admin/dialogs/GenericImageUpload";
  import CourseSupscription from  "../../components/admin/courses/CourseSupscription";


export default {
  // name: 'PageName',
  data () {
    return {
      dialog: false,
      dialogCourse: false,
      editObjectCourse: null,
      courseToChangePhoto: null,
      confirm: false,
      courseSubscription : '',
      idCourse: '' 

    }
  },
    computed: {
        ...mapState ('course', [
            'courses'
        ]),
 
 ...mapGetters ('course', [
            'searchCourses'
        ]),
    },
    mounted () {
        this.setActualPageTitle('Cursos (' + Object.keys(this.courses).length + ')')
    },
  methods: {
      ...mapActions('settings', [
          'setActualPageTitle'
      ]),
      ...mapActions('course', [
          'deleteCourse', 'updateCourse', 'storeCoursePhoto'
      ]),

      closeDialog () {
          this.dialogCourse = false
          this.editObjectCourse = null
          this.courseSubscription = false
      },

      confirmDeleteCourse (id) {
          let name = this.courses[id].name
          this.$q.dialog({
              title: 'Confirmar',
              message: 'Quer mesmo deletar o course ' + name + '?',
              cancel: true,
              persistent: true
          }).onOk(() => {
              this.deleteCourse(id)
          })
      },

      saveImage (image, course) {

          let id = course.id

          this.storeCoursePhoto({
              id: id,
              file: image[0],
              successMessage: 'Imagem do curso actualizada com sucesso'
          })


      },
      
  },
  components: {
      GenericImageUpload,
    GlobalConfirmDialog,
    CoursesTableRowComponent,
    CoursesTableHeaderComponent,
    DialogAddEditCourses,
    SearchAndAddComponent,
    pdf,
    CourseSupscription
  },
  watch: {
      editObjectCourse (val) {
          if (val) {
              this.dialogCourse = true
          }
      },
      uploadProgress(val) {
          if (val > 98) {
              this.courseToChangePhoto = null
          }
      }
  }
}
</script>
