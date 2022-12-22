<template>
  <div class="track-container">
    <div v-if="track.id" id="detail-box" class="detail-box">
      <div class="row track-header">
        <input class="app-input" id="track-name" :value="track.name">
      </div>
      <div class="row">
        <div class="key">Description: </div>
        <input id="track-description" class="value project-edit-input" :value="track.description">
      </div>
      <div class="row">
        <div class="key">Genre: </div>
        <input id="track-genre" class="value app-input" :value="track.genre">
      </div>
      <div class="row">
        <div class="key">Length: </div>
        <input id="track-length" class="value app-input" :value="track.length">
      </div>
      <div class="row">
        <div class="key">Release Date: </div>
        <input :value="track.releaseDate" id="track-releasedate" class="value track-releasedate app-input" type="date">
      </div>
      <div class="row">
        <div class="key">Project: </div>
        <select class="app-input" name="projectId-select" id="track-projectId" :value="track.projectId">
          <option v-for="project in projects" :key="project.id" :value="project.id">{{project.name}}</option>
        </select>
      </div>
      <div class="glassmo-box save-changes-button" id="track-save-changes">
        Save Changes
      </div>
    </div>
  </div>  
</template>

<style>

</style>

<script>
import { nextTick } from '@vue/runtime-core';
export default {
  data() {
    return {
      track: Object,
      newTrack: Object,
      projects: Object
    }
  },
  methods: {
    getTrack() {
      let id = this.$route.params.trackid;

      fetch(`http://${this.$backendip}/track/${id}`)
      .then((res) => res.json())
      .then(async (data) => {
        this.track = data;
        this.newTrack = data;
        console.log(data);
        await nextTick();
        document.getElementById('track-releasedate').addEventListener('change', (event) => {
          console.log(event.target.value)
        })
        this.eventListenerSave();
        this.eventListenerChanges();
      })
      .catch((err) => {
        console.log(err);
      })
    },
    eventListenerSave() {
      let saveButton = document.getElementById('track-save-changes')
      saveButton.addEventListener('click', (event) => {
        this.putTrack();
      })
    },
    eventListenerChanges() {
      let detailBox = document.getElementById('detail-box');
      detailBox.addEventListener('keyup', (event) => {
        if (event.key == 'Enter') return
        this.newTrack.name = document.getElementById('track-name').value;
        this.newTrack.description = document.getElementById('track-description').value;
        this.newTrack.genre = document.getElementById('track-genre').value;
        if (document.getElementById('track-length').value == '') {
        } else if (isNaN(parseInt(document.getElementById('track-length').value))) {
          alert('length must only contain numeric characters');
        } else {
          this.newTrack.length = parseInt(document.getElementById('track-length').value);
        }
        let saveButton = document.getElementById('track-save-changes')
        saveButton.style.color = '#111';
        saveButton.style.cursor = 'pointer'
      })
      detailBox.addEventListener('change', (event) => {
        this.newTrack.releaseDate = document.getElementById('track-releasedate').value;
        this.newTrack.projectId = parseInt(document.getElementById('track-projectId').value);
        console.log(this.newTrack.projectId);
        let saveButton = document.getElementById('track-save-changes')
        saveButton.style.color = '#111';
        saveButton.style.cursor = 'pointer'
      })
    },
    putTrack() {
      let data = {
        'id' : this.newTrack.id,
        'name' : this.newTrack.name,
        'description' : this.newTrack.description,
        'genre' : this.newTrack.genre,
        'length' : this.newTrack.length,
        'releaseDate' : this.newTrack.releaseDate,
        'projectId' : this.newTrack.projectId
      }
      fetch(`http://${this.$backendip}/track`, {
        method: 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) => {
        console.log(res.status);
        res.json();
      })
      .then((data) => {
        let button = document.getElementById('track-save-changes');
        button.style.color = '#777';
        button.style.cursor = 'default';
      })
    },
    getProjects() {
      fetch(`http://${this.$backendip}/projects`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin' : `http://${this.$backendip}`
        }
      })
      .then((res) => res.json())
      .then((data) => {
        this.projects = data;
        this.$forceUpdate();
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.getProjects();
    this.getTrack();
  }
}
</script>

<style>
#track-projectId {
  cursor: pointer;
  border-radius: 5px;
  padding: 0.5vh 1vw 0.5vh 0.5vw;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

#track-projectId:hover {
  background-color: #ffffff55;
  box-shadow: inset 0 0 8px #ffffff;
}

#track-name {
  font-size: 4vh;
  border-bottom: 1px solid grey;
  text-align: center;
}

.track-container {
  display: flex;
  justify-content: center;
}

.track-header {
  font-size: 5vh;
  display: flex;
  justify-content: center;
  margin-bottom: 5vh;
}

.track-releasedate {
  width: fit-content;
  background-color: #00000000;
}
</style>