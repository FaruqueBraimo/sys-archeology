import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import candidate from "./modules/candidates";
import employee from "./modules/employees";
import license from "./modules/licenses";
import settings from './modules/settings'
import report from './modules/reports'


Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      candidate,
      employee,
      license,
      settings,
      report
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
