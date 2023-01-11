<template>
  <div class="project-container">
    <input id="id-input" class="id-input">
    <div v-if="project.id" id="detail-box" class="detail-box">
      <div style="display: flex;">
        <div class="glassmo-box project-track-amount">Tracks: {{ trackAmount }}</div> 
        <router-link :to="`/newTrack/${project.id}`" class="glassmo-box project-track-new">New Track</router-link> 

      </div>
      <div class="row">
          <div class="key">Name: </div>
          <input id="project-name" class="value project-edit-input" :value="project.name">
        </div>
        <div class="row">
          <div class="key">Description: </div>
          <input id="project-description" class="value project-edit-input" :value="project.description">
        </div>
        <div class="row">
          <div class="key">Genres: </div>
          <div class="value"><span v-for="(value, index) in genres" v-bind:key="index">{{ value }}<span v-if="index < genres.length-1">{{ ", " }}</span></span></div>
        </div>
        <div class="row">
          <div class="key">Length: </div>
          <div class="value">{{totalLength}}</div>
        </div>
        <div class="row">
          <div class="key">Release Date: </div>
          <input :value="project.releaseDate" id="project-releasedate" class="value track-releasedate app-input" type="date">
        </div>
        <div @click="deleteProject()" class="glassmo-box delete-project-button" id="project-delete">
          Delete Project
        </div>
        <div @click="putProject()" class="glassmo-box save-changes-button" id="project-save-changes">
          Save Changes
        </div>
      </div>
      <div class="tracks-box">
        <div class="track-row track-row-header">
          <div class="track-name">Name</div>
          <div class="track-genre">Genre</div>
          <div class="track-genre">Sec Genre</div>
          <div class="track-explicit">Explicit/Clean</div>
          <div>Length</div>
        </div>
        <router-link :to="`/track/${value.id}`" class="track-row" v-for="(value, index) in tracks" v-bind:key="index">
          <div class="track-name">{{value.name}}</div>
          <div class="track-genre">{{value.genre}}</div>
          <div class="track-genre">{{value.secGenre}}</div>
          <div class="track-explicit"><span v-if="value.explicit">Explicit</span><span v-else>Clean</span></div>
          <div>
            {{Math.floor(value.length/60)}}min {{value.length%60}}sec
          </div>
        </router-link>
      </div>
  </div>
</template>

<style>

.row {
  display: flex;
  height: fit-content;
  margin: 0.5vh 0;
  user-select: none;
  font-size: 2.4vh;
}

.key {
  width: 25%;
}
/* 
#project-save-changes {
} */

.save-changes-button {
  position: absolute;
  right: 2vw;
  bottom: 2vh;
  /* cursor: pointer; */
  padding: 1vh 2vh;
  color: #777;
  user-select: none;
}

.delete-project-button {
  position: absolute;
  right: 2vw;
  top: 2vh;
  cursor: pointer;
  padding: 1vh 2vh;
  color: rgb(40, 40, 40);
  user-select: none;
}

.project-edit-input {
  outline: none;
  border: none;
  background-color: #00000000;
}

.value {
  width: 75%;
}

.project-container {
  display: flex;
  flex-direction: column;
  position: relative;
}

.track-name {
  width: 25%;
}

.track-genre {
  width: 10%;
}

.track-explicit {
  width: 18%;
}

