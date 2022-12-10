<template>
  <div class="project-container">
    <input id="id-input" class="id-input">
      <div v-if="project.id" id="detail-box" class="detail-box">
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
          <div class="value">{{project.genres}}</div>
        </div>
        <div class="row">
          <div class="key">Length: </div>
          <div class="value">{{project.length}}</div>
        </div>
        <div class="row">
          <div class="key">Date Added: </div>
          <div class="value">{{dateReadable(project.createdAt)}}</div>
        </div>
        <div @click="putProject()" class="glassmo-box save-changes-button" id="project-save-changes">
          Save Changes
        </div>
      </div>
      <div class="tracks-box">
        <div class="track-row" v-for="(value, index) in tracks" v-bind:key="index">
          <div class="track-name">{{value.name}}</div>
          <div class="track-genre">{{value.genre}}</div>
          <div>{{value.length}}</div>
        </div>
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
  width: 25%;
}

.tracks-box {
  width: 80%;
  align-self: center;
}

.track-row {
  margin-top: 2vh;
  display: flex;
  padding: 2vh;
  border-radius: 2vh;
  box-shadow: inset 0 0 2vh #ffffffaa;
  background-color: #ffffff44;
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

</style>

<script>
export default {
  data() {
    return {
      project: Object,
      apiIp: String,
      tracks: Object,
      newProject: Object
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
      .then((data) => {
        if (!data) {
          this.project.id = undefined;
          return;
        }
        this.project = data;
        this.newProject = data;
        setTimeout(() => {
          document.getElementById('detail-box').addEventListener('keyup', (event => {
            let button = document.getElementById('project-save-changes');
            button.style.color = '#111';
            button.style.cursor = 'pointer';
          }))
        }, 1)
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
      })
      .catch((err) => {
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
      let data = {
        "id" : this.project.id,
        "name" : name,
        "description" : description
      }
      fetch(`http://${this.$backendip}/project`, {
        "method" : 'PUT',
        "headers" : {
          'Content-Type' : 'application/json'
        },
        "body" : JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((data) => {
        let button = document.getElementById('project-save-changes');
        button.style.color = '#777';
        button.style.cursor = 'default';
      })
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
