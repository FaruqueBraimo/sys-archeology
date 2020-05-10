<template>
    <q-item

            clickable
            v-ripple
    >

        <q-item-section avatar @click="$emit('updateCustomerPhoto')">

            <q-img :src="customerImage" />

        </q-item-section>
        <q-item-section>
            {{ customer.name }}
        </q-item-section>
        <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
                <!--TODO: Implementar a remoção do cliente-->
                <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="$emit('deleteCustomer')"
                />

                <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="edit"
                    @click="$emit('updateCustomerData')"
                />

            </div>
        </q-item-section>

    </q-item>
</template>

<script>
    export default {
        name: "CustomerComponent",
        props: ['customer'],
        computed: {
            customerImage () { //TODO: carregar a imagem mais pequena (200x200), porque do momento mostra a original e demora a baixar,...
                return this.customer.image ? this.customer.image  : '/statics/icons/icon-128x128.png'
            }
        },
        mounted () {
            // console.log('customer: ', this.customer)
        }
    }
</script>

<style scoped>

</style>