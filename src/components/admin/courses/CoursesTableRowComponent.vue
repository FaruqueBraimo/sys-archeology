<template>
    <tr>
        <td class="text-left">
            <!--Curso publicado-->
            <q-btn
                v-if="course.publishedAt"
                rounded
                icon="done_all"
                color="positive"
                round
                flat
                size="lg"
            >
            </q-btn>
            <!--Curso em rascunho-->
            <q-btn
                v-else
                rounded
                icon="access_time"
                round
                flat
                size="lg"
            >
            </q-btn>
        </td>
        <td class="text-left">
            <q-avatar
                @click="$emit('changePhoto', course)"
                rounded
                size="100px"
            >
                <q-img :src="courseImage" spinner-color="white" />
            </q-avatar>
        </td>
        <td class="text-left">{{ course.name }}</td>
        <!--<td class="text-right" v-html="course.body"></td>-->
        <td class="text-right" v-if="course.price">{{ course.price }} MT</td>
        <td class="text-right" v-else>Gratuíto</td>
        <td class="text-right">{{ course.duration }}</td>
        <td class="text-right q-gutter-md">
            <template>
                <!--Publica caso não esteja publicado-->
                <q-btn
                    v-if="!course.publishedAt"
                    color="white"
                    text-color="black"
                    icon="save"
                    label="Publicar"
                    @click="publishCourse(course.id)"
                />
                <!--Torna rascunho, caso tenha sido publicado-->
                <q-btn
                    v-else
                    color="primary"
                    icon="access_time"
                    label="Tornar rascunho"
                    @click="cancelPublication(course.id)"
                />

            </template>
            
              <q-btn
                color="white"
                text-color="teal"
                flat
                round
                icon="person"
                @click="subscription(course.id)"
            >
              <q-tooltip content-class="bg-deep-orange" :offset="[10, 10]">
                Ver inscritos
              </q-tooltip>
            </q-btn>



            <q-btn
                color="white"
                text-color="primary"
                flat
                round
                icon="edit"
                @click="$emit('editCourse', course)"
            >
              <q-tooltip content-class="bg-indigo" :offset="[10, 10]">
                Editar Cursos
              </q-tooltip>
            </q-btn>
            

            <q-btn
                color="white"
                text-color="red"
                flat
                round
                icon="delete"
                @click="$emit('deleteCourse', course)"
            >
              <q-tooltip content-class="bg-red" :offset="[10, 10]">
                Remover course
              </q-tooltip>
            </q-btn>


        </td>
    </tr>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: "CoursesTableRowComponent",
        props: ['course'],
          data () {
            return {
              isFunc: false
            }
          },
        computed: {
            ...mapState ('auth',['userAuth']),
            courseImage () {
                return this.course && this.course.image ? this.course.image : '/statics/icons/icon-128x128.png'
            }
        },

      methods: {
          ...mapActions('course', ['updateCourse']),
          publishCourse (id) {

              this.updateCourse({
                  id: id,
                  updates: {
                      updatedAt: new Date(),
                      publishedAt: new Date(),
                      publishedBy: this.userAuth.uid,
                  },
                  sucessMessage: 'Curso publicado com sucesso!'
              })

          },

            subscription(val){
               this.$emit('courseSubscription', true)
                this.$emit('idCourse', val)
                console.log('valor' , val)

            } ,

          cancelPublication (id) {

              this.updateCourse({
                  id: id,
                  updates: {
                      updatedAt: new Date(),
                      publishedAt: null,
                      publishedBy: null,
                  },
                  sucessMessage: 'Curso colocado no modo de rascunho!'
              })

          },
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
