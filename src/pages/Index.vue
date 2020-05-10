<template>
  <q-page>
    <Header />
    <Services />
    <Map />
    <Footer />
  </q-page>
</template>

<script>
import Header from "components/home/Header.vue"
import Services from "components/home/Services.vue"
import Map from "components/home/Map.vue"
import Footer from "components/home/Footer.vue"
export default {
  name: 'PageIndex',
  components: {
    Header,
    Services,
    // Map,
    Footer
  }
}
</script>
