import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.config.globalProperties.$project = 0;

app.config.globalProperties.$backendip = '192.168.2.228:3100';

app.config.globalProperties.$user = 'adminmarv';
app.config.globalProperties.$accesstok = '';


// app.use('*', (req, res) => {
//   res.redirect('/')
// })

app.use(router)

app.mount('#app')
