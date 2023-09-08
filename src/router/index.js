import { onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';
import { useFirebaseAuth } from 'vuefire';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/admin/propriedades',
          name: 'admin-propriedades',
          component: () => import('../views/admin/AdminView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/nova',
          name: 'nova-propriedade',
          component: () => import('../views/admin/NovaPropriedadeView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/editar/:id',
          name: 'editar-propriedade',
          component: () => import('../views/admin/EditarPropriedadeView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});

//Gard de navegacao
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth);
  if (requiresAuth) {
    //comprovar que usuario esta autenticado
    try {
      await authenticateUser();
      next();
    } catch (error) {
      console.log(error);
      next({ name: 'login' });
    }
  } else {
    // Nao esta protegido
    next();
  }
});

function authenticateUser() {
  const auth = useFirebaseAuth();

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });
}
export default router;
