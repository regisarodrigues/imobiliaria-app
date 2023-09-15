<script setup>
import useImage from '@/composables/useImage';
import useLocationMap from '@/composables/useLocationMap';
import { validationSchema } from '@/validation/propiedadSchema';
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet';
import { doc, updateDoc } from 'firebase/firestore';
import 'leaflet/dist/leaflet.css';
import { useField, useForm } from 'vee-validate';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';

const items = [1, 2, 3, 4, 5];

const { url, uploadImage, image } = useImage();
const { zoom, center, pin } = useLocationMap();

const { handleSubmit } = useForm({ validationSchema });

const titulo = useField('titulo');
const imagen = useField('imagen');
const precio = useField('precio');
const habitaciones = useField('habitaciones');
const wc = useField('wc');
const estacionamiento = useField('estacionamiento');
const descripcion = useField('descripcion');
const piscina = useField('piscina');

const route = useRoute();
const router = useRouter();

//otber o imovel e editar
const db = useFirestore();
const docRef = doc(db, 'imoveis', route.params.id);
const imovel = useDocument(docRef);

watch(imovel, (imovel) => {
  titulo.value.value = imovel.titulo;
  precio.value.value = imovel.precio;
  habitaciones.value.value = imovel.habitaciones;
  wc.value.value = imovel.wc;
  estacionamiento.value.value = imovel.estacionamiento;
  descripcion.value.value = imovel.descripcion;
  piscina.value.value = imovel.piscina;
  center.value = imovel.localizacao;
});

const submit = handleSubmit(async (values) => {
  const { ...imovel } = values;
  if (image.value) {
    const data = {
      ...imovel,
      localizacao: center.value,
      imagen: url.value
    };
    await updateDoc(docRef, data);
  } else {
    const data = {
      ...imovel,
      localizacao: center.value
    };
    await updateDoc(docRef, data);
  }
  router.push({ name: 'admin-propriedades' });
});
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="mt-5">
      <h1 class="text-h4 font-weight-bold">Editar Imóvel</h1>
    </v-card-title>
    <v-card-subtitle>
      <p class="text-h5">Editar os detalhes do imóvel</p>
    </v-card-subtitle>

    <v-form class="mt-10">
      <v-text-field
        v-model="titulo.value.value"
        :error-messages="titulo.errorMessage.value"
        label="Titulo"
        class="mb-5"
      ></v-text-field>

      <v-file-input
        v-model="imagen.value.value"
        :error-messages="imagen.errorMessage.value"
        accept="image/jpeg"
        prepend-icon="mdi-camera"
        label="Imagem"
        class="mb-5"
        @change="uploadImage"
      ></v-file-input>

      <div class="my-5">
        <p class="font-weight-bold">Imagem Atual:</p>
        <img v-if="image" class="w-50" :src="image" />
        <img v-else class="w-50" :src="imovel?.imagen" />
      </div>

      <v-text-field
        v-model="precio.value.value"
        :error-messages="precio.errorMessage.value"
        label="Precio"
        class="mb-5"
      ></v-text-field>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            label="Quartos"
            class="mb-5"
            :items="items"
            v-model="habitaciones.value.value"
            :error-messages="habitaciones.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="WC"
            class="mb-5"
            :items="items"
            v-model="wc.value.value"
            :error-messages="wc.errorMessage.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            label="Garagem"
            class="mb-5"
            :items="items"
            v-model="estacionamiento.value.value"
            :error-messages="estacionamiento.errorMessage.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        v-model="descripcion.value.value"
        :error-messages="descripcion.errorMessage.value"
        label="Descrição"
        class="mb-5"
      ></v-textarea>

      <v-checkbox v-model="piscina.value.value" label="Piscina"></v-checkbox>

      <h2 class="font-weight-bold text-center my-5">Localização</h2>
      <div class="pb-10">
        <div style="height: 600px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" draggable @moveend="pin" />
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit"> Salvar </v-btn>
    </v-form>
  </v-card>
</template>
