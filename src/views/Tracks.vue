<template>
  <div class="tracks-container">
    <input class="glassmo-box app-input" id="tracks-input" type="text">
    <div class="tracks-track-container" v-if="tracks">
      <div class="tracks-row tracks-headerrow">
        <div class="tracks-track-name">Name</div>
        <div class="tracks-track-description">Description</div>
        <div class="tracks-track-genre">Genre</div>
        <div class="tracks-track-length">Length</div>
        <div class="tracks-track-projectid">Project</div>
      </div>
      <div class="glassmo-box tracks-row" v-for="track in tracks" :key="track.id">
        <div class="tracks-track-name">{{track.name}}</div>
        <div class="tracks-track-description">{{track.description}}</div>
        <div class="tracks-track-genre">{{track.genre}}</div>
        <div class="tracks-track-length">{{track.length}}</div>
        <div class="tracks-track-projectid">{{getProjectName(track.projectId)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tracks: Object,
      projects: Array
    }
  },
  methods: {
    getTracks() {
      fetch(`http://${this.$backendip}/tracks`)
      .then((res) => res.json())
      .then((data) => {
        this.tracks = data;
      })
    },
    getProjects() {
      fetch(`http://${this.$backendip}/projects`)
      .then((res) => res.json())
      .then((data) => {
        this.projects = data;
      })
    },
    getProjectName(id) {
      for (let i = 0; i < this.projects.length; i++) {
        if (id == this.projects[i].id) {
          return this.projects[i].name;
        }
      }
      return 'no data'
    },
    getTracksFullText(text) {
      fetch(`http://${this.$backendip}/trackFullText/${text}`)
      .then((res) => res.json())
      .then((data) => {
        this.tracks = data;
      })
    }
  },
  mounted() {
    this.getTracks();
    this.getProjects();
    document.getElementById('tracks-input').addEventListener('keyup', (event) => {
      let dat = event.target.value;
      if (dat == '') return;
      this.getTracksFullText(dat);
    })
  }
}
</script>

<style>
.tracks-track-name {
  width: 15%;
}
.tracks-track-description {
  width: 25%;
}
.tracks-track-genre {
  width: 15%;
}
.tracks-track-length {
  width: 10%;
}
.tracks-track-projectid  {
  width: 15%;
}

.tracks-headerrow {
  text-decoration: underline;
}

.tracks-track-container {
  overflow-y: auto;
}

.tracks-row {
  margin: 2vh;
  padding: 1vh 1vw;
  display: flex;
}

.tracks-container {
  display: flex;
  flex-direction: column;
  align-content: center;
}

.glassmo-box {
  background-color: #ffffff44;
  box-shadow: inset 0 0 2vh #ffffffaa;
  border-radius: 1vh;
}

#tracks-input {
  height: fit-content;
  width: 50%;
  text-align: center;
  font-size: 3vh;
  margin: 0 auto 3vh auto;
  padding: 1vh 0;
}
</style>