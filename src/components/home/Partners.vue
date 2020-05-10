<template>
  <div>
    <div class="row justify-center bg-grey-2 q-pt-md">
      <div class="text-center text-h4">
        Blog
      </div>
    </div>
    <q-carousel
      animated
      v-model="slide"
      
      navigation
      infinite
      class="bg-grey-2"
      style="height: 300px;"
      
    >
      <q-carousel-slide :name="1">
        <div class="row justify-center">
          <div class="col-xs-12 col-sm-6 col-md-2 q-pa-md" v-for="(post, id, index) in posts" :key="id" v-if="post.publishedAt">
            <q-card class="my-card" >
      <q-img
        :src="postImage(post)"
        basic
        style="height: 200px;" 
        @click="details(id)"

      >
        <div class="absolute-bottom text-subtitle1 text-center text-no-wrap">
          {{ post.title | limitLength(25) }}
        </div>
      </q-img>
    </q-card>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

export default {
  // name: 'ComponentName',
  
  data () {
    return {
      slide: 1
    }
  }
   ,  computed: {
        ...mapState ('post', [
            'posts'
        ]),
    },
    methods: {
        postImage (post) {
            return post && post.image ? post.image : '/statics/icons/icon-128x128.png'
        },

         details(id){

          this.$router.push('blog/detalhes/' + id);
        }
    },
    filters: {
            limitLength (val, length) {
                return val.length > length ? val.substr(0, length) + '...' : val
            }
  }}

</script>
