<template>
  <div class="project-container">
    <input id="id-input" class="id-input">
      <div class="detail-box">
        <div class="row" v-for="(value, propertyName) in project" v-bind:key="propertyName">
          <div class="key">{{propertyName}}</div>
          <div class="value">{{value}}</div>
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
}

.key {
  width: 25%;
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
  padding: 2vh;
  border-radius: 2vh;
  box-shadow: inset 0 0 2vh #ffffffaa;
  background-color: #ffffff44;
  width: 70%;
  align-self: center;
  font-size: 2.5vh;
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
  background-color: #00000000;
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
      tracks: Object
    }
  },
  methods: {
    getProject() {
      fetch(`http://localhost:3100/project/${this.$project}`, {
        method: 'GET'
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.project = data;
      })
      .catch((err) => {
        console.log(err)
      })
    },
  getTracksForProject() {
    fetch(`http://localhost:3100/tracksByProject/${this.$project}`, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.tracks = data;
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    console.log("mounted")
    this.getProject();

    document.getElementById('id-input').addEventListener('keyup', (event) => {
      this.$project = parseInt(event.target.value);
      this.getProject();
      this.getTracksForProject();
    })
  }}
</script>
