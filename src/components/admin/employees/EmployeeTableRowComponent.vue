<template>
    <tr>
        <td class="text-left">
            <q-avatar @click="$emit('changePhoto', employee)" color="red" text-color="white">
                <q-img :src="image" spinner-color="white" />
            </q-avatar>
            {{employee.name}}
        </td>
        <td class="text-right">{{employee.contact}}</td>
        <td class="text-right">{{ customerName }}</td>
        <td class="text-right">{{ customerTelephone }}</td>
        <td class="text-right q-gutter-md">

            <q-btn color="white" text-color="black" icon="info" label="Informação" :to="'/admin/employee/' + employee.id" />
            <q-btn @click="customerDialog = customers[employee.aprovedForCustomerId]" color="white" text-color="black" icon="person" label="Contratante" />

            <q-btn
                color="white"
                text-color="primary"
                flat
                round
                icon="highlight_off"
                @click="$emit('switchToCandidate', employee)"
            >

                <q-tooltip content-class="bg-indigo" :offset="[10, 10]">
                    Tornar candidato
                </q-tooltip>
            </q-btn>

            <q-btn
                color="white"
                text-color="red"
                flat
                round
                icon="delete"
                @click="$emit('deleteEmployee', employee)"
            >

                <q-tooltip content-class="bg-red" :offset="[10, 10]">
                    Remover funcionário
                </q-tooltip>
            </q-btn>

        </td>

        <q-dialog v-model="dialogToggle">
            <q-card>
                <q-toolbar class="q-mt-md">
                    <q-avatar class="q-ma-sm">
                        <img :src="customerImage">
                    </q-avatar>
                    
                    <q-space />
                    <q-btn flat round dense icon="close" @click="customerDialog = null" />
                </q-toolbar>

                <q-card-section>


                    <h5><b>Nome:</b> {{ getCustomer && getCustomer.name ? getCustomer.name : 'Deconhecido' }}</h5>
                    <h5><b>Telefone:</b> {{ getCustomer && getCustomer.phone ? getCustomer.phone : 'Nehum' }}</h5>
                    <h5><b>Email:</b> {{ getCustomer && getCustomer.email ? getCustomer.email : 'Nenhum' }}</h5>

                </q-card-section>
            </q-card>
        </q-dialog>
    </tr>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "EmployeeTableRowComponent",
        props: ['employee'],
        data () {
            return {
                customerDialog: null
            }
        },
        computed: {
            ...mapState ('customer', [
                'customers'
            ]),
            dialogToggle : {
                get () {
                    return !!this.customerDialog
                },
                set(val) {
                    if (!val) {
                        this.customerDialog = null
                    }
                }
            },
            image () {
                return this.employee && this.employee.image ? this.employee.image : '/statics/icons/icon-128x128.png'
            },
            getCustomer () {
                let cId = this.employee.aprovedForCustomerId
                return this.customers[cId]
            },
            customerName () {
                return this.getCustomer ? this.getCustomer.name : 'Cliente desconhecido.'
            },
            customerTelephone () {
                return this.getCustomer && this.getCustomer.phone ? this.getCustomer.phone : 'Sem contacto.'
            },
            customerImage () {
                return this.getCustomer && this.getCustomer.image ? this.getCustomer.image : '/statics/icons/icon-128x128.png.'
            },
        },

    }
</script>

<style scoped>

</style>