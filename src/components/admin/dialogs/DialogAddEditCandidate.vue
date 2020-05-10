<template>
 
  <q-dialog v-model="toggleDialog" @show="onShowDialog">
                <span class= 'text-grey-7'> {{fetchCountries}} </span>

    <q-card style="width: 100vw;">
      <q-card-section class="row ">
        <div class="text-h6">Arqueologo</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="$emit('closeDialog')" />
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="row">
            <div :class="saveObject.image ? 'col-10' : 'col-12'">
              <q-input
                filled
                v-model="saveObject.name"
                label="Nome do Arqueologo *"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Preencha este campo'
                ]"
              />
            </div>
          </div>

          <q-select
            filled
            v-model="saveObject.country"
            :options="arrs"
            label="Nacionalidade"
           
          >
            
          </q-select>

          <div class="row">
            <div class="col-6">
              <q-input
                filled
                v-model="saveObject.contact"
                class="col-xs-6"
                label="Telefone *"
                type="number"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Preencha este campo'
                ]"
              />
            </div>
            <div class="col-6 q-pl-md">
              <q-input
                filled
                v-model="saveObject.birthDate"
                label="Data de nascimento *"
                mask="##-##-####"
                hint="DD-MM-AAAA"
                lazy-rules
                :rules="[
                  val => (val && val.length > 0) || 'Preencha este campo'
                ]"
              />
            </div>
          </div>

          <q-input
            filled
            v-model="saveObject.email"
            label="Email *"
            lazy-rules
            type="email"
            :rules="[val => (val && val.length > 0) || 'Preencha este campo']"
          />

          <q-input
            filled
            v-model="saveObject.address"
            label="Firma / Local de trabalho *"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Preencha este campo']"
          />
          <div class = 'row'> 
              <q-btn
             :label="selectedId ? 'Actualizar' : 'Registar'"
              type="submit"
              color="primary"
              unelevated
              :loading='loading'
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
      saveObject: {},
      model: [],
      arrs: ['Moçambique'],
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }
    };
  },
  computed: {
      ...mapState('candidate',['loading']),
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

    options(){},

    async fetchCountries() {
      let arrs = [];
      let url = "https://restcountries.eu/rest/v2/all";
      let response = await fetch(url);
      if (response.ok) {
        let json = await response.json();
     
         json.forEach(element => {
            this.arrs.push(element.name)
         });

    
       }
         return ''
    }
  },

  mounted() {
    this.initialize();
  },
  methods: {
    ...mapActions("candidate", ["addCandidate", "updateCandidate"]),

    showMessage() {
      alert(
        "Por favor, aguarde, ainda estamos a trabalhar para que seja possível carregar a imagem do perfil."
      );
    },
    initialize() {
      this.saveObject = {
        name: "",
        professions: [],
        contact: "",
        birthDate: "",
        country: "",
        address: "",
        description: "",
        email: "",
        school: "",
        
      };
    },

    onSubmit() {
      if (this.selectedId) {
        delete this.saveObject.id; //deletando Id

        this.updateCandidate({
          id: this.selectedId,
          updates: this.saveObject
        });
      } else {
        this.addCandidate(this.saveObject);
        
        
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
