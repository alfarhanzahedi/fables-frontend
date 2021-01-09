<template>
  <div>
    <header class="feed-masthead">
      <div class="container">
        <div class="row h-80 align-items-center img-header">
          <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
            <div class="animation-slide-in mt-2">
              <!-- <h1 class="header-text-banner">Sign In</h1> -->
            </div>
          </div>
          <img
            class="img-right fill-img"
            src="@/assets/images/image-right-2.svg"
            style="float:right;"
          />
        </div>
      </div>
    </header>

    <div class="container pt-5">
      <div class="row h-100 align-items-center">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
          <div class="animation-slide-in mt-2">
            <img class="img-fluid" src="@/assets/images/signin.png" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
          <form @submit.prevent="createSession">
            <div class="animation-slide-in mt-2">
              <h1 class="font-family__josefin-slab">Sign In to Fables</h1>
              <br />
            </div>
            <div class="animation-slide-in mt-2">
              <div class="form-group">
                <label for="email" class="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control pl-0 border-0 rounded-0 border-bottom-default"
                  placeholder="hello@example.com"
                  v-model="email"
                  v-bind:class="{
                    'border-bottom-danger': errors.email.length
                  }"
                  v-on:input="errors.email = []"
                />
                <span class="focus-border"></span><br />
                <div class="text-danger small mt-1">
                  {{ errors.email.join() }}
                </div>
              </div>
              <div class="form-group">
                <default-button
                  type="submit"
                  text="Get Sign-In Code"
                ></default-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed-masthead {
  background-color: #fac069;
  background-position: top;
  background-attachment: fixed;
  margin-top: 60px;
  height: 10vh;
  overflow: none;
}

.navbar {
  border-bottom: 1px solid rgb(233, 233, 233) !important;
}
</style>

<script>
import DefaultButton from "../components/DefaultButton.vue";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const SessionRepository = RepositoryFactory.get("session");

export default {
  name: "SignIn",
  components: {
    "default-button": DefaultButton
  },
  data: function() {
    return {
      email: "",
      errors: {
        email: []
      }
    };
  },

  methods: {
    createSession() {
      let payload = {
        email: this.email
      };
      SessionRepository.createSession(payload)
        .then(() => {
          this.$router.push({
            name: "EmailVerification"
          });
        })
        .catch(error => {
          if (error.response.data.data) {
            Object.assign(this.errors, error.response.data.data);
          }
        });
    }
  }
};
</script>
