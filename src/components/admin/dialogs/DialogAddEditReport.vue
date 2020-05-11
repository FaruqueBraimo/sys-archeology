<template>
  <q-dialog
    v-model="toggleDialog"
    @show="onShowDialog"
    @hide="$emit('closeDialog')"
  >
    <q-card style="width: 80vw;">
      <q-card-section class="row items-center">
        <div class="text-h6">Vaga</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="$emit('closeDialog')" />
      </q-card-section>
      <q-card-section>
        {{ fetchCountries }}
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <div class="row">
            <div class="col">
              <q-select
                filled
                v-model="saveObject.arqId"
                :options="arrs"
                label="Arqueologo"
              />
            </div>
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
  props: ["dialogVocancy", "editObjectVacancy"],
  data() {
    return {
      saveObject: {},
      proxyDate: "",
      options: [],
      arrs: []
    };
  },
  computed: {
    ...mapState("license", ["licenses"]),

    toggleDialog: {
      get() {
        return this.dialogVocancy;
      },
      set(val) {
        this.$emit("closeDialog");
      }
    },

    fetchCountries() {
      Object.keys(this.licenses).forEach((element, key) => {
        let obj = [];
        obj = this.licenses[element].arqId;
        let obj2 = JSON.stringify(obj);
        let obj3 = [obj2]

        
            this.arrs.push({
                value : element,
                label : obj3[1]
            })

      });

      return "";
    }
  },
  mounted() {
    this.options = this.objectOptions;
  },
  methods: {
    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = this.objectOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.objectOptions.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    onSubmit() {
      let timeStamp = Date.now();
      let formattedString = date.formatDate(timeStamp, "YYYY-MM-DD");
      //
      if (this.saveObject.endAt < formattedString) {
        showErrorMessage("Data limite  não pode ser inferior a actual");
      } else {
        if (this.selectedId) {
          delete this.saveObject.id; //deletando Id

          this.updateVacancy({
            id: this.selectedId,
            updates: this.saveObject
          });
        } else {
          this.addVacancy(this.saveObject);
        }

        this.$emit("closeDialog");
      }
    },

    onShowDialog() {
      if (this.editObjectVacancy) {
        this.saveObject = this.editObjectVacancy;
      } else {
      }
    },

    onReset() {}
  }
};
</script>

<style scoped></style>
