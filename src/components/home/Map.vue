<template>
  <div>
		<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14353.777536521164!2d32.60768556977539!3d-25.920629649999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-PT!2smz!4v1571413400154!5m2!1spt-PT!2smz" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
  </div>
</template>

<script>

export default {

  data() {
    return {
      google: null,
      map: null,
      key: "AIzaSyBD9HEZo6FMx8MlHIjp6lGwIgn5NmTzbNc",
    }
  },
  computed: {
	},
	mounted () {
  }
}
</script>