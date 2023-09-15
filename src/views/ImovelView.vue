<script setup>
import { LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { doc } from 'firebase/firestore';
import 'leaflet/dist/leaflet.css';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';
import useLocationMap from '../composables/useLocationMap';
import { priceProperty } from '../helpers';

const { zoom, center } = useLocationMap();

const route = useRoute();
const db = useFirestore();
const docRef = doc(db, 'imoveis', route.params.id);
const imovel = useDocument(docRef);

watch(imovel, (imovel) => {
  center.value = imovel.localizacao;
});
</script>

<template>
  <v-card flat>
    <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
      {{ imovel?.titulo }}
    </v-card-title>
    <v-img :src="imovel?.imagen" height="550" cover :alt="imovel?.titulo" />
    <div class="bg-blue-grey-lighten-5 d-flex flex-column flex-md-row align-center">
      <v-card-text>
        Valor:
        <span class="font-weight-bold">{{ priceProperty(imovel?.precio) }}</span>
      </v-card-text>

      <v-card-text>
        Quantidade Banheiro(s):
        <span class="font-weight-bold">{{ imovel?.wc }}</span>
      </v-card-text>

      <v-card-text>
        Quantidade carro(s) garagem:
        <span class="font-weight-bold">{{ imovel?.estacionamiento }}</span>
      </v-card-text>

      <v-card-text>
        Quantidade Quartos(s):
        <span class="font-weight-bold">{{ imovel?.habitaciones }}</span>
      </v-card-text>
    </div>

    <v-row>
      <v-col cols="12" md="8">
        <div class="text-pre-wrap py-5">
          {{ imovel?.descripcion }}
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <div class="py-5" style="height: 600px">
          <LMap ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center">
              <LPopup>
                {{ imovel.titulo }}
              </LPopup>
            </LMarker>
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
