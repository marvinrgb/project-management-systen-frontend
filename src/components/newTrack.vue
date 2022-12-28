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
        <div class="newproject-key">Genre:</div>
        <input id="newproject-input-genre" type="text" class="newproject-value">
      </div>
      <div class="newproject-row">
        <div class="newproject-key">Length:</div>
        <input id="newproject-input-length" type="text" class="newproject-value">
      </div>
      <div class="newproject-row">
        <div class="newproject-key">Release Date:</div>
        <input id="newproject-input-releasedate" type="date" class="newproject-value">
      </div>
      <div class="newproject-row">
        <div @click="postTrack()" class="glassmo-box" id="newproject-send">Send</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    postTrack() {
      let name = document.getElementById('newproject-input-name').value;
      let description = document.getElementById('newproject-input-description').value;
      let genre = document.getElementById('newproject-input-genre').value || 'default';
      let length = parseInt(document.getElementById('newproject-input-length').value) || 0;
      let releasedate = document.getElementById('newproject-input-releasedate').value || '2022-01-01';

      let data = {
        "name" : name,
        "description" : description,
        "genre" : genre,
        "length" : length,
        "releaseDate" : releasedate
      }

      fetch(`http://${this.$backendip}/track`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.id) {
          window.location.replace(`http://localhost:3000/track/${data.id}`)
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
.newproject-table {
  width: 85%;
}

.newproject-key {
  width: 40%;
}

</style>