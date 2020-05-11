<template>
  <q-dialog v-model="toggleDialog" @show="onShowDialog">
    <span class="text-grey-7"> {{ fetchCountries }} </span>

    <q-card style="width: 100vw;">
      <q-card-section class="row ">
        <div class="text-h6">Licença</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="$emit('closeDialog')" />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="row">
            <div class="col-6">
              <q-select
                filled
                v-model="saveObject.arqId"
                :options="arrs"
                label="Arqueologo"
              />
            </div>
            <div class="col-6 q-pl-md">
              <q-input
                filled
                v-model="saveObject.codeSite"
                label="Codigo do Sitio *"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Preencha este campo'
                ]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              
                <q-select
                filled
                :options="site"
                 v-model="saveObject.nameSite"
                label="Nome do Sitio *"
              />
            </div>
            <div class="col-6 q-pl-md">
              <q-input
                filled
                v-model="saveObject.longitude"
                label="Longitude do Sitio *"
                lazy-rules
                type="number"
                :rules="[
                  val => (val && val.length > 0) || 'Preencha este campo'
                ]"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <q-input
                filled
                v-model="saveObject.latitude"
                class="col-xs-6"
                label="Latitude *"
                type="number"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Preencha este campo'
                ]"
              />
            </div>
            <div class="col-6 q-pl-md">
              <q-select
                filled
                v-model="saveObject.province"
                :options="provinces"
                label="Provincia"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <q-input
                filled
                v-model="saveObject.district"
                label="Distrito *"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Preencha este campo'
                ]"
              />
            </div>
            <div class="col-6 q-pl-md">
              <q-input
                filled
                v-model="saveObject.startAt"
                label="Data de Inicio *"
                mask="##-##-####"
                hint="DD-MM-AAAA"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Preencha este campo'
                ]"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <q-input
                filled
                v-model="saveObject.endAt"
                label="Data do fim *"
                mask="##-##-####"
                hint="DD-MM-AAAA"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Preencha este campo'
                ]"
              />
            </div>

            <div class="col-6 q-pl-md">
              <q-select
                filled
                v-model="saveObject.typeResearch"
                :options="typeResearch"
                label="Tipo de Pesquisa"
              />
            </div>
          </div>

            
          </div>
          <div class="row">
            <div class="col-6">
              <q-select
                filled
                v-model="saveObject.period"
                :options="period"
                label="Periodo Arqueologico"
              />
            </div>

            <div class="col-6 q-pl-md">
              <q-select
                filled
                v-model="saveObject.patrimony"
                :options="patrimony"
                label="Patrimonio Cultural"
              />
            </div>
          </div>

          <q-input
            filled
            v-model="saveObject.director"
            label="Director  *"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Preencha este campo']"
          />
          <div class="row">
            <q-btn
              :label="selectedId ? 'Actualizar' : 'Registar'"
              type="submit"
              color="primary"
              unelevated
              :loading="loading"
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
export default {
  name: "DialogAddEditCandidate",
  props: ["dialogCandidate", "editObjectCandidate"],
  data() {
    return {
      saveObject: {
        arqValue : ''
      },
      model: [],
      arrs: [],
      provinces: [
        "Maputo Cidade",
        "Maputo Provincia",
        "Gaza",
        "Inhambane",
        "Sofala",
        "Tete",

        "Zambêzia",
        "Manica",
        "Nampula",
        "Niassa",
        "Cabo Delgado"
      ],
      typeResearch: [
        "Prospecção",
        "Acompanhemento",
        "Levantamento",
        "Salvaguarda",
        "Escavação",
        "Outros"
      ],
      period: [
        "Idade de Pedra Inferior(IPF)",
        "Idade de Pedra Média(IPM)",
        "Idade de Pedra Superior(IPS)",
        "Idade de Ferro Inferior(IFF)",
        "Idade de Ferro Médio(IFM)",
        "Idade de Ferro Superior(IFM)",
        "Pinturas Rupestres da idade Inferior",
        "Pinturas Rupestres da idade Média",
        "Pinturas Rupestres da idade Superior"
      ],
      patrimony : ['Conservação','Restauro', 'Reablitação','Gestão' ,'Reformação', 'Manutenção'],
     site : ['Terreste','Subaquatico', 'Gruta-Caverna']

    };
  },
  computed: {
    ...mapState("candidate", [ "candidates"]),
    ...mapState("license", ["loading"]),

    
    toggleDialog: {
      get() {
        return this.dialogCandidate;
      },
      set(val) {
        this.$emit("closeDialog");
      }
    },
    selectedId() {
      return this.editObjectCandidate ? this.editObjectCandidate.id : null;
    },

    options() {},

    fetchCountries() {
      Object.keys(this.candidates).forEach((element, key) => {
        this.arrs.push({
          value: element,
          label: this.candidates[element].name
        });
      });

      return "";
    }
  },

  mounted() {
    this.initialize();
  },
  methods: {
    ...mapActions("license", ["addlicense", "updatelicense"]),

    showMessage() {
      alert(
        "Por favor, aguarde, ainda estamos a trabalhar para que seja possível carregar a imagem do perfil."
      );
    },
    initialize() {
      this.saveObject = {};
    },

    onSubmit() {
      if (this.selectedId) {
        delete this.saveObject.id; //deletando Id
        this.saveObject.arqValue = this.saveObject.arqId.value
        this.updatelicense({
          id: this.selectedId,
          updates: this.saveObject
        });
      } else {
        this.addlicense(this.saveObject);
      }

      //    TODO: Fechar a dialog depois de add ou edit - (By Jose Seie, help wanted)
    },

    onShowDialog() {
      if (this.editObjectCandidate) {
        this.saveObject = this.editObjectCandidate;
      } else {
        this.initialize();
      }
    },

    onReset() {
      this.initialize();
    }
  }
};
</script>

<style scoped></style>
