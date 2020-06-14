import './bootstrap'
import Vue from 'vue'
import router from './router'
import vuetify from './plugins/vuetify'
import App from './App.vue'

const app = new Vue({
    vuetify,
    router,
    render: (h) => h(App)
}).$mount('#app')
