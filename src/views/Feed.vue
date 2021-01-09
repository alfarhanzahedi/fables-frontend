<template>
  <div>
    <info-widget
      text="This is the part where the cool Machine Learning Shizz happens to rank all the organizations and lists!"
    ></info-widget>

    <header class="feed-masthead">
      <div class="container h-30">
        <div class="row h-100 align-items-center img-header">
          <img
            class="img-left fill-img"
            src="@/assets/images/image-left.svg"
            style="float:left;"
          />
          <div class="search-form animation-slide-in">
            <input
              id="search-text"
              class="search-box"
              type="text"
              name="search"
              placeholder="Find a local business"
            />
            <button class="btn btn-default rounded-0 mt-2 search-button">
              Search
            </button>
          </div>
          <img
            class="img-right fill-img"
            src="@/assets/images/image-right-2.svg"
            style="float:right;"
          />
        </div>
      </div>
    </header>

    <div class="secondary-nav shadow" id="secondary-nav">
      <ul>
        <li class="menu link-active" id="gift-card">
          <router-link class="nav-link" :to="{ name: 'Feed' }">
            <a>Organization</a>
          </router-link>
        </li>
        <li class="menu" id="fundraiser">
          <router-link class="nav-link" :to="{ name: 'Feed' }">
            <a>About</a>
          </router-link>
        </li>
        <li class="menu" id="settings">
          <router-link class="nav-link" :to="{ name: 'Dashboard' }">
            Settings
          </router-link>
        </li>
      </ul>
    </div>

    <div class="container mt-5">
      <div class="row">
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
      <div class="row">
        <div class="col-lg-12" v-if="isUserAuthenticated">
          <br />
          <h4>Recommended for you</h4>
          <hr />
        </div>
        <div
          class="col-lg-4 col-md-6 col-sm-6 col-xs-12 pt-5"
          v-for="organization in organizations"
          :key="organization.id"
        >
          <organization-card :organization="organization"></organization-card>
        </div>
      </div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
  </div>
</template>

<style scoped>
.feed-masthead {
  background-color: #fa9269;
  background-position: top;
  background-attachment: fixed;
  margin-top: 60px;
  height: 30vh;
  overflow: none;
}

.navbar {
  border-bottom: 1px solid rgb(233, 233, 233) !important;
}

.img-header {
  overflow: none;
}

.element-wrapper {
  margin: 0 auto;
}

.search-form {
  display: flex;
  width: 60%;
  margin: 80px auto;
  z-index: 90;
}

.search-form input {
  height: 50px;
  position: relative;
  top: 10px;
}

.search-form button {
  padding: 10px 24px 14px 24px;
  width: auto;
  border-radius: 0px 4px 4px 0px !important;
  position: relative;
  top: 2px;
}

#org_feed {
  margin-top: 50px;
  margin-bottom: 150px;
}

.card-content {
  padding: 15px;
  margin: 2px;
}

@media (min-width: 320px) and (max-width: 480px) {
  .search-form {
    width: 95%;
  }
}
</style>

<script>
import OrganizationCard from "../components/OrganizationCard.vue";
import InfoWidget from "../components/InfoWidget.vue";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const OrganizationRepository = RepositoryFactory.get("organization");

export default {
  name: "Feed",
  components: {
    "organization-card": OrganizationCard,
    "info-widget": InfoWidget
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    }
  },
  data: function() {
    return {
      organizations: []
    };
  },
  mounted() {
    OrganizationRepository.getOrganizations()
      .then(data => {
        this.organizations = data.data.data.organizations;
      })
      .catch(error => {
        console.log(error);
      });

    let function_script = document.createElement("script");
    function_script.setAttribute(
      "src",
      "https://jugaadcdn.netlify.app/fables/ui_functions.js"
    );
    document.head.appendChild(function_script);
  }
};
</script>
