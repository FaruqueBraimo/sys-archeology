import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import candidate from "./modules/candidates";
import employee from "./modules/employees";
import vacancy from "./modules/vacancies";
import settings from './modules/settings'

import course from "./modules/courses";

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
      vacancy,
      settings,
      course
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
