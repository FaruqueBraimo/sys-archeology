<template>
	<div>
	  <vue-pdfjs :url="url" :type="1"></vue-pdfjs>

	</div>
</template>
<script>
import vuePdfjs from 'vue-pdfjs'

export default {
	components: {
	 vuePdfjs
  },
  
	data () {
		return {
		
			
			url:'https://firebasestorage.googleapis.com/v0/b/arqueologs.appspot.com/o/reports%2FH9bAuBRNf0IRRYLODd7l.pdf?alt=media&token=5730f366-a9b4-44b5-a705-eb72c4d61e53',
		
		}
	},

	
}
</script>