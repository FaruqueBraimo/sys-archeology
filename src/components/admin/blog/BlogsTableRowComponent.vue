<template>
    <tr>
        <td class="text-left">
            <!--Post publicado-->
            <q-btn
                v-if="post.publishedAt"
                rounded
                icon="check_circle"
                color="positive"
                round
                flat
                size="lg"
            >
            </q-btn>
            <!--Post em rascunho-->
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
                @click="$emit('changePhoto', post)"
                rounded
                size="100px"
            >
                <q-img :src="postImage" spinner-color="white" />
            </q-avatar>
        </td>
        <td class="text-left">{{ post.title }}</td>
        <!--<td class="text-right" v-html="post.body"></td>-->
        <td class="text-right">{{ post.publishedAt ? 'Publicado' : 'Rascunho' }}</td>
        <td class="text-right q-gutter-md">
            <template>
                <!--Publica caso não esteja publicado-->
                <q-btn
                    v-if="!post.publishedAt"
                    color="white"
                    text-color="black"
                    icon="save"
                    label="Publicar"
                    @click="publishPost(post.id)"
                />
                <!--Torna rascunho, caso tenha sido publicado-->
                <q-btn
                    v-else
                    color="primary"
                    icon="access_time"
                    label="Tornar rascunho"
                    @click="cancelPublication(post.id)"
                />

            </template>
            <q-btn
                color="white"
                text-color="primary"
                flat
                round
                icon="edit"
                @click="$emit('editPost', post)"
            >
              <q-tooltip content-class="bg-indigo" :offset="[10, 10]">
                Editar Posts
              </q-tooltip>
            </q-btn>

            <q-btn
                color="white"
                text-color="red"
                flat
                round
                icon="delete"
                @click="$emit('deletePost', post)"
            >
              <q-tooltip content-class="bg-red" :offset="[10, 10]">
                Remover post
              </q-tooltip>
            </q-btn>


        </td>
    </tr>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        name: "BlogsTableRowComponent",
        props: ['post', 'positions'],
          data () {
            return {
              isFunc: false
            }
          },
        computed: {
            ...mapState ('auth',['userAuth']),
            postImage () {
                return this.post && this.post.image ? this.post.image : '/statics/icons/icon-128x128.png'
            }
        },

      methods: {
          ...mapActions('post', ['updatePost']),
          publishPost (id) {

              this.updatePost({
                  id: id,
                  updates: {
                      updatedAt: new Date(),
                      publishedAt: new Date(),
                      publishedBy: this.userAuth.uid,
                  },
                  sucessMessage: 'Post publicado com sucesso!'
              })

          },
          cancelPublication (id) {

              this.updatePost({
                  id: id,
                  updates: {
                      updatedAt: new Date(),
                      publishedAt: null,
                      publishedBy: null,
                  },
                  sucessMessage: 'Post colocado no modo de rascunho!'
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
