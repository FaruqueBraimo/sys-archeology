<template>
    <tr>
        <td class="text-left">
            <!-- <q-avatar @click="$emit('changePhoto', candidate)" color="red" text-color="white">
                <q-img :src="getSmallImage(candidateImage(candidate))" spinner-color="white" />
            </q-avatar> -->
            {{ candidate.name }}
        </td>
        <td class="text-left">{{ candidate.contact }}</td>
        <td class="text-left">{{ candidate.country }}</td>
        <td class="text-left">{{ candidate.email }}</td>
        <td class="text-left"> <span class ='text-bold'> BI </span> - 1234567895B </td>
         <td class="text-left">{{ candidate.address }}</td>

        <td class="text-center ">
           

            <q-btn
               
                color="white"
                text-color="black"
                icon="receipt"
                label="Licenças"
                size="sm"


            >

             
              <q-tooltip   content-class="bg-amber text-black shadow-4"
             :offset="[10, 10]">
                Ver detalhes licencas
              </q-tooltip>
            </q-btn>

            

            <q-btn
                color="white"
                text-color="primary"
                flat
                round
                icon="edit"
                @click="$emit('editCandidate', candidate)"
            >
              <q-tooltip content-class="bg-indigo" :offset="[10, 10]">
                Editar dados do arqueologo
              </q-tooltip>
            </q-btn>

            <q-btn
                color="white"
                text-color="red"
                flat
                round
                icon="delete"
                @click="$emit('deleteCandidate', candidate)"
            >

              <q-tooltip content-class="bg-red" :offset="[10, 10]">
                Remover dados do arqueologo
              </q-tooltip>
            </q-btn>


        </td>


        <q-dialog
            v-model="showCV"
            maximized
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card class="full-width">
                <q-bar>
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h3 text-center">{{ candidate.name }}</div>
                </q-card-section>

                <q-card-section>
                    <pdf :src="candidate.cvUrl" style="width: 100%"></pdf>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Fechar" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </tr>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "CandidatesTableRowComponent",
        components: {
           
        },
        props: ['candidate'],
          data () {
            return {
              isFunc: false,
              showCV: false
            }
          },
        computed: {
            ...mapGetters('candidate', [
                'positionNames', ''
            ]),
            ...mapGetters('auth', [
                'getSmallImage'
            ]),


        },

      methods: {
      },
      watch: {
        isFunc (val) {
          if (val) {
            this.$emit('confirm', val)
            alert(val)

          }
        }
      }
    }
</script>

<style scoped>
</style>
