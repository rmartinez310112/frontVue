<template>
  <v-row>
    <v-col cols="4" class="offset-md-4">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="nombre" :rules="textoRules" label="Nombre" required></v-text-field>
        <v-text-field v-model="categoria" :rules="textoRules" label="Categoría" required></v-text-field>
        <v-text-field v-model="precio" type="number" :rules="numeroRules" label="Precio" required></v-text-field>
        <v-text-field v-model="cantidad" type="number" :rules="numeroRules" label="Cantidad" required></v-text-field>
        <v-textarea v-model="descripcion" :rules="textoRules" label="Descripcion" required></v-textarea>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="GuardarCambios"> Guardar </v-btn>
        <v-btn color="red" class="mr-4" @click="$refs.form.reset()"> Borrar Formuario </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    nombre: '',
    categoria: '',
    precio: null,
    cantidad: null,
    descripcion: '',
    textoRules: [
      (v) => !!v || 'Este campo es requerido',
      (v) => (v && v.length > 2) || 'Debe contener al menos 3 caracteres'
    ],
    numeroRules: [(v) => !!v || 'Este campo es requerido', (v) => v > 0 || 'El valor debe ser mayor que cero']
  }),
  computed: {
    GetProductToEdit: {
      get() {
        return this.$store.getters.GetProduct
      },
      set() {
        var product = this.$store.getters.GetProduct
        this.nombre = product.nombre
        this.categoria = product.categoria
        this.precio = product.precio
        this.categoria = product.categoria
      }
    }
  },
  methods: {
    GuardarCambios() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('GuardarCambios', {
            nombre: this.nombre,
            categoria: this.categoria,
            precio: parseFloat(this.precio),
            cantidad: parseInt(this.cantidad),
            descripcion: this.descripcion
          })
          .then((resp) => {
            console.log('resp: ', resp)
          })
          .then(() => {
            this.$store.dispatch('GetProductosAsync')
          })
      }
    }
  }
}
</script>
<style scoped></style>
