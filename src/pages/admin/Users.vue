<template>
  <q-page padding>
    <!-- content -->

    <div class="row">

      <search-and-add-component
        @showDialog="dialogCandidate = true"
        :object="{
          canShowAddBtn: true,
          style:  'col-xs-12 col-md-8 offset-md-2'
        }"
      >
        <q-menu
            transition-show="rotate"
            transition-hide="rotate"
        >
          <q-list style="min-width: 100px">
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
              <q-item-section>Mostrar: admins</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Mostrar: normais</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Mostrar: deletados</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </search-and-add-component>

      <div
        class="col-xs-12 col-md-8 offset-md-2"
        style="margin-bottom: 70px"
        :style="$q.platform.is.mobile ? 'width: 100%' : ''"
      >
        <q-markup-table>

          <user-table-head-component />

          <tbody>

            <user-table-row-component
                v-for="(user, i) in users"
                :key="i"
                :user="user"
                @confirm="confirm = $event"
            />

          </tbody>
        </q-markup-table>
      </div>
    </div>

    <dialog-add-edit-candidate
        :dialogCandidate="dialogCandidate"
        @closeDialog="dialogCandidate = false"
    />

    <global-confirm-dialog :confirm="confirm" @closeDialog="confirm = false"/>

  </q-page>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import SearchAndAddComponent from "../../components/admin/SearchAndAddComponent";
  import DialogAddEditCandidate from "../../components/admin/dialogs/DialogAddEditCandidate";
  import UserTableRowComponent from "../../components/admin/users/UserTableRowComponent";
  import UserTableHeadComponent from "../../components/admin/users/UserTableHeadComponent";

export default {
  // name: 'PageName',
  data () {
    return {
      confirm: false,
      dialogCandidate: false,
      name: '',
      text: '',
      accept: false,
      age: '',
      dialogUpCV: false,
    }
  },
    computed: {
        ...mapState('auth', [
            'users'
        ]),
    },
    mounted () {
        this.setActualPageTitle('Utilizadores (' + Object.keys(this.users).length + ')')
    },
  methods: {
      ...mapActions('settings', [
          'setActualPageTitle',
          'setGlobalConfirm',
      ]),
  },
  components: {
      
      UserTableHeadComponent,
      UserTableRowComponent,
      DialogAddEditCandidate,
      SearchAndAddComponent,
      pdf
  }
}
</script>
