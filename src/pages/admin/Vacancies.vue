<template>
  <q-page padding class="q-pb-xl">

    <search-and-add-component
            @showDialog="dialogVocancy = true"
            :object="{
              canShowAddBtn: true,
              type: 'vacancy'
            }"
    >
      <q-menu
          transition-show="rotate"
          transition-hide="rotate"
      >
        <q-list style="min-width: 100px">
          <q-item clickable>
            <q-item-section>Publicadas hoje </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Publicadas ontem</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Publicadas nesta semana</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section>Ordenar: por recentes</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Ordenar: por antigas</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section>Mostrar: ocultadas</q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>Mostrar: deletadas</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </search-and-add-component>

    <!-- content -->
    <div class="row">
      <vacancy-component
        v-for="(vacancy, id) in searchVacancies(vacancies)"
        :vacancy="Object.assign({id: id}, vacancy)"
        :key="id"
        :id = "id"
         @editVacancy="editObjectVacancy = $event"

      />

    </div>

    <dialog-add-edit-vacancy
        :dialogVocancy="dialogVocancy || !!editObjectVacancy"
        @closeDialog="closeDialog"
        :editObjectVacancy="editObjectVacancy"
    />
    
  </q-page>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    import VacancyComponent from "../../components/admin/VacancyComponent";
    import SearchAndAddComponent from "../../components/admin/SearchAndAddComponent";
    import DialogAddEditVacancy from "../../components/admin/dialogs/DialogAddEditVacancy";
    export default {
        components: {DialogAddEditVacancy, SearchAndAddComponent, VacancyComponent},
        // name: 'PageName',
    data () {
      return {
        dialogVocancy: false,
        public: false,
        name: '',
        accept: false,
        age: '',
        editObjectVacancy: null
      }
    },
    computed: {
        ...mapState ('vacancy',['vacancies']),
        ...mapGetters ('vacancy',['searchVacancies'])
        
    },

    mounted () {
        this.setActualPageTitle('Vagas')
    },


    methods: {
        ...mapActions('settings', [
            'setActualPageTitle'
        ]),
        closeDialog () {
            this.dialogVocancy = false
            this.editObjectVacancy = null
        },

    },
  }
</script>
