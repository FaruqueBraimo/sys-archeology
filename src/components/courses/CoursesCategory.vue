<template>
  <div class="q-pa-sm">

      <div class="col-1"  style="border-radius: 20px ; width : 100% ;">   

       <div class="q-pt-md"  >
            <q-list bordered   style="border-radius: 5px">
              <q-item-label header>Filtros</q-item-label>
               <div class="q-ma-md">
                 <q-input borderless filled bounce="200"  placeholder="Pesquisar">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>

               </div>
                <q-expansion-item
                    v-model="expanded"
                    group="somegroup"
                    icon="explore"
                    label="Categorias disponiveis"
                    header-class="text-primary"
                     style="border-radius: 20px"
              >
                <q-card>
                  <q-card-section>
                    <q-option-group
                      :options="options"
                      label="Notifications"
                      type="checkbox"
                      v-model="CategorySelected"
                    />

                        <q-btn no-caps flat rounded  color="primary"  :label="showCategoryText" class="full-width" @click="showCategory =!showCategory" />

                  </q-card-section>
                </q-card>
              </q-expansion-item>



              <q-separator />




            </q-list>
          </div>
     </div>


    </div>


</template>

<script>
    import { mapActions, mapState } from 'vuex'

export default {
  // name: 'ComponentName',

  
  data () {
    return {
      img: 'https://uploads.metropoles.com/wp-content/uploads/2019/10/16152002/Screenshot_18330.jpg',
      text: '',
      group: [],
      showCategory:false,
      showCategoryText : "Ver todas categorias",
      CategorySelected :[] ,
      age: [],
      expanded: true
    }
    
  },
     computed: {
            ...mapState('area', ['areas']),
             options () {
                let arrs = []
                Object.keys(this.areas).forEach( (id,index) => {

                  if(this.showCategory === false){
                    
                    if(index < 3) {

                        arrs.push({
                            label: this.areas[id].title,
                            value: id,

                        })
                      this.showCategoryText = 'Ver todas categorias'
                  }}
                  else{
               
                    arrs.push({
                        label: this.areas[id].title,
                        value: id,
    
                    })
                    this.showCategoryText = 'Mostrar Menos'
                      
                  }

                })
                return arrs 
            },

}
,

watch: {

    CategorySelected: function (val) {

        this.$emit('selecionados', val)
    },

  
}


}
</script>












