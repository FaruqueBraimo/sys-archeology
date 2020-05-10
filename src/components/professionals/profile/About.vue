<template>
  <div class="q-pa-xl q-gutter-y-md">
    <q-card
      class="my-card"
    >
      <q-card-section>
        <div class="text-h6">Sobre</div>
      </q-card-section>

      <q-card-section>
      {{candidate.description }} 
       </q-card-section>
    </q-card>

    <q-card
      class="my-card"
    >
      <q-card-section>
        <div class="text-h6">Experiencia</div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar top>
              <q-icon name="work_outline" size="xl" />
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium text-h6">{{candidate.experience }} </span>
              </q-item-label>
              <q-item-label class="q-mt-xs text-body2">
              </q-item-label>
            </q-item-section>
          </q-item>

         
        </q-list>
      </q-card-section>
    </q-card>

    <q-card
      class="my-card"
    >
      <q-card-section>
        <div class="text-h6">Formação Academica</div>
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section avatar top>
              <q-icon name="school" size="xl" />
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium text-h6">{{candidate.school }}</span>
              </q-item-label>
              <q-item-label class="q-mt-xs text-body2">
              </q-item-label>
            </q-item-section>
          </q-item>

         
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  
   props: ['candidate'],
  data () {
    return {}
  }
}
</script>
