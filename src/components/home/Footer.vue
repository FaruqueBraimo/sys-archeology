<template>
	<div>
		<div class="bg-grey-10 text-white q-pa-xs-md q-pa-md-xl">
			<div class="row">
				<div class="col-xs-12 col-md-3 q-pa-md q-gutter-md">
					<div>
						<a href="http://norbconsulting.com/">
							<q-img src="statics/img/LogoNorb.png" spinner-color="white" />
						</a>
					</div>
					<div>
A Agencia NOR dispõe de um serviço adaptado, exclusivo, único e personalizado de recrutamento e seleção de candidatos Experientes e profissionais.					</div>
				</div>
				<!-- contacts -->
				<div class="col-12 col-md-3 q-gutter-md q-pa-md">
						<div class="text-h4">Contacte-nos</div>
						<q-separator dark />


							<div class="row">
								  <div class="col-md-1/2"> <q-icon name="place"  size="sm"/> </div>
						<div class="col-md-10">		Nº 185, Jose Mateus, Polana Cimento A, Maputo Mozambique</div>
						</div>
							
							<div class="row">
								  <div class="col-md-1/2"> <q-icon name="place"  size="sm"/> </div>
						<div class="col-md-10">	N4, Cruzamento de malhapsene, centro comercial, 2 andar </div>
						</div>	


						<div>
							<q-icon name="phone" size="sm" />
							+258 84 100 6600
						</div>

						<div>
							<q-icon name="phone" size="sm" />
							+258 84 166 0965
						</div>
						<div>
							<q-icon name="public" size="sm" />
							www.agencianor.co.mz
						</div>


						<div>
							<q-icon name="mail" size="sm" />
							Info@agencianor.co.mz
						</div>				
				</div>
				<div class="col-12 col-md-3 q-gutter-md q-pa-md">
						<div class="text-h4">Outros serviços</div>
						<q-separator dark />

					<div>
						<q-icon name="done" size="sm" />
							Staff para eventos
					</div>

					<div>
						<q-icon name="done" size="sm" />
							Apoio a eventos
					</div>

						<div>
						<q-icon name="done" size="sm" />
							Marketing promocional
					</div>
					
					<div>
						<q-icon name="done" size="sm" />
							Protocolos 
					</div>

					<div>
						<q-icon name="done" size="sm" />
							Terceirização de mão de obra
					</div>

					



					
				</div>
				<div class="col-12 col-md-3 q-gutter-md q-pa-md">
						<div class="text-h4 text-no-wrap	">Faça o seu pedido</div>
						<q-separator dark />
						
						
						<div class="q-pa-sm"> 


	<q-form
                class="q-gutter-sm"
				  @submit="submit"
    		    >
            <q-input            
                outlined
                bg-color="white"
                v-model="customer.name"
                label="Nome completo:"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Por favor introduz o nome ']"
            />
            
              
            <q-input
                v-model="customer.phone"
                type="phone"
                prefix="Telefone:"
                outlined
                bg-color="white"
				  lazy-rules
                :rules="[ val => val && val.length > 0 || 'Por favor introduz o Telefone ']"
            >
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>


			   <q-input            
                bg-color="white"
                v-model="customer.message"
                label="Mensagem:"
                lazy-rules
				 bottom-slots
				filled
				type="textarea"
            />

            <div class="">
                <q-btn label="Enviar" type="submit" color="cyan-5"  />
            </div>
        </q-form>
					
						</div>
				</div>
			</div>
		</div>
		<div>
			<q-toolbar class="bg-cyan-5 text-center text-white">
				<q-toolbar-title>
				<small> Uma empresa da Norb Consulting</small>
				</q-toolbar-title>
			</q-toolbar>
		</div>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data () {
            return {
                customer : {
                    name: '',
                    phone: '',
                    message : ''
                }
            }
        },
        mounted () {

        

        },
        methods: {
			 ...mapActions('request', [
              'addSubcriber',
		  ]),
		  
		  submit(){

			  //TODO: verificar a existencia de subscrito antes de salvar
			  this.addSubcriber(this.customer)
		  }


        }
    }
</script>

<style scoped>

</style>