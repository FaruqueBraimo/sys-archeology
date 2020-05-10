<template>
  <div class="q-pa-md q-gutter-y-md">
    <div class="text-h5">
      Artigos Recentes
    </div>
    <div v-for="(post, id, index) in posts" :key="id" v-if="post.publishedAt">
      <q-card class="my-card">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar rounded size="50px">
              <q-img :src="postImage(post)" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            {{ post.title }}
          </q-item-section>
        </q-item>
      </q-card>
      
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
    computed: {
        ...mapState ('post', [
            'posts'
        ]),
    },
    methods: {
        postImage (post) {
            return post && post.image ? post.image : '/statics/icons/icon-128x128.png'
        }
    }
}
</script>
