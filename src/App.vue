<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <div id="app">
    <img class="bg-img" src="/images/glassmo_bg.jpg">


    <router-view class="mainComponent"></router-view>

    <div id="login-box">
      <div>{{ username }}</div>
      <div v-if="username" @click="LogoutUser()">Logout</div>
      <div v-else @click="LoginUser()">Login</div>
    </div>

    <div class="sidebar-right">
    <router-link to="/projects"><img class="sidebar-right-item" src="/images/folder_copy.png"></router-link>
    <!-- <router-link to="/project"><img class="sidebar-right-item" src="/images/folder.png"></router-link> -->
    <router-link to="/newProject"><img class="sidebar-right-item" src="/images/create_new_folder.png"></router-link>
    <div class="sidebar-placeholder"></div>
    <router-link to="/tracks"><img class="sidebar-right-item" src="/images/file_copy.png"></router-link>
    <!-- <router-link to="/track"><img class="sidebar-right-item" src="/images/draft.png"></router-link> -->
    <router-link to="/newTrack"><img class="sidebar-right-item" src="/images/note_add.png"></router-link>
    <div @click="LoginUser()">LOGIN</div>
  </div>
  </div>
</template>

<script>

import Oidc from "oidc-client";
export default {
  data() {
    return {
      currentView: String,
      accessToken: String,
      oidcClient: Object,
      clientConfig: Object,
      username: String
    }
  },
  components: {
    // SidebarVue
    // ProjectsVue,
    // ProjectVue
  },
  methods: {
    test() {
      console.log(test)
    },
    setProject() {
      this.$project = 1
    },
    setView(view) {
      this.currentView = view;
    },
    LoginUser() { //Hiermit loggt man sich auf dem Admininterface ein
      console.log('LoginUser()')
      this.oidcClient.signinRedirect().catch((error) => {
        console.log("Fehler beim Login!");
        console.log(error);
      });
    },
    LogoutUser() { //Hiermit Meldet man sich vom Admininterface ab
      this.oidcClient.signoutRedirect().catch(() => {
        console.log("Fehler beim Logout!");
      });
    }
  },
  mounted() {
    this.setProject();
    this.currentView = 'projects';

    
    this.clientConfig = {
      authority: 'http://localhost:8082/realms/OIDC-Demo',
      client_id: 'project-ms',
      redirect_uri: 'http://localhost:3000',
      response_type: "id_token token",
      scope: "openid",
      userStore: new Oidc.WebStorageStateStore({}),
      post_logout_redirect_uri: 'http://localhost:3000',
    };
    this.oidcClient = new Oidc.UserManager(this.clientConfig);
    this.oidcClient
      .signinRedirectCallback()
      .then(() => {
        console.log("Signin Redirect erfolgreich");
        this.oidcClient.getUser().then((user) => {
          console.log(user);
          this.username = user?.profile.name;
          this.$user = user?.profile.preferred_username;
          this.accessToken = user?.access_token;
          this.$accesstok = user?.access_token;
        });
      })
      .catch(() => {
        console.log("Fehler beim Signin Redirect");
      });

    this.oidcClient
      .getUser()
      .then((user) => {
        console.log(user?.profile.preferred_username + Date.now())
        this.username = user?.profile.name;
        this.$user = user?.profile.preferred_username;
        this.accessToken = user?.access_token;
        this.$accesstok = user?.access_token;
      })
      .catch(() => {
        this.username = "";
      });
  }
}
</script>

<style>
  #login-box {
   position: absolute;
   top: 2vh;
   right: 2vw; 
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  #app {
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
  }

  .glassmo-box {
    background-color: #ffffff44;
    box-shadow: inset 0 0 2vh #ffffffaa;
    border-radius: 1vh;
  }

  .app-input {
    outline: none;
    border: none;
    background-color: #00000000;
  }

  a {
    text-decoration: none;
  }

  .app-input:focus {
    outline: none;
  }

  .bg-img {
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: 0.4;
  }

  .mainComponent {
    height: 80%;
    width: 75%;
    position: relative;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
  }

  .sidebar-right {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.18);
    height: fit-content;
    padding: 4vh 0;
    width: 6%;
    top: 50%;
    transform: translateY(-50%);
    border-top-right-radius: 8vh;
    border-bottom-right-radius: 8vh;
    box-shadow: inset 0 0 2vh rgba(255, 255, 255, 0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .sidebar-right-item {
    margin: 1.5vh;
    cursor: pointer;
    opacity: 0.4;
  }

  .sidebar-right-item:hover {
    opacity: 0.9;
  }

  .sidebar-placeholder {
    background-color: rgba(0, 0, 0, 0.3);
    height: 2px;
    width: 60%;
    margin: 2vh 0;
  }
</style>
