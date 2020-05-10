<template>
<div class="q-px-xl q-mx-xl">
  <div class="  q-px-xl q-mx-xl" >
    <q-markup-table >
      <thead>
        <tr>
          <th class="text-left">Nome do professional</th>
          <th class="text-center">Bairro</th>
          <th class="text-center">Idade</th>
          <th class="text-right">Acção</th>
        </tr>
      </thead>
      <tbody v-for="(employee, id) in roomAdded"
:key="id">
        <tr >
          <td class="text-left text-primary cursor-pointer	"  @click="view(id)">{{employee.name}}</td>
          <td class="text-center" >{{employee.bairro}}</td>
          <td class="text-center">{{employee.birthDate | dateFormated}}</td>
          <td class="text-right">
             <q-btn
                            outline
                              no-caps
                              rounded
                              flat
                              size="md"
                              color="red "
                              icon="delete"
                             @click="$emit('removeFromRoom' ,id)"

                          />
                          
                          
                          </td>

                          
          
        </tr>
        
       
         
      </tbody>
    </q-markup-table>
  </div>
  </div>
</template>


<script>
    import { date } from 'quasar'

export default {
  // name: 'ComponentName',

   props: ['roomAdded','selected'],
  data () {
    return {
        img: 'statics/img/people/moca-curso.jpg',
         icon: false,
         
    }
  }
,

 methods: {
    showNotif () {
      this.$q.notify({
        message: 'Poderá marcar entevista em breve ',
        caption: 'Lamentamos',
        color: 'cyan-6'
      })
    },

    view(id){
     
        this.$router.push('professionals/profile/' + id)

    }


  }
,

 filters: {

            dateFormated (val) {
                        let date1 = Date.now()
                        let unit = 'years'
                        let diff = date.getDateDiff(date1, val, unit)
                        if(diff>0) {
                            return diff + ' anos'
                        }
                        else{
                            return  'Desconhecido'
                        }

                         
            }
              

}

}
</script>