.tracks-box {
  width: 80%;
  align-self: center;
  overflow-y: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.tracks-box::-webkit-scrollbar {
  display: none;
}

.track-row {
  margin-top: 2vh;
  display: flex;
  padding: 2vh;
  border-radius: 2vh;
  box-shadow: inset 0 0 2vh #ffffffaa;
  background-color: #ffffff44;
  color: rgb(51, 51, 51);
}

.track-row-header {
  text-decoration: underline;
  padding: 1.5vh 2vh;
  font-size: 2.2vh;
}

a {
  text-decoration: none;
  color: rgb(51, 51, 51);
}

.detail-box {
  margin-top: 2vh;
  padding: 3vh;
  border-radius: 2vh;
  box-shadow: inset 0 0 2vh #ffffffaa;
  background-color: #ffffff44;
  width: 70%;
  align-self: center;
  font-size: 2.5vh;
  position: relative;
}

.id-input {
  border-radius: 1vh;
  padding: 3vh;
  background-color: #ffffff44;
  box-shadow: inset 0 0 2vh #ffffffaa;
  align-self: center;
  text-align: center;
  min-width: 30%;
  font-size: 2.6vh;
  height: 4vh;
  /* background-color: #00000000; */
  border: none;
  /* border-bottom: 1px solid rgba(51, 51, 51, 0.3); */
  color: #444;
}

.id-input:focus {
  outline: none;
}

.project-track-amount {
  padding: 1vh 1vw;
  width: fit-content;
  margin-bottom: 3vh;
}

.project-track-new {
  padding: 1vh 1vw;
  width: fit-content;
  margin-bottom: 3vh;
  margin-left: 1vw;
  user-select: none;
  cursor: pointer;
}

</style>

<script>
import { nextTick } from '@vue/runtime-core';
export default {
  data() {
    return {
      project: Object,
      apiIp: String,
      tracks: Object,
      newProject: Object,
      totalLength: String,
      genres: Array,
      trackAmount: Number
    }
  },
  methods: {
    getProject(id) {


      let projectId = document.getElementById('id-input').value;
      
      if (isNaN(projectId)) {
        return;
      }

      if (projectId == '') {
        return;
      }

      if(projectId == 0) {
        return;
      }

      projectId = parseInt(projectId);

      fetch(`http://${this.$backendip}/project/${projectId}`, {
        method: 'GET'
      })
      .then((res) => res.json())
      .then(async (data) => {
        if (!data) {
          this.project.id = undefined;
          return;
        }
        this.project = data;
        this.newProject = data;
        await nextTick();
        document.getElementById('detail-box').addEventListener('keyup', (event => {
          let button = document.getElementById('project-save-changes');
          button.style.color = '#111';
          button.style.cursor = 'pointer';
        }))
        document.getElementById('detail-box').addEventListener('change', (event => {
          let button = document.getElementById('project-save-changes');
          button.style.color = '#111';
          button.style.cursor = 'pointer';
        }))
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getTracksForProject(id) {

      let projectId = document.getElementById('id-input').value;

      if (isNaN(projectId)) {
        return;
      }

      if (projectId == '') {
        return;
      }

      projectId = parseInt(projectId);

      fetch(`http://${this.$backendip}/tracksByProject/${projectId}`, {
        method: 'GET'
      })
      .then((res) => res.json())
      .then((data) => {
        this.tracks = data;
        this.trackAmount = data.length;
        let lengthCounterSec = 0;
        this.genres = [];
        for (let i = 0; i < data.length; i++) {
          lengthCounterSec += data[i].length;
          if (!this.genres.includes(data[i].genre) && data[i].genre != 'default') {
            this.genres.push(data[i].genre)
          }
          if (!this.genres.includes(data[i].secGenre) && data[i].secGenre != 'default') {
            this.genres.push(data[i].secGenre)
          }
        }
        this.totalLength = `${Math.floor(lengthCounterSec / 60)}min ${lengthCounterSec % 60}sec`
      })
      .catch((err) => { - 
        console.log(err)
      })
    },
    dateReadable(date) {
      let dat = new Date(date);
      return `${this.addLeadingZero(dat.getDate())}.${this.addLeadingZero(dat.getMonth() + 1)}.${dat.getFullYear()}`;
    },
    addLeadingZero(num) {
      if (isNaN(num)) {
        return num;
      }
      if (num < 10 && num >= 0) {
        return `0${num}`
      } else {
        return num;
      }
    },
    putProject() {
      let name = document.getElementById('project-name').value;
      let description = document.getElementById('project-description').value;
      let releaseDate = document.getElementById('project-releasedate').value;
      let data = {
        "id" : this.project.id,
        "name" : name,
        "description" : description,
        "releaseDate" : releaseDate
      }
      fetch(`http://${this.$backendip}/project`, {
        "method" : 'PUT',
        "headers" : {
          'Content-Type' : 'application/json'
        },
        "body" : JSON.stringify(data)
      })
      .then((res) => {
        console.log(res.status);
        res.json();
      })
      .then((data) => {
        let button = document.getElementById('project-save-changes');
        button.style.color = '#777';
        button.style.cursor = 'default';
      })
    },
    deleteProject() {
      if (confirm('Do you really want to delete this project forever?')) {
        console.log({ 'id' : this.project.id })
        fetch(`http://${this.$backendip}/project`, {
          method: 'DELETE',
          headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({ 'id' : this.project.id })
        })
      }
    }
  },
  mounted() {
    if (this.$route.params.projectid) {
      document.getElementById('id-input').value = this.$route.params.projectid;
    }
    this.getProject();
    this.getTracksForProject();
    document.getElementById('id-input').addEventListener('keyup', (event) => {
      let project = parseInt(event.target.value);
      if (!project) return;
      this.getProject(project);
      this.getTracksForProject(project);
    })
  }}
</script>
