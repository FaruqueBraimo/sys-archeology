<template>
  <q-page padding v-if="vacancy">
    <!-- content -->
    <div class="row justify-center q-gutter-y-lg">
      <q-list class="rounded-borders col-md-8 " >

        <q-item>
          <q-item-section avatar>

            <q-avatar size="xl" text-color="white" class="q-mr-lg q-my-md">
              <q-img :src="customerImage(vacancy.customerId)" spinner-color="white" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h5">
              {{vacancy.title}}
            </q-item-label>
            <q-item-label v-if="vacancy.publishedAt" class="text-positive">
              <q-icon name="check_circle" /> Vaga publicada
            </q-item-label>
            <q-item-label v-else class="text-grey">
              <q-icon name="info" /> Esta vaga está no modo de rascunho!
            </q-item-label>
          </q-item-section>

        </q-item>

       
      </q-list>

      <q-card bordered class="my-card col-xs-12 col-md-8">
        <q-card-section>
          <div class="text-h6">Descrição</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section class="row">
            <div class="col-sm-1 ">
          <q-icon name="arrow_forward_ios" />
          </div>
          <div class="col-md-10 text-body1">
                {{vacancy.description}}
          </div>
        </q-card-section>
      </q-card>

      <q-card bordered class="my-card col-xs-12 col-md-8">
        <q-card-section>
          <div class="text-h6">Funções</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section class="row" >
          <div class="col-sm-1 ">
          <q-icon name="arrow_forward_ios" />
          </div>
          <div class="col-md-10 text-body1">
              {{vacancy.tasks}}
          </div>
        </q-card-section>
      </q-card>
      
      <q-card bordered class="my-card col-xs-12 col-md-8">
        <q-card-section>
          <div class="text-h6">Requisitos</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section class="row" >
          <div class="col-sm-1 ">
          <q-icon name="arrow_forward_ios" />
          </div>
          <div class="col-md-10 text-body1">
              {{vacancy.requirements}}
          </div>
        </q-card-section>
      </q-card>
      <div class="col-xs-12 col-md-8">
        <div class="row">
          <div class="col-4 q-px-sm">
            <q-btn
                    :loading="loading"
                    class="float-right full-width"
                    :size="$q.platform.is.mobile ? 'sm' : 'lg'"
                    color="red-8"
                    @click="removeVancancy(vacancyId, vacancy.title)"
            >
              <span><q-icon name="delete"/></span>
              <span>Deletar Vaga</span>

            </q-btn>
          </div>
          <div class="col-4">
            <q-btn
                    :loading="loading"
                    class="float-right full-width"
                    icon="edit"
                    :size="$q.platform.is.mobile ? 'sm' : 'lg'"
                    color="primary"
                    @click="editObjectVacancy = vacancy"
                    label="Actualizar Vaga"
            />
          </div>
          <div class="col-4 q-px-sm">
            <q-btn
                    v-if="!vacancy.publishedAt"
                    :loading="loading"
                    class="float-right full-width"
                    icon="access_time"
                    :size="$q.platform.is.mobile ? 'sm' : 'lg'"
                    color="grey"
                    @click="publishVacancy(vacancyId)"
                    label="Publicar Vaga"
            />
            <q-btn
                    v-else
                    :loading="loading"
                    class="float-right full-width"
                    icon="access_time"
                    :size="$q.platform.is.mobile ? 'sm' : 'lg'"
                    color="secondary"
                    @click="cancelPublication(vacancyId)"
                    label="Cancelar Publicação"
            />
          </div>
        </div>
      </div>

      <q-card bordered class="my-card col-xs-12 col-md-8">
        <div class="row">
          <div class="col-xs-6 col-md-10">
            <div  class="q-pa-sm" :class="$q.platform.is.desktop ? 'text-h6' : ''">
              Actualizar imagem:
              <q-btn
                    @click="vacancyToChangePhoto = vacancy"
                    icon="edit"
                    round
                    size="sm"
                    flat/>
            </div>
          </div>
          <div
                @click="vacancyToChangePhoto = vacancy"
                class="col-xs-6 col-md-2 q-pa-xs"
                style="height: 100px"
          >
              <img
                  style="width: 100%;height: 100%"
                  :src="getVacancyImage(vacancy)"
                  alt=""
              >
          </div>
        </div> 
      </q-card>
      
      <q-page-sticky position="top-right" :offset="[18, 18]">
        <q-btn round :size="!$q.platform.is.mobile ? 'lg' : ''" icon="keyboard_arrow_left" color="grey" @click="$router.go(-1)" />
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn round :size="!$q.platform.is.mobile ? 'lg' : ''" icon="mic" color="green" @click="dialogInterviews = true" />
      </q-page-sticky>


    </div>

    <!--Dialog para marcação de entrevistas-->
    <dialog-add-edit-interviews
        :dialogInterviews="dialogInterviews"
        :preStart="{vacancyId: vacancyId, customerId: vacancy.customerId}"
        @closeDialog="dialogInterviews = false"
    />

    <generic-image-upload
        :object="{label: 'Nova imagem da vaga:', action: 'saveImage', headerTitle: 'Imagem da vaga:'}"
        :toChangePhoto="vacancyToChangePhoto"
        @closeForm="vacancyToChangePhoto = null"
        @saveImage="saveImage($event)"
    />

    <!--Dialog para publicação de vagas-->
    <dialog-add-edit-vacancy
        :dialogVocancy="!!editObjectVacancy"
        @closeDialog="editObjectVacancy = null"
        :editObjectVacancy="editObjectVacancy"
    />

  </q-page>
