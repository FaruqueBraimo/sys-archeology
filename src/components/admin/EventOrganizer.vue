<template>
  <div class="row q-gutter-md">
    <q-card
			class="my-card shadow-4 col-md-3 col-sm-12 col-xs-12"
			v-for="i in 2"
			:key="i"
    >
			<div class="row no-wrap">
					<q-img
					src="https://scontent.fmpm2-1.fna.fbcdn.net/v/t1.0-9/68258226_474606049753840_1144116151635148800_n.jpg?_nc_cat=102&_nc_oc=AQkEADZvm6aLSo3x_D5q3D7njQchVOb6VUbG0uVVtTdepWzXCyr5ewOwKJ5A7gIY7vs&_nc_ht=scontent.fmpm2-1.fna&oh=aeaab9b549b352a4cc6a82a36650639b&oe=5DA2BFA9"
					spinner-color="white"
					style="width: 300px; border-radius: 4%;"
					/>

					<div class="column items-left q-pa-xs q-gutter-md">
						<q-item>
							<q-item-section class="q-gutter-md">
								<q-item-label class="text-h6">Matemática Basica</q-item-label>
								<q-item-label caption lines="1">1078 Av. Karl Marx, Maputo</q-item-label>
								<q-item-label caption lines="1">
									<q-avatar
									size="35px" outline>
										<q-img src="https://cdn.pixabay.com/photo/2017/05/12/07/24/womens-2306309_960_720.jpg" />
									</q-avatar>
									<q-avatar
									size="35px"
									style="top: 0; transform: translateX(-30%);">
										<q-img src="https://static1.fiquediva.com.br/articles/8/38/48/@/50493-a-ashleycoco-e-modelo-adora-fazer-pen-article_gallery_portrait-1.jpg" />
									</q-avatar>
									<q-avatar
									size="35px" 
									style="top: 0; transform: translateX(-60%);">
										<q-img src="https://static1.fiquediva.com.br/articles/8/38/48/@/50483-a-jade-kendle-do-instagram-lipstickn-article_gallery_portrait-1.jpg" />
									</q-avatar>
									<q-avatar size="35px" color="green" text-color="white"
									style="top: 0; transform: translateX(-90%);">
									<div class="text-body2">+11</div>
									</q-avatar>
									<q-btn
										color="blue-9"
										label="detalhes"
										size="sm"
										@click="$emit('dtl-dialog')"
									/>
								</q-item-label>
							</q-item-section>
						</q-item>
					</div>
			</div>
    </q-card>
	</div>
</template>


<script>
export default {
	props: [],
	data () {
		return {}
	}
}
</script>

<style lang="stylus">
</style>