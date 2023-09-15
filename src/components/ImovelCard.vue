<script setup>
defineProps({
  imovel: {
    type: Object
  },
  preco: {
    type: Function
  }
});
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="imovel.imagen" height="250" cover :alt="imovel.titulo" />

      <v-card-title>
        {{ imovel.titulo }}
      </v-card-title>

      <v-card-text class="text-truncate">
        {{ imovel.descripcion }}
      </v-card-text>

      <v-card-text class="text-h5 font-weight-bold">
        Preço: {{ preco(imovel.precio) }}
      </v-card-text>

      <template v-slot:actions>
        <v-btn
          block
          color="info"
          variant="flat"
          :to="{ name: 'propriedade', params: { id: imovel.id } }"
        >
          Mais Informações...
        </v-btn>
      </template>
    </v-card>
  </v-col>
</template>
