import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebaseAuth } from 'vuefire';

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth();
  const errorMsg = ref('');
  const authUser = ref(null);
  const router = useRouter();

  const errorCode = {
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/wrong-password': 'Password incorreto.'
  };

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
      }
    });
  });

  function login({ email, password }) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        authUser.value = user;
        router.push({ name: 'admin-propriedades' });
      })
      .catch((error) => {
        errorMsg.value = errorCode[error.code];
      });
  }

  function logout() {
    signOut(auth)
      .then(() => {
        authUser.value = null;
        router.push({ name: 'login' });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const hasError = computed(() => {
    return errorMsg.value;
  });

  const isAuth = computed(() => {
    return authUser.value;
  });

  return {
    login,
    logout,
    hasError,
    errorMsg,
    isAuth
  };
});
