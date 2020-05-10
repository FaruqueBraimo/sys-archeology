<template>
    <q-dialog
        v-model="toggleDialog"
      
    >
        <q-card style="width: 80vw;" >
            <q-card-section class="row items-center">
                <div class="text-h6">Subscritos ao Curso ({{size}})</div>
                <q-space />
                <q-btn
                    icon="close"
                    flat
                    round
                    dense
                    @click="$emit('closeDialog')"
                />
            </q-card-section>
            <q-card-section>

                <div class="q-pb-md">
    <q-markup-table >
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-center">Apelido </th>
          <th class="text-center">Email</th>
          <th class="text-center">Telefone</th>
          
        </tr>
      </thead>
      <tbody v-for="(i,id) in subscribes" :key="id">
        <tr>
          <td class="text-left">{{i.name}}</td>
         <td class="text-center">{{i.lastName}}</td>
        <td class="text-center">{{i.phone}}</td>
        <td class="text-center">{{i.email}}</td>

        </tr>
     
      </tbody>
    </q-markup-table>
  </div>
               

                    <div class="row" >
                        <q-btn
                        
                            color="cyan-6"
                            class="full-width"
                            label="Fechar"
                            @click="onSubmit"
                        />
                    </div>
                    
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: "DialogAddSubscritonCourses",
        props: ['courseSubscription', 'idCourse'],

       
        data () {
            return {
                size : '',
                saveObject: {
                    size: '' 
                },
              
            }
        },
        computed: {
          
        ...mapState ('subscribedCourse', [
            'subscribedCourses'
        ]),


 subscribes () {
                let emps = {}

                
                Object.keys(this.subscribedCourses).forEach(key => {

                    let emp = this.subscribedCourses[key]

                         if(this.subscribedCourses[key].courseId == this.idCourse) {
                                 emps[key] = emp
                               
                         }
                         else{

                         }
             
                })
                  this.size = Object.keys(emps).length
            return emps
        
       },

            toggleDialog : {
                get () {
                    if(this.courseSubscription){
                             return this.courseSubscription
                    }
                   
                },
                set (val) {
                    this.$emit('closeDialog')
                }
            },
            
         
        },
        mounted () {

      

        },
        methods: {

            ...mapActions('subscribedCourse', [
              'addSubcriber',
          ]),
           
            onSubmit () {

                   this.$emit('closeDialog')

            },


         

        }

    }
</script>

<style scoped>

</style>