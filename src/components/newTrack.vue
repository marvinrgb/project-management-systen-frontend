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
        <select class="app-input" name="track-genre-select" id="newproject-input-genre" value="default">
          <option v-for="genre in genres" :key="genre" :value="genre">{{genre}}</option>
        </select>      
      </div>
      <div class="newproject-row">
        <div class="newproject-key">Secondary Genre:</div>
        <select class="app-input" name="track-genre-select" id="newproject-input-secgenre" value="default">
          <option v-for="genre in genres" :key="genre" :value="genre">{{genre}}</option>
        </select>      
      </div>
      <div class="newproject-row">
        <div class="newproject-key">Length:</div>
        <input id="newproject-input-length-min" type="text" class="newproject-value">min
        <input id="newproject-input-length-sec" type="text" class="newproject-value">sec
      </div>
      <div class="newproject-row">
        <div class="newproject-key">Explicit:</div>
        <input id="newproject-input-explicit" type="checkbox" class="newproject-value">
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
  data() {
    return {
      genres: Array
    }
  },
  methods: {
    postTrack() {
      let name = document.getElementById('newproject-input-name').value;
      let description = document.getElementById('newproject-input-description').value;
      let genre = document.getElementById('newproject-input-genre').value;
      let secGenre = document.getElementById('newproject-input-secgenre').value;
      let lengthmin = parseInt(document.getElementById('newproject-input-length-min').value) || 0;
      let lengthsec = parseInt(document.getElementById('newproject-input-length-sec').value) || 0;
      let releasedate = document.getElementById('newproject-input-releasedate').value || '2022-01-01';
      let explicit = document.getElementById('newproject-input-explicit').checked;

      let data = {
        "name" : name,
        "description" : description,
        "genre" : genre,
        "secGenre" : secGenre,
        "length" : lengthmin * 60 + lengthsec,
        "releaseDate" : releasedate,
        "explicit" : explicit
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
    }
  },
  mounted() {
    this.getGenres();
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

#newproject-input-length-min {
  width: 4%;
}

#newproject-input-length-sec {
  width: 4%;
  margin-left: 2%;
}

#newproject-input-explicit {
  margin-right: 40%;
  background-color: #00000000;
}

</style>