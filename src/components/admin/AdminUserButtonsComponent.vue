<template>
  <div>
    <div class=" row no-wrap ">

      
      <q-btn
        class="q-ma-none q-pa-xs text-primary"
        exact
        rounded
        flat
        icon="info"
        label="Sobre"
        @click="alert = true"
      >
      <q-spinner-puff
          color="primary"
          size="2em"
        />
        <q-tooltip
            content-class="bg-amber text-black shadow-4"
            :offset="[10, 10]"
          >
            Saiba mais acerca da aplicação</q-tooltip>

      </q-btn>

    
      <q-btn
        class="q-ma-none q-pa-xs text-red-5"
        exact
        rounded
        flat
        icon="exit_to_app"
        label="Sair"
        @click="confirm"
        >
      <q-tooltip
            content-class="bg-amber text-black shadow-4"
            :offset="[10, 10]"
          >
            Clique  para sair da app</q-tooltip>

      </q-btn>

    </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center">
                    <q-avatar size="70px">
            <img src="statics/emblema.jpg" />
          </q-avatar>
          <div> República de Moçambique</div>
           <span>Ministerio da Cultura e Turismo</span>
            <p> Direcção Nacional do Património Cultural</p>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none text-body1">
        
          Esta aplicação é de autoria do estudante da Universidade Eduardo Mondlane,
          <span class="text-bold text-italic "> Agostinho Jose </span>, como trabalho do
          final do curso.
          <div>
            Se achar qualquer dúvida ou tiver alguma questão por reportar, envia
            um email para
            <a href="mailto:joseagostinhok@gmail.com"
              >joseagostinhok@gmail.com</a
            > ou pelo contacto telefónico <span class="text-bold  "> 847150718 </span>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Esta certo! " color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "AdminUserButtonsComponent",
  props: ["isAdmin", "isEditor"],
  data() {
    return {
      alert: false
    };
  },
  methods: {
    confirm() {
      this.$q
        .dialog({
          title: "Confirme",
          message: "Deseja sair do sistema?",
          ok: "Sim",
          cancel: true,
          cancel: "Não",
          persistent: true
        })
        .onOk(() => {
          this.$router.push("/");
        });
    }
  }
};
</script>

<style scoped></style>
