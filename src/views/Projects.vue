<template>
  <div class="projects-container">
    <router-link :to="`/project/${project.id}`" class="project-box" v-for="project in projects" :key="project.id">
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
      projects: Object,
      apiIp: String
    }
  },
  methods: {
    getProjects() {
      fetch("http://localhost:3100/projects", {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin' : 'http://localhost:3100'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.projects = data;
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getProjects();
  }}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.projects-container {
    overflow-y: auto;
    display: grid !important;
    gap: 4vh;
    scrollbar-width: none;
    -ms-overflow-style: none;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .projects-container::-webkit-scrollbar {
    display: none;
  }
  
  /* @media only screen and (min-width: 1000px) {
    .projects-container {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  
  @media only screen and (max-width: 1000px) and (min-width: 600px) {
    .projects-container {
      grid-template-columns: 1fr 1fr;
    }
  }
  
  @media only screen and (max-width: 600px) {
    .projects-container {
      grid-template-columns: 1fr;
    }
  } */

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

  a {
    text-decoration: none;
  }

</style>