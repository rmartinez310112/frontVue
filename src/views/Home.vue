<template>
  <div>
    <formulario class="pb-2"></formulario>
    <v-divider></v-divider>
    <br />
    <tabla @SetProduct="SetProduct"></tabla>
  </div>
</template>

<script>
import Formulario from '../components/Formulario.vue'
import Tabla from '../components/Tabla.vue'
export default {
  name: 'Home',

  components: {
    Formulario,
    Tabla
  },
  methods: {
    SetProduct(item) {
      this.$store.dispatch('SetProduct', item)
    }
  }
}
</script>
