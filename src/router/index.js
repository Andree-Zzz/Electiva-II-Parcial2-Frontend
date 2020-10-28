import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MisImagenes from '../views/MisImagenes.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/misimagenes',
    name: 'MisImagenes',
    component: MisImagenes,
    meta: {
      requireAuth: true,
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('cambiando de ruta');
  if(to.matched.some(record => record.meta.requireAuth)){
    //si la ruta requiere autenticacion
    const token = localStorage.getItem("token");
    if(!token){
      next('/');
    }
  }
  next();
})

export default router
