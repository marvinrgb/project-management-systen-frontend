import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.config.globalProperties.$project = 0;

app.config.globalProperties.$backendip = 'localhost:3100';


// app.use('*', (req, res) => {
//   res.redirect('/')
// })

app.use(router)

app.mount('#app')
