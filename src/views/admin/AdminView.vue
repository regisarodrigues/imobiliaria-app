<script setup>
import useImoveis from '../../composables/useImoveis';
import { priceProperty } from '../../helpers';

const { imoveisCollection, deleteItem } = useImoveis();
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Painel</h2>

  <v-btn color="blue" variant="flat" :to="{ name: 'nova-propriedade' }"> Novo Imóvel </v-btn>

  <v-card class="mx-auto mt-10" flat>
    <v-list>
      <v-list-item v-for="imovel in imoveisCollection" :key="imovel.id">
        <template v-slot:prepend>
          <v-list-item-media :start="true">
            <img :src="imovel.imagen" width="180" />
          </v-list-item-media>
        </template>

        <v-list-item-title>{{ imovel.titulo }}</v-list-item-title>
        <v-list-item-subtitle>{{ priceProperty(imovel.precio) }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn
            class="mr-2"
            color="info"
            variant="flat"
            :to="{ name: 'editar-propriedade', params: { id: imovel.id } }"
          >
            Editar
          </v-btn>
          <v-btn color="red-darken-3" variant="flat" @click="deleteItem(imovel.id, imovel.imagen)">
            Excluir
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
