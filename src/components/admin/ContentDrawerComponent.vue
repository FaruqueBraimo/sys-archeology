<template>
    <q-scroll-area class="fit">
        <q-list>

            <template>
                <q-item
                    @click="$emit('closeDrawer')"
                    clickable
                    v-ripple
                >
                    <q-item-section avatar>
                        <b>Clientes</b>
                        <q-icon class="absolute-right q-ma-sm" name="close" />
                    </q-item-section>
                </q-item>

                <q-separator />

                <customers-add-edit-form
                    v-if="canShowAddForm || !!updateCustomerData"
                    :updateCustomerData="updateCustomerData"
                    @closeForm="closeForm ()"
                />

                <customers-image-update
                    v-else-if="updateCustomerPhoto"
                    :updateCustomer="updateCustomerPhoto"
                    @closeForm="updateCustomerPhoto = null"

                />

                <div
                    v-else
                    class="flex flex-center"
                    style="width: 100%;height: 200px"
                >
                    <q-btn @click="canShowAddForm = true" icon="add" label="Adicionar" color="" flat />
                </div>

                <q-separator />

            </template>

            <customer-component
                v-for="(customer, index) in customers"
                :key="index"
                :customer="customer"
                @updateCustomerPhoto="updateCustomerPhoto = Object.assign({id: index}, customer)"
                @updateCustomerData="updateCustomerData = Object.assign({id: index}, customer)"
                @deleteCustomer="deleteCustomerConfirm(index)"
            />

            <!--<q-separator v-if="menuItem.separator" />-->

        </q-list>
    </q-scroll-area>
</template>

<script>
    import CustomersAddEditForm from "./customers/CustomersAddEditForm";
    import { mapState, mapActions } from 'vuex'
    import CustomerComponent from "./customers/CustomerComponent";
    import CustomersImageUpdate from "./customers/CustomersImageUpdate";

    export default {
        name: "ContentDrawerComponent",
        components: {CustomersImageUpdate, CustomerComponent, CustomersAddEditForm},
        data () {
            return {
                canShowAddForm: false,
                updateCustomerData: null,
                updateCustomerPhoto: null
            }
        },
        computed: {
            ...mapState ('customer', [
                'customers', 'loading'
            ])
        },
        methods: {
            ...mapActions ('customer', ['deleteCustomer']),
            closeForm () {
                this.canShowAddForm = false;
                this.updateCustomerData = null
            },
            deleteCustomerConfirm (id) {

                let name = this.customers[id].name

                this.$q.dialog({
                    title: 'Deletar cliente',
                    message: 'Quer mesmo deletar o cliente \'' + name + '\'?',
                    cancel: true,
                    persistent: true,
                    ok: {
                        color: 'red-8'
                    }
                }).onOk(() => {

                    this.deleteCustomer (id)

                })

            }
        },
        watch: {
            loading (val) {

                this.canShowAddForm = val
                this.updateCustomerPhoto = null

            }
        }
    }
</script>

<style scoped>

</style>