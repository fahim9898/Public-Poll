import Vue from 'vue'

import jquery from 'jquery';
import App from './QP/App.vue'
import NotFound from './QP/App.vue'
import Poll from './QP/Poll.vue'


window.$ = window.jQuery = jquery;
import "bootstrap";
import "./bootstrap8.min.css"
// import 'bootstrap/dist/css/bootstrap.min.css'


const routes ={
  '/': App,
  '/Poll': Poll,
  '/Poll/': Poll
} 

Vue.config.productionTip = false

// console.log($("body"))

// let vm = new Vue({
//   render: h => h(App),
// }).$mount('#app')
// console.log(vm)

const app = new Vue({
  el: "#app",
  data: {
    currentRoute: window.location.pathname,
  },
  computed: {
    ViewComponent() {
      const matchingView = routes[this.currentRoute] || NotFound;
      // console.log(matchingView)
      return matchingView
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});

window.addEventListener("popstate", () => {
  app.currentRoute = window.location.pathname;
});