</template>

<script>
import DialogAddEditInterviews from "../../components/admin/dialogs/DialogAddEditInterviews";
 import {  mapState, mapActions, mapGetters } from 'vuex'
import DialogAddEditVacancy from "../../components/admin/dialogs/DialogAddEditVacancy";
import GenericImageUpload from "../../components/admin/dialogs/GenericImageUpload";
export default {
    components: {GenericImageUpload, DialogAddEditVacancy, DialogAddEditInterviews},

    data () {
        return {
            dialogInterviews: false,
            editObjectVacancy: null,
            vacancyToChangePhoto: null
        }
    },   

    computed: {
        ...mapState ('auth',['userAuth']),
        ...mapState ('vacancy',['vacancies', 'loading']),
        ...mapGetters ('vacancy',['getVacancyImage']),
        ...mapState ('customer', ['customers']),

        vacancyId(){
          return this.$route.params.id;
        },

        vacancy(){
           return   this.vacancies[this.vacancyId]
        }

    },
    methods: {
        ...mapActions('vacancy', ['updateVacancy', 'deleteVacancy', 'storeVacancyPhoto']),
        customerImage (id) {
            return id && this.customers[id] ? this.customers[id].image : '/statics/icons/icon-128x128.png'
        },
        publishVacancy (id) {

            this.updateVacancy({
                id: id,
                updates: {
                    updatedAt: new Date(),
                    publishedAt: new Date(),
                    publishedBy: this.userAuth.uid,
                },
                sucessMessage: 'Vaga publicada com sucesso!'
            })

        },
        cancelPublication (id) {

            this.updateVacancy({
                id: id,
                updates: {
                    updatedAt: new Date(),
                    publishedAt: null,
                    publishedBy: null,
                },
                sucessMessage: 'Publicação da vaga cancelada!'
            })

        },
        removeVancancy(id,titulo){
            this.$q.dialog({
                title: 'Confirmar',
                message: 'Quer mesmo deletar a vaga ' + titulo + '?',
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.deleteVacancy(id);
            })
        },
        saveImage (image) {

            let id = this.vacancyId

            this.storeVacancyPhoto({
                id: id,
                file: image[0],
                successMessage: 'Imagem da vaga actualizada com sucesso'
            })

        },
    },

 

}
</script>
