<template>
  <div>
    <!-- content -->



    <q-dialog
        v-model="modal"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-left"
        transition-hide="slide-right"
        
    >
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header elevated class="bg-white">
          <q-toolbar class="text-blue-9">
            <q-btn
            flat
            @click="$emit('close-dialog')"
            round
            icon="keyboard_arrow_right"
            class="WAL__drawer-open q-mr-sm"
             />
          
            <q-toolbar-title>Perfil do organizador/a</q-toolbar-title>
            <q-avatar>
              <img src="https://scontent.fmpm2-1.fna.fbcdn.net/v/t1.0-9/58384253_331929644184444_1015005844124729344_n.jpg?_nc_cat=100&_nc_oc=AQm5xdCxs85jo53Dq1TsNo9gwb3oGRxdDSFibPkkYD6-ACKM31fhGoCd_ienbrahtx4&_nc_ht=scontent.fmpm2-1.fna&oh=9c0e528b655b97e33a82b6d72b9e0b1b&oe=5DE60477">
            </q-avatar>
          </q-toolbar>

        </q-header>

        <q-page-container>
          <q-page class="q-pa-lg">
						<div class="q-pt-md q-pb-md">
						 Perfil
						</div>
            <q-card style="border-radius: 20px">
              <q-img 
                src="https://media.istockphoto.com/photos/happy-woman-picture-id174929219?k=6&m=174929219&s=612x612&w=0&h=0BvbyEiOm3d7EQ-qZ5KUE2eZehirYCxYQJm6QNYtROs="
                style="height: 250px; min-height: 250px;"
              />
              <q-card-section class="details">
                <q-list>
                <q-item>
										<q-item-section>
											<q-item-label class="text-h6">Julieta Fumo</q-item-label>
											<q-item-label caption line="1">Organizadora de eventos</q-item-label>
											
										</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon name="place" />
                    </q-item-section>
                      <q-item-section>
                        Cidade de Maputo
                      </q-item-section>
                  </q-item>

                </q-list>
              </q-card-section>
            </q-card>
						<div class="q-pt-md q-pb-md">
						 Eventos da Julieta
						</div>
						<event-organizer @dtl-dialog="modalDtl = true" />
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    </div>
</template>

<script>
import EventOrganizer from 'components/admin/EventOrganizer.vue'
export default {
    props: ['modal'],
    data () {
        return {
            maximizedToggle: true
        }
		},
		components: {
			EventOrganizer,
		},
}
</script>

<style lang="stylus">
// .q-page
//   padding 0
// .q-card__section.details
//   padding 0
</style>

