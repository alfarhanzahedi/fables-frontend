import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      isUserAuthenticated: !!localStorage.getItem("authToken") || false,
      authenticatedUser:
        JSON.parse(localStorage.getItem("authenticatedUser")) || null
    }
  },
  mutations: {
    updateAuthState(state, payload) {
      localStorage.setItem("authToken", payload.authToken);
      localStorage.setItem(
        "authenticatedUser",
        JSON.stringify(payload.authenticatedUser)
      );

      state.auth.isUserAuthenticated =
        !!localStorage.getItem("authToken") || false;
      state.auth.authenticatedUser =
        JSON.parse(localStorage.getItem("authenticatedUser")) || null;
    },
    deleteSession(state) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authenticatedUser");

      state.auth.isUserAuthenticated = false;
      state.auth.authenticatedUser = null;
    }
  },
  actions: {},
  modules: {}
});
