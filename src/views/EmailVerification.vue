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
    <div class="container h-100 mt-5 pt-5">
      <div class="row h-100 align-items-center">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
          <div class="animation-slide-in mt-2">
            <img class="img-fluid" src="@/assets/images/signin.png" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
          <form @submit.prevent="updateSession">
            <div class="animation-slide-in mt-2">
              <h1 class="font-family__josefin-slab">Sign In to Fables</h1>
              <br />
              <p>
                We have sent a 6-digit Sign-In Code to the email address you
                provided.
                <br />Enter that below to Sign In to your Fables account.
              </p>
            </div>

            <div class="animation-slide-in mt-2">
              <div class="form-group">
                <label for="code" class="sr-only">Sign-In Code</label>
                <input
                  id="code"
                  type="text"
                  minlength="6"
                  maxlength="6"
                  class="form-control pl-0 border-0 rounded-0 border-bottom-default"
                  placeholder="Enter Sign-in Code"
                  v-model="code"
                  v-bind:class="{
                    'border-bottom-danger': errors.code.length
                  }"
                  v-on:input="errors.code = []"
                />
                <span class="focus-border"></span><br />
                <div class="text-danger small mt-1">
                  {{ errors.code.join() }}
                </div>
              </div>
              <div class="form-group">
                <default-button
                  type="submit"
                  text="Verify & Sign In"
                ></default-button>
                <br />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <p>&nbsp;</p>
        </div>
        <br />
        <br />
        <div class="col-lg-6 col-md-6 col-sm-6">
          <img
            class="img-small"
            src="@/assets/images/miroodles.png"
            style="float:right;"
          />
          <br />
          <h5>Have a favourite Bookstore?</h5>
          <p class="small">
            This is your chance to save it from getting closed!
          </p>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-6 element-wrapper">
          Fables is a platform for Businesses to reach out to individuals and
          ensure that they have some sort of funding to keep their businnesses
          alive in the times of crises!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DefaultButton from "../components/DefaultButton.vue";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const SessionRepository = RepositoryFactory.get("session");

export default {
  name: "EmailVerification",
  components: {
    "default-button": DefaultButton
  },
  data: function() {
    return {
      code: "",
      errors: {
        code: []
      }
    };
  },

  methods: {
    updateSession() {
      let payload = {
        code: this.code
      };
      SessionRepository.updateSession(payload)
        .then(data => {
          this.$store.commit({
            type: "updateAuthState",
            authToken: data.data.data.token,
            authenticatedUser: data.data.data.user
          });

          this.$router.push({
            name: "Feed"
          });
        })
        .catch(error => {
          this.errors = error.response.data.data;
        });
    }
  }
};
</script>

<style scoped>
.feed-masthead {
  background-color: #ffc889;
  background-position: top;
  background-attachment: fixed;
  margin-top: 60px;
  height: 10vh;
  overflow: none;
}
</style>
