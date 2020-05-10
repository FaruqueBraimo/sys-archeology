<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pt-md q-pb-md">
      Perfiler   </div>
    <div class="row q-gutter-md">
      <div class="col-4">
        <q-card style="border-radius: 20px;">
          <q-img 
            :src="candidateImage(employee)"
            style="height: 250px; min-height: 250px;"
          />
          <q-card-section class="details">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-h6">{{ employee.name }}</q-item-label>
                  <q-item-label caption line="1">{{ positionNames(employee.professions, positions) }}</q-item-label>
                  
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="place" />
                </q-item-section>
                  <q-item-section>
                    {{ employee.bairro }}
                  </q-item-section>
              </q-item>

              <q-item v-if="employee.cvUrl" class="q-mb-lg" clickable>
                <q-item-section avatar>
                  <q-icon name="attachment" />
                </q-item-section>
                <q-item-section @click="openLink()">
                  Ver Curriculo
                </q-item-section>
              </q-item>
              <q-item v-else class="q-mb-lg" clickable>
                <q-item-section avatar>
                  <q-icon name="attachment" color="red" />
                </q-item-section>
                <q-item-section>
                  CV não anexado!
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>
        <!--<q-scroll-area-->
          <!--:thumb-style="thumbStyle"-->
          <!--:content-style="contentStyle"-->
          <!--:content-active-style="contentActiveStyle"-->
          <!--style="height: 35vh;"-->
          <!--class=" q-mt-lg"-->
        <!--&gt;-->
          <!--<div class="q-pa-xs">-->
            <!--<q-list bordered padding class="rounded-borders">-->
              <!--<q-item clickable v-ripple>-->
                <!--<q-item-section avatar>-->
                  <!--<q-avatar icon="place" color="grey" text-color="white" />-->
                <!--</q-item-section>-->

                <!--<q-item-section>-->
                  <!--<q-item-label lines="1">Profissao</q-item-label>-->
                  <!--<q-item-label class="text-h6">February 22nd, 2019</q-item-label>-->
                <!--</q-item-section>-->

              <!--</q-item>-->

              <!--<q-item clickable v-ripple>-->
                <!--<q-item-section avatar>-->
                  <!--<q-avatar icon="place" color="grey" text-color="white" />-->
                <!--</q-item-section>-->

                <!--<q-item-section>-->
                  <!--<q-item-label lines="1">Profissao</q-item-label>-->
                  <!--<q-item-label class="text-h6">February 22nd, 2019</q-item-label>-->
                <!--</q-item-section>-->

              <!--</q-item>-->

              <!--<q-expansion-item>-->
                 <!--<template v-slot:header>-->
                  <!--<q-item-section avatar>-->
                    <!--<q-avatar icon="av_timer" color="grey" text-color="white" />-->
                  <!--</q-item-section>-->

                  <!--<q-item-section class="text-h6">-->
                    <!--Experiencia-->
                  <!--</q-item-section>-->

                <!--</template>-->
                <!--<q-item-->
                  <!--class="bg-white"-->
                <!--&gt;-->
                  <!--<q-tooltip-->
                    <!--transition-show="flip-right"-->
                    <!--transition-hide="flip-left"-->
                  <!--&gt;-->
                    <!--Jun 2000 - Ago 2000-->
                  <!--</q-tooltip>-->
                  <!--&lt;!&ndash; <q-item-section>-->
                    <!--<q-btn label="Hover me" color="primary">-->
                      <!--<q-tooltip>-->
                        <!--Jun 2000 - Ago 2000-->
                      <!--</q-tooltip>-->
                    <!--</q-btn>-->
                  <!--</q-item-section> &ndash;&gt;-->

                  <!--<q-item-section side avatar>-->
                    <!--<q-avatar color="grey" text-color="white" icon="directions" />-->
                  <!--</q-item-section>-->
                  <!--<q-item-section>-->
                    <!--<q-item-label class="text-h6">Contabilista</q-item-label>-->
                    <!--<q-item-label class="text-h6 text-grey">Empresa de contabilidade</q-item-label>-->
                     <!---->
                  <!--</q-item-section>-->
                <!--</q-item>-->

              <!--</q-expansion-item>-->
            <!--</q-list>-->
          <!--</div>-->
        <!--</q-scroll-area>-->
        
      </div>
      <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 80vh;"
          class="col-7 q-mt-lg"
        >
          <pdf :src="employee.cvUrl" style="width:100%"></pdf>
      </q-scroll-area>
      <!-- <pdf src="statics/nelziocv.pdf"></pdf> -->
    </div>
    <!-- <pdf src="statics/nelziocv.pdf"></pdf> -->
    <!-- <div class="q-pt-md q-pb-md">
      Eventos da Julieta
    </div> -->

    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_left" color="grey" @click="$router.go(-1)" />
    </q-page-sticky>
  </q-page>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { openURL } from 'quasar'
import pdf from 'vue-pdf'
export default {
  // name: 'PageName',
  components: {
    pdf
  },

  computed: {
      ...mapState ('employee',['employees', 'loading']),
      ...mapState ('position',['positions']),
      ...mapGetters('candidate', [
          'candidateImage', 'positionNames', 'employees'
      ]),
    contentStyle () {
      return {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      }
    },
      employeeId(){
          return this.$route.params.id;
      },

      employee(){
          return   this.employees()[this.employeeId]
      },

    contentActiveStyle () {
      return {
        backgroundColor: '#eee',
        color: 'black'
      }
    },

    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      }
    }
  },

    methods: {
      openLink () {
          openURL(this.employee.cvUrl)
      }
    }
}
</script>
