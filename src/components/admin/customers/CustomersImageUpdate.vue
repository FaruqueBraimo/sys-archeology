<template>
    <div class="q-pa-md" style="max-width: 400px">

        <q-form
                @submit="onSubmit"
                class="q-gutter-md"
        >
            <div class="row">
                <q-uploader
                    :url="onSubmit"
                    :label="'Imagem do cliente: ' + updateCustomer.name"
                />
            </div>

            <div class="q-gutter-xs">
                <!--<q-btn label="Gravar" type="submit" color="primary"/>-->
                <q-btn label="Cancelar" @click="$emit('closeForm')" color="orange"/>

            </div>
        </q-form>

    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "CustomersImageUpdate",
        props: ['updateCustomer'],
        methods: {
            ...mapActions ('customer', [
                'storeCustomerPhoto'
            ]),

            onSubmit (val) {

                console.log('onSubmit: ', val[0])
                console.log('updateCustomer: ', this.updateCustomer)

                this.storeCustomerPhoto({
                    id: this.updateCustomer.id,
                    file:   val[0]
                })
            }
        }
    }
</script>

<style scoped>

</style>