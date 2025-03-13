import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const routes = [
  { path: '/', component: HomeView, name: 'home' },
  {
    path: '/profiles',
    component: () => import('../views/ProfileListView.vue'),
    name: 'profiles',
  },
  {
    path: '/profiles/:profile_id',
    components: {
      default: () => import('../views/ProfileView.vue'),
      'left-sidebar': () => import('../views/ProfileListView.vue'),
    },
    name: 'profile',
    props: { default: true, 'left-sidebar': false },
  },
  {
    path: '/feed',
    component: () => import('../views/FeedView.vue'),
    name: 'feed',
  },
  {
    path: '/posts/:post_id',
    component: () => import('../views/PostView.vue'),
    name: 'post',
    props: true,
  },
  {
    path: '/newpost',
    component: () => import('../views/AddPostView.vue'),
    name: 'add-post',
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export { router }
