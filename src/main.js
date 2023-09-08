import '@mdi/font/css/materialdesignicons.min.css';
import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

//vuetify imports
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

//firebase imports
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './config/firebase';

import App from './App.vue';
import router from './router';

const app = createApp(App);

//vuetify config
const vuetify = createVuetify({
  components,
  directives
});

//firebase config
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
});

app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#app');
