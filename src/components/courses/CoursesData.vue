<template>
  <div class="q-pt-sm"  >
       <div class="row justify-left">

            <div v-if="Object.keys(employees).length === 0 "  >
                <p>Nenhum Curso encontrado</p>
            </div>
          
            
          <div v-else class="col-xs-12 col-md-4 q-pa-md" v-for="(course, id) in employees" :key="id" >
                
        <q-card class="my-card"  @click="$router.push('/course/' +  id)" >
          <!--<img src="https://cdn.quasar.dev/img/mountains.jpg">-->
            <div style="height: 200px" class="bg-grey-4">
                <q-img
                    style="width: 100%;height: 100%"
                    :src="getCourseImage(course)"
                />
            </div>
          <q-card-section style="height: 200px">
                <div class="text-h6">{{ course.name }}  </div>
                <div class="text-subtitle3">{{ course.paymentType }}</div>
                <q-rating size="24px" v-model="stars" :max="5" />
                  <div class=" row text-subtitle1 ">
                   <div class="col-6 justify-left">
                     {{ course.price ? course.price : '0' }},00 MT
                    </div>
                  </div>
          </q-card-section>
        </q-card>
          </div>
        </div>
      </div>
    
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    import { date } from 'quasar'

export default {
  props :['selecionados'],
  
  name: 'CoursesData',

  data () {
    return {
      img: 'statics/img/people/moca-curso.jpg',
      text: '',
        stars: 4,
    
  }}

  ,
   computed: {
          ...mapState ('course', [
            'courses'
        ]),
       ...mapGetters('course', ['getCourseImage']),
        employees () {
            let crs = {}

            if (!this.selecionados.length )  {
                 return this.courses
            }

            Object.keys(this.courses).forEach(key => {

                let cour = this.courses[key]

                if(this.selecionados.includes(cour.areaId)) {

                             crs[key] = cour
                     }

            })
        return crs
        }
                

              
       },
      
}
</script>

