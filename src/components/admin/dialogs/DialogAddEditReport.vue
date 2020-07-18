<template>
  <q-dialog
    v-model="toggleDialog"
    @hide="$emit('closeDialog')"
  >
    <q-card style="width: 80vw;">
      <q-card-section class="row items-center">
        <div class="text-h6">Relatorios</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="$emit('closeDialog')" />
      </q-card-section>
      <q-card-section>
        {{ fetchCountries }}
        <q-form @submit="onSubmit" class="q-gutter-md">
          <div class="row">
            <div class="col-12 q-pa-sm">
              <q-select
                filled
                v-model="saveObject.arqId"
                :options="arrs"
                label="Arqueologo"
              />
            </div>
          
          <div class="col-12 q-pa-sm">
         
    <q-file      
      color="primary"
      outlined
      bottom-slots
      v-model="file"
      accept=".pdf,.docx, pdf/*"

      label="Relatorio fisico"
      counter
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>
      
   
      <template v-slot:hint>
       Tamanho
      </template>
    </q-file>

          </div>

  <div class="col-12 q-pa-sm">
	<q-input
      v-model="saveObject.description"
      filled
      type="textarea"
      label="Observacoes"
    />

          </div>
  

          </div>
           <div class="row">
            <q-btn
              label="  Registar"
              type="submit"
              color="primary"
              unelevated
              class=" full-width"
            />
            
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { date } from "quasar";
import { showErrorMessage } from "../../../functions/handle-error-messages";

export default {
  name: "DialogAddEditVacancy",
  props: ["dialogReport", "editObjectReport"],
  data() {
    return {
      saveObject: {},
        file: null,
      options: [],
      arrs: []
    };
  },
  computed: {
    ...mapState("license", ["licenses"]),

    toggleDialog: {
      get() {
        return this.dialogReport;
      },
      set(val) {
        this.$emit("closeDialog");
      }
    },

    fetchCountries() {
       let obj = {};
      Object.keys(this.licenses).forEach(element => {
       obj = this.licenses[element]

       
       this.arrs.push({
						value: obj.arqId ? obj.arqId.value : '',
						label: obj.arqId ? obj.arqId.label: ''
					});
      
           

      });

      return '';
    }
  },
  mounted() {
    this.options = this.objectOptions;
  },
  methods: {
       ...mapActions("report", ["addReport", 'storeReportPdf']),

    onSubmit() {

  
        this.addReport(this.saveObject)
        this.saveObject.file = this.file
        this.$emit("closeDialog");
      }
    },


  
};
</script>

<style scoped></style>
