import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Project from '../components/Project.vue'
import newProject from '../components/newProject.vue'
import Projects from '../components/Projects.vue'
import Tracks from '../components/Tracks.vue'
import Track from '../components/Track.vue'
import newTrack from '../components/newTrack.vue'

const router = createRouter({
  mode: history,
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Projects
    },
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
    },
    {
      path: '/newTrack',
      component: newTrack
    }
  ]
})

export default router