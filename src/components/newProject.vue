<template>
  <div class="glassmo-box">
    <div class="newproject-table">
      <div class="newproject-row">
        <div class="newproject-key">Name:</div>
        <input id="newproject-input-name" type="text" class="newproject-value">
      </div>
      <div class="newproject-row">
        <div class="newproject-key">Description:</div>
        <input id="newproject-input-description" type="text" class="newproject-value">
      </div>
      <div class="newproject-row">
        <div @click="postProject()" class="glassmo-box" id="newproject-send">Send</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    postProject() {
      let name = document.getElementById('newproject-input-name').value;
      let description = document.getElementById('newproject-input-description').value;
      let body = {
          "name" : name,
          "description" : description,
          "user" : this.$user
        }
      fetch('http://localhost:3100/project', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json  '
        },
        body: JSON.stringify(body)
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          window.location.replace(`http://localhost:3000/project/${data.id}`)
        }
      })
      .catch((err) => {
        if (err) {
          console.error(err)
        }
      })
    }
  }
}
</script>

<style>
#newproject-send {
  margin: 5vh auto;
  padding: 2vh 3vw;
  user-select: none;
  cursor: pointer;
}

#newproject-send:hover {
  background-color: #ffffff66;
}

.glassmo-box {
  background-color: #ffffff44;
  box-shadow: inset 0 0 2vh #ffffffaa;
  border-radius: 1vh;
}

.newproject-table {
  width: 50%;
  height: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  padding: 2% 10% 0 10%;
  font-size: 2.8vh;
}

.newproject-row {
  display: flex;
  margin: 3% 0;
}

.newproject-key {
  width: 40%;
}

.newproject-value {
  background-color: #00000000;
  outline: none;
  border: none;
  border-bottom: 1px solid grey;
  width: 70%;
}

.newproject-value:focus {
  outline: none;
}

</style>