import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import httpRequest from '@/utils/httpRequest'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import nossData from '@/assets/js/allmint'


Vue.use(ElementUI, { size: 'medium', zIndex: 3000 });

Vue.prototype.$http = httpRequest;
Vue.prototype.$nossData = nossData;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
