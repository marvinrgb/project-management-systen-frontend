<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <div id="app">
    <img class="bg-img" src="/images/glassmo_bg.jpg">


    <router-view class="mainComponent"></router-view>


    <div class="sidebar-right">
    <router-link to="/projects"><img class="sidebar-right-item" src="/images/folder_copy.png"></router-link>
    <router-link to="/project"><img class="sidebar-right-item" src="/images/folder.png"></router-link>
    <router-link to="/newProject"><img class="sidebar-right-item" src="/images/create_new_folder.png"></router-link>
    <div class="sidebar-placeholder"></div>
    <img class="sidebar-right-item" src="/images/file_copy.png">
    <img class="sidebar-right-item" src="/images/draft.png">
    <img class="sidebar-right-item" src="/images/note_add.png">
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentView: String
    }
  },
  components: {
    // SidebarVue
    // ProjectsVue,
    // ProjectVue
  },
  methods: {
    test() {
      console.log(test)
    },
    setProject() {
      this.$project = 1
    },
    setView(view) {
      this.currentView = view;
    }
  },
  mounted() {
    this.setProject();
    this.currentView = 'projects';
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  #app {
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
  }

  .bg-img {
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: 0.4;
  }

  .mainComponent {
    height: 80%;
    width: 75%;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
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

  .sidebar-placeholder {
    background-color: rgba(0, 0, 0, 0.3);
    height: 2px;
    width: 60%;
    margin: 2vh 0;
  }
</style>
