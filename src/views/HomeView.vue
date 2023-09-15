<script setup>
import ImovelCard from '../components/ImovelCard.vue';
import useImoveis from '../composables/useImoveis';
import { priceProperty } from '../helpers';

const { piscina, imoveisFiltrado } = useImoveis();
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">Imobiliária RR</h1>
  <v-card flat class="py-10">
    <v-card-title class="text-h5">
      Busacar
      <v-checkbox label="Piscina" v-model="piscina" />
    </v-card-title>

    <v-row>
      <ImovelCard
        v-for="imovel in imoveisFiltrado"
        :key="imovel.id"
        :imovel="imovel"
        :preco="priceProperty"
      />
    </v-row>
  </v-card>
</template>
