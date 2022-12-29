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
        <select class="app-input" name="track-genre-select" id="track-genre" :value="track.genre">
          <option v-for="genre in genres" :key="genre" :value="genre">{{genre}}</option>
        </select>
      </div>
      <div class="row">
        <div class="key">Secondary Genre: </div>
        <select class="app-input" name="track-genre-select" id="track-secgenre" :value="track.secGenre">
          <option v-for="genre in genres" :key="genre" :value="genre">{{genre}}</option>
        </select>
      </div>
      <div class="row">
        <div class="key">Explicit: </div>
        <input id="track-explicit-checkbox" v-if="track.explicit" type="checkbox" checked>
        <input id="track-explicit-checkbox" v-else type="checkbox">
      </div>
      <div class="row">
        <div class="key">Length: </div>
        <input :value="`${Math.floor(track.length/60)}`" id="track-input-length-min" type="text" class="newproject-value">min
        <input :value="`${track.length%60}`" id="track-input-length-sec" type="text" class="newproject-value">sec
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
      <div @click="deleteTrack()" class="glassmo-box delete-project-button" id="project-delete">
        Delete Track
      </div>
      <div class="glassmo-box save-changes-button" id="track-save-changes">
        Save Changes
      </div>
    </div>
  </div>  
</template>

<script>
import { nextTick } from '@vue/runtime-core';
export default {
  data() {
    return {
      track: Object,
      newTrack: Object,
      projects: Object,
      genres: Array
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
        if (document.getElementById('track-input-length-min').value == '' || document.getElementById('track-input-length-sec').value == '') {
        } else if (isNaN(parseInt(document.getElementById('track-input-length-min').value)) || isNaN(parseInt(document.getElementById('track-input-length-sec').value))) {
          alert('length must only contain numeric characters');
        } else {
          this.newTrack.length = parseInt(document.getElementById('track-input-length-min').value) * 60 + parseInt(document.getElementById('track-input-length-sec').value);
        }
        let saveButton = document.getElementById('track-save-changes')
        saveButton.style.color = '#111';
        saveButton.style.cursor = 'pointer'
      })
      detailBox.addEventListener('change', (event) => {
        this.newTrack.releaseDate = document.getElementById('track-releasedate').value;
        this.newTrack.projectId = parseInt(document.getElementById('track-projectId').value);
        this.newTrack.genre = document.getElementById('track-genre').value;
        this.newTrack.secGenre = document.getElementById('track-secgenre').value;
        this.newTrack.explicit = document.getElementById('track-explicit-checkbox').checked;
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
        'projectId' : this.newTrack.projectId,
        'secGenre' : this.newTrack.secGenre,
        'explicit' : this.newTrack.explicit
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
    },
    getGenres() {
      fetch(`http://${this.$backendip}/genres`)
      .then((res) => res.json())
      .then((data) => {
        this.genres = data;
      })
      .catch((err) => {
        console.log(err)
      })
    },
    deleteTrack() {
      if (confirm('Do you really want to delete this track forever?')) {
        console.log({ 'id' : this.track.id })
        fetch(`http://${this.$backendip}/track`, {
          method: 'DELETE',
          headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({ 'id' : this.track.id })
        })
        .then((res) => {
          if (res.status == 200) {
            window.location.href = "/tracks"
          }
        })
      }
    }
  },
  mounted() {
    this.getProjects();
    this.getTrack();
    this.getGenres();
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

.delete-project-button {
  position: absolute;
  right: 2vw;
  top: 2vh;
  cursor: pointer;
  padding: 1vh 2vh;
  color: rgb(40, 40, 40);
  user-select: none;
}

#track-input-length-min {
  width: 3%;
}

#track-input-length-sec {
  width: 3%;
  margin-left: 2%;
}
</style>