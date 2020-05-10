<template>
  <div class="q-pa-md q-gutter-y-md">
    <div  v-for="(post, id) in posts" :key="id" v-if="post.publishedAt" class="col-xs-6">
      <q-card class="my-card">
        <q-img :src="postImage(post)"  spinner-color="white" />
        
        <q-card-section>
          <div class="text-h4">
          {{post.title}}
          </div>
        </q-card-section>
         <q-card-section>
          <div>
              {{post.resume }}

          </div>
        </q-card-section>
        <q-card-actions>
    <q-btn  outline color="primary" label="Ler mais"   @click="details(id)" />
        </q-card-actions>
      </q-card>
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        :max="5"
        :direction-links="true"
        size="20px"
      >
      </q-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // name: 'ComponentName',
  
  data () {
    return {
      current: 3
    }
  },
    computed: {
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
    }
    ,
     filters: {
            htmlStrip (val) {
              let div = document.createElement("div");
              div.innerHTML = val;
              let text = div.textContent || div.innerText || "";
             return text;
            }
            
            }
}
</script>
