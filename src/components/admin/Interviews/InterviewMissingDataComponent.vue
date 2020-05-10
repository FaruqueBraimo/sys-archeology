<template>
    <div class="q-pa-md q-gutter-sm">
        <q-banner
            rounded
            class="bg-grey-7 text-white"
            style="font-size: 15pt"
        >
            <b v-if="!interview.vacancyId">* Esta entrevista não tem área definida, por favor, indique se deseja convocar: Babás, engenheiros, ou ...</b>
            <br>
            <b v-if="!interview.customerId">* Por favor, indique o cliente para esta entrevista</b>

            <p>Clique em actualizar, </p>

            <template v-slot:action>
                <!--<q-btn flat label="Turn ON Wifi" />-->
                <q-btn
                    flat
                    label="Actualizar"
                    icon="edit"
                    @click="$emit('editInterview', interview)"
                />
            </template>
        </q-banner>
    </div>
</template>

<script>
    export default {
        name: "InterviewMissingDataComponent",
        props: ['interview'],
    }
</script>

<style scoped>

</style>