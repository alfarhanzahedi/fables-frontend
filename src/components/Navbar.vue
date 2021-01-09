<template>
  <nav
    class="navbar navbar-expand-lg navbar-light fixed-top p-0"
    id="primary-nav"
  >
    <div class="container">
      <h3 class="navbar-brand ml-5"><i class="fas fa-feather"></i> Fables</h3>
      <button
        class="navbar-toggler mt-4"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mt-3 mr-lg-5">
          <li class="nav-item" v-if="!isUserAuthenticated">
            <router-link class="nav-link" :to="{ name: 'SignIn' }"
              >Sign In</router-link
            >
          </li>
          <li class="nav-item" v-if="isUserAuthenticated">
            <router-link class="nav-link" :to="{ name: 'Feed' }"
              >Feed</router-link
            >
          </li>
          <li class="nav-item" v-if="isUserAuthenticated">
            <router-link class="nav-link" :to="{ name: 'Dashboard' }"
              >Dashboard</router-link
            >
          </li>
          <li class="nav-item" v-if="isUserAuthenticated">
            <a
              class="nav-link"
              style="cursor: pointer;"
              v-on:click="deleteSession"
              >Sign Out</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    }
  },
  methods: {
    deleteSession() {
      this.$store.commit("deleteSession");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
/*
  Overriding Bootstrap's CSS for navbar.
*/
.navbar {
  width: 100vw;
  background-color: var(--color-bg);
  height: 70px;
}

@media (min-width: 320px) and (max-width: 480px) {
  .navbar {
    height: 66px;
  }
}

.navbar-brand {
  height: 100%;
  padding: 40px 20px 10px 20px;
  margin: 0px;
  font-size: 1.4em;
  background: bisque;
  z-index: 999999;
  margin-top: -35px;
}

.navbar-toggler {
  border: none;
}

.navbar-toggler-icon {
  top: -10px;
  position: relative;
}

.navbar-toggler:focus {
  outline: none;
}

.nav-item .nav-link {
  color: var(--color-text) !important;
}

.navbar-collapse {
  width: 100vw;
  text-align: right;
  padding: 10px;
  position: relative;
  padding-top: 40px;
  top: -25px;
  background-color: var(--color-bg);
}
</style>
