<template>
    <div class="q-pa-md" style="max-width: 400px">

        <q-form
                @submit="onSubmit"
                class="q-gutter-sm"
        >
            <q-input            
                outlined
                bg-color="white"
                v-model="customer.name"
                label="Nome do cliente:"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Por favor introduz o nome do cliente']"
            />
            
              <q-input
                outlined
                bg-color="white"
                v-model="customer.phone"
                label="Telefone"
                mask="8# #######"
                fill-mask
                lazy-rules
                hint="88 6101010"
                :rules="[ val => val && val.length > 7 || 'Por favor introduz o telefone do cliente']"
              />

            <q-input
                v-model="customer.email"
                type="email"
                prefix="Email:"
                outlined
                bg-color="white"
            >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>

            <div class="q-gutter-xs">
                <q-btn label="Gravar" type="submit" color="primary"/>
                <q-btn label="Cancelar" @click="$emit('closeForm')" color="orange"/>
            </div>
        </q-form>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "CustomersAddEditForm",
        props: ['updateCustomerData'],
        data () {
            return {
                customer : {
                    name: '',
                    image: '',
                    phone: '',
                    email : ''
                }
            }
        },
        mounted () {

            if (this.updateCustomerData) {
                this.customer = {
                    name : this.updateCustomerData.name ? this.updateCustomerData.name : '',
                    image : this.updateCustomerData.image ? this.updateCustomerData.image : '',
                    phone : this.updateCustomerData.phone ? this.updateCustomerData.phone : '',
                    email : this.updateCustomerData.email ? this.updateCustomerData.email : '',
                }
            }

        },
        methods: {
            ...mapActions ('customer', [
                'addCustomer', 'updateCustomer'
            ]),

            onSubmit () {

                // console.log('this.customer: ', this.customer)
                // return
                if (this.updateCustomerData) {

                    this.updateCustomer ({
                        id:      this.updateCustomerData.id,
                        updates: this.customer
                    })

                } else {

                    this.addCustomer (this.customer)

                }

                this.$emit('closeForm')

            }
        }
    }
</script>

<style scoped>

</style>