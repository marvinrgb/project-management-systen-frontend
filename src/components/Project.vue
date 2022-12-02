<template>
  <div class="project-container">
    <input id="id-input" class="id-input">
      <!-- <div > -->
        <div class="row" v-for="(value, propertyName) in project" v-bind:key="propertyName">
          <div class="key">{{propertyName}}</div>
          <div class="value">{{value}}</div>
        </div>
      <!-- </div> -->
  </div>
</template>

<style>

.row {
  background-color: #ffffff44;
  display: flex;
  width: 80%;
  font-size: 3vh;
  height: fit-content;
  align-self: center;
  padding: 2vh;
  border-radius: 2vh;
  box-shadow: inset 0 0 2vh #ffffffaa;
  margin: -1vh 0;
}

.key {
  width: 25%;
}

.project-container {
  display: flex;
  flex-direction: column;
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
      apiIp: String
    }
  },
  methods: {
    getProject() {
      fetch(`http://localhost:3100/project/${this.$project}`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin' : 'http://localhost:3100'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.project = data;
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
    })
  }}
</script>
