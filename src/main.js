import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import './utils/constant';
import './control';
import { subscribeRecord } from './utils';
subscribeRecord(store);

createApp(App)
  .use(store)
  .mount('#app')
