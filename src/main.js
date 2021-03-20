import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueResource from 'vue-resource'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {BootstrapVue} from 'bootstrap-vue' 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(BootstrapVue)
library.add( faEdit, faTrashAlt, faInfoCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueToast, {
  position: 'top'
})

const router=new VueRouter({
  routes:routes,
  mode:'history',
})

new Vue({
  render: h => h(App),
  router:router,
}).$mount('#app')
