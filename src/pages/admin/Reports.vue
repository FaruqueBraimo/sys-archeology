<template>
  <q-page padding class="flex justify-left q-pt-xl  q-pl-xl">
     
    <DialogAddEditReport
        :dialogReport="dialogReport"
        :editObjectReport="editObjectReport"
        @closeDialog="closeDialog()"
    
    />
    {{reports}}

    <report-arq v-for="i in reports" :repo = i :key="i" class="q-pa-md" />
   

    <q-page-sticky position="bottom-right" :offtset="[17, 17]">
      <q-btn
        unelevated
        size="xl"
        class="q-pa-sm"
        fab
        icon="add"
        color="primary"
        @click="dialogReport=true"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import reportArq from "../../components/admin/reports/reportArq";
import DialogAddEditReport from "../../components/admin/dialogs/DialogAddEditReport";

export default {
  components: {
    reportArq, DialogAddEditReport
    
  },
    computed: {
        ...mapState ('report', [
            'reports', 
        ]),
       
       
    },

  data() {
    return {
      dialogReport : false,
      editObjectReport: false
    }
  },
  mounted() {
    this.setActualPageTitle("Relatorios dos Arqueologos");
  },
  methods: {
    ...mapActions("settings", ["setActualPageTitle"]),

    ...mapActions("request", ["deleteSubscriber"]),
      closeDialog () {
          this.dialogReport = false
          this.editObjectReport = null
      },

    remove(id) {
      this.$q
        .dialog({
          title: "Confirmação",
          message: "Quer remover este pedido?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          // console.log('>>>> OK')
          this.deleteSubscriber(id);
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
    
    }
  }
};
</script>
