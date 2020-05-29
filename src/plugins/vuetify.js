import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

import zhHans from 'vuetify/es5/locale/zh-Hans'
import ja from 'vuetify/es5/locale/ja'
import en from 'vuetify/es5/locale/en'

export default new Vuetify({
  lang:{
    locales: {zhHans,ja,en},
    current: 'ja'
  },
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#607d8b',
        secondary: '#ff9800',
        accent: '#2196f3',
        error: '#f44336',
        warning: '#ffc107',
        info: '#03a9f4',
        success: '#4caf50'
      }
    },
  },
});
