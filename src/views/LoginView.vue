<script setup>
import { useField, useForm } from 'vee-validate';
import { useAuthStore } from '../stores/auth';
import { loginSchema } from '../validation/loginSchema';

const { handleSubmit } = useForm({ validationSchema: loginSchema });
const auth = useAuthStore();
const email = useField('email');
const password = useField('password');

const submit = handleSubmit((values) => {
  auth.login(values);
});
</script>

<template>
  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h3 font-weight-bold"> Iniciar Sessão </v-card-title>
    <v-card-subtitle class="text-h5"> Iniciar sessão com a conta </v-card-subtitle>

    <v-alert class="my-5" type="error" :title="auth.errorMsg" v-if="auth.hasError"></v-alert>

    <v-form class="mt-5">
      <v-text-field
        type="email"
        label="Email"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
      />
      <v-text-field
        type="password"
        label="Password"
        bg-color="blue-grey-lighten-5"
        class="mb-3"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
      />
      <v-btn block color="pink-accent-3" @click="submit"> Iniciar Sessão </v-btn>
    </v-form>
  </v-card>
</template>
