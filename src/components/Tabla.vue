<template>
  <div class="pa-10">
    <v-data-table
      class="table ma-auto"
      item-key="productoId"
      fixed-header
      fixed-footer
      :headers="headers"
      :items="GetArticulos"
      height="400"
      multi-sort
      style="width: 100%"
    >
      <template v-slot:[`item.nombre`]="{ item }" class="pa-0">
        <v-btn color="red" text :title="`Eliminar ${item.nombre}`" @click="Eliminar(item)"
          ><v-icon>mdi-trash-can-outline</v-icon></v-btn
        >
        <span class="caption text-uppercase">
          <v-btn text @click="EditarProducto(item)"> {{ item.nombre }}</v-btn>
        </span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true
  }),
  computed: {
    headers() {
      return [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Id', value: 'productoId', align: ' d-none' },
        { text: 'Categoria', value: 'categoria' },
        { text: 'Precio', value: 'precio' },
        { text: 'Cantidad', value: 'cantidad' },
        { text: 'Descripción', value: 'descripcion' }
      ]
    },
    GetArticulos() {
      return this.$store.getters.GetProducts
    }
  },
  methods: {
    EditarProducto(item) {
      this.$emit('SetProduct', item)
    },
    Eliminar(item) {
      this.$store.dispatch('DeleteProduct', item.articuloId)
    }
  },
  mounted() {
    this.$store.dispatch('GetProductosAsync')
  }
}
</script>

<style scoped></style>
