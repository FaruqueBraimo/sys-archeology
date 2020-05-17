<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 120px">
        
        <q-btn  to="/admin" round flat>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-tooltip
            content-class="bg-amber text-black shadow-4"
            :offset="[10, 10]"
          >
            Usuario</q-tooltip
          >
        </q-btn>

        <q-toolbar-title>
          {{ globalConfigs.actualPageTitle }}
        </q-toolbar-title>

        <div> 
        <q-card class="my-card text-center q-ml-xl" flat>
          <q-card-section>
             <q-avatar size="70px"> 
            <img src='statics/logo.jpg' />
           
          </q-avatar>
          <p class="text-bold text-h6 text-center"> Sistema de Gestão de Licenças Arqueologicas
</p>
           
          </q-card-section>
          
        </q-card>  
        </div>


        <q-space />

        <admin-user-buttons-component />
      </q-toolbar>
      
    </q-header>
   
    <q-page-container class="GPL__page-container">
      <router-view />

      <desktop-page-sticker v-if="$q.screen.gt.sm" />
    </q-page-container>
  </q-layout>
</template>

<script>
import ContentDrawerComponent from "../components/admin/ContentDrawerComponent";
const menuList = [
  {
    icon: "inbox",
    label: "Inbox",
    separator: true
  },
  {
    icon: "send",
    label: "Outbox",
    separator: false
  },
  {
    icon: "delete",
    label: "Trash",
    separator: false
  },
  {
    icon: "error",
    label: "Spam",
    separator: true
  },
  {
    icon: "settings",
    label: "Settings",
    separator: false
  },
  {
    icon: "feedback",
    label: "Send Feedback",
    separator: false
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    separator: false
  }
];
import { mapActions, mapState } from "vuex";
import DesktopPageSticker from "../components/admin/DesktopPageSticker";
import AdminUserButtonsComponent from "../components/admin/AdminUserButtonsComponent";
import { showLoading } from "../functions/show-loading";
export default {
  name: "AdminBaseLayout",
  components: {
    ContentDrawerComponent,
    AdminUserButtonsComponent,
    DesktopPageSticker
  },
  data() {
    return {
      leftDrawerOpen: false,
      rightDrawerOpen: false,
      menuList,
      search: "",
      storage: 0.26,
      links1: [
        { icon: "home", text: "Home", to: "/admin" },
        { icon: "group", text: "Candidatos", to: "/admin/candidates" },
        { icon: "group", text: "Funcionarios", to: "/admin/employees" },
        { icon: "ion-megaphone", text: "Vagas", to: "/admin/vacancies" },
        { icon: "mic", text: "Entrevistas", to: "/admin/interviews" }
      ]
    };
  },
  computed: {
    ...mapState("settings", ["globalConfigs"]),
    ...mapState("auth", ["users", "userAuth"]),

    routePath() {
      return this.$route.fullPath;
    }
  },
  mounted() {
    this.$root.$on("showRightDrawer", newState => {
      console.log("global event called, to charge rightDrawer...");
      this.rightDrawerOpen = !this.rightDrawerOpen;
    });

    setTimeout(() => {
      this.rightDrawerOpen = false;
    }, 2000);

    // if (!Object.keys(this.users).length) {
    //     showLoading({
    //         message: 'Carregando os dados'
    //     })
    // }
  },
  watch: {
    users(val) {
      this.$q.loading.hide();
    }
  }
};
</script>

<style lang="sass">
.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px

  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
