<template>
  <div class="projects-container">
    <input class="glassmo-box app-input"  id="projects-input" type="text">
    <!-- <div class="no-data" v-if="!apiData.projects">
      no data
    </div> -->
    <router-link v-for="project in apiData.projects" :to="`/project/${project.id}`" class="project-box" :key="project.id">
      <h2>{{project.name}}</h2>
      <p>Description: {{project.description}}</p>
      <p>Genres: {{project.genres}}</p>
    </router-link>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      apiData: Object,
      apiIp: String,
      key_projects: Boolean
    }
  },
  methods: {
    getProjects() {
      fetch(`http://${this.$backendip}/projects`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin' : `http://${this.$backendip}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.apiData.projects = data;
        this.$forceUpdate();
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getProjectsFullText(query) {
      fetch(`http://${this.$backendip}/projectFullText/${query}`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin' : `http://${this.$backendip}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.apiData.projects = data;
        this.$forceUpdate();
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getProjects();
    let input = document.getElementById('projects-input')
    input.focus();
    input.addEventListener('keyup', (event) => {
      let query = event.target.value;
      // console.log()
      if (query == '') {
        this.getProjects();
      } else {
        this.getProjectsFullText(query);
      }
    })
  }}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#projects-input {
  position: sticky;
  width: 50%;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  height: 6vh;
  grid-column: 1 / span 3;
  text-align: center;
  font-size: 3vh;
}

.no-data {
  background-color: #ffffff33;
  height: fit-content;
  width: fit-content;
  padding: 2vh 3vw;
  border-radius: 1.5vh;
  position: absolute;
  left: 50%;
  top: 50%;
  box-shadow: inset 0 0 1vh #ffffffaa;
  transform: translateX(-50%) translateY(-50%);
}

.projects-container {
  overflow-y: auto;
  display: grid !important;
  gap: 4vh;
  scrollbar-width: none;
  -ms-overflow-style: none;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: 8vh;
}

.projects-container::-webkit-scrollbar {
  display: none;
}

.project-box {
  width: 100%;
  min-height: 25vh;
  height: fit-content;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 2vh 1vw;
  border-radius: 2vh;
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 0 2vh rgba(255, 255, 255, 0.6);
  color: rgb(71, 50, 80);
  flex-direction: column;
  cursor: pointer;
}

.project-box:hover {
  background-color: rgba(255, 255, 255, 0.35);
  box-shadow: inset 0 0 3vh rgba(255, 255, 255, 1);
}

</style>