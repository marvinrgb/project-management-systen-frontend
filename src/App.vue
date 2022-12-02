<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="all">
    <img class="bg-img" src="/images/glassmo_bg.jpg">

    <div class="project-container">
      <div v-for="project in projects" :key="project.id">
        {{ project }}
      </div>
    </div>

    <div class="sidebar-right">
      <img class="sidebar-right-item" src="/images/folder_copy.png">
      <img class="sidebar-right-item" src="/images/folder.png">
      <img class="sidebar-right-item" src="/images/create_new_folder.png">
      <img class="sidebar-right-item" src="/images/draft.png">
      <img class="sidebar-right-item" src="/images/note_add.png">
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: Object,
      apiIp: String
    }
  },
  methods: {
    getProjects() {
      fetch("localhost:3100/projects", {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
      })
      .then((res) => res.json())
      .then((data) => {
        this.projects = data;
      })
    }
  },
  mounted() {
    console.log("mounted")
    this.getProjects();
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  #all {
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
  }

  .bg-img {
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: 0.3;
  }

  .project-container {
    height: 90%;
    width: 75%;
    border: 2px solid black;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .sidebar-right {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.18);
    height: fit-content;
    padding: 4vh 0;
    width: 6%;
    top: 50%;
    transform: translateY(-50%);
    border-top-right-radius: 8vh;
    border-bottom-right-radius: 8vh;
    box-shadow: inset 0 0 2vh rgba(255, 255, 255, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .sidebar-right-item {
    margin: 1.5vh;
    cursor: pointer;
    opacity: 0.4;
  }

  .sidebar-right-item:hover {
    opacity: 0.9;
  }
</style>
