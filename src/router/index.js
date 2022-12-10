import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Project from '../views/Project.vue'
import newProject from '../views/newProject.vue'
import Projects from '../views/Projects.vue'
import Tracks from '../views/Tracks.vue'
import Track from '../views/Track.vue'
  
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/projects',
      component: Projects
    },
    {
      path: '/project/:projectid',
      component: Project
    },
    {
      path: '/project',
      component: Project
    },
    {
      path: '/newProject',
      component: newProject
    },
    {
      path: '/tracks',
      component: Tracks
    },
    {
      path: '/track/:trackid',
      component: Track
    }
  ]
})

export default router
