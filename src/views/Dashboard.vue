<template>
  <div>
    <header class="feed-masthead">
      <div class="container h-30">
        <div class="row h-100 align-items-center img-header">
          <img
            class="img-left fill-img"
            src="@/assets/images/image-left.svg"
            style="float:left;"
          />
          <div class="search-form animation-slide-in desktop_illustration">
            <h2>List your Business on Fables</h2>
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
          <a href="#gift_cards">Gift Cards</a>
        </li>
        <li class="menu" id="fundraiser">
          <a href="#organizations">Organizations</a>
        </li>
      </ul>
    </div>

    <div class="container h-100 pt-5 mt-4">
      <div class="row h-100 align-items-center">
        <div
          class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5 desktop_illustration"
        >
          <div class="animation-slide-in mt-2">
            <img class="img-fluid" src="@/assets/images/dashboard.png" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
          <div class="animation-slide-in mt-2">
            <h2 class="font-family__josefin-slab">Onboard Your Business</h2>
            <br />
            <p>
              We know that the times are hard now. And in these times, we want
              to help your business stay afloat. We want to make sure that the
              local businesses that we so love and
              <i class="fas fa-heart" style="color: rgb(255, 81, 148);"></i>
              stay on and we get to see them once the crisis is over. <br />List
              as a Business on Fables to sell Gift Cards, accept support from
              your Patrons, and create Fundraisers.
            </p>
            <router-link :to="{ name: 'OrganizationCreationForm' }">
              <default-button text="List Your Business"></default-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5 animation-slide-in">
      <div class="row element-wrapper" id="gift_cards">
        <div class="col-lg-12">
          <h5 class="font-family__josefin-slab">Gift Cards</h5>
          <hr />
          <span class="beta-flag-notop-2"
            ><i class="fab fa-jedi-order"></i
          ></span>
          <b>Cards received / redeemed by you</b>
        </div>
        <div
          class="col-lg-4 col-md-6 col-sm-6 col-xs-12 pt-5"
          v-for="coupon in coupons"
          :key="coupon.id"
        >
          <coupon-user :coupon="coupon"></coupon-user>
        </div>
      </div>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
    </div>
    <div class="container mt-5 animation-slide-in">
      <div class="row element-wrapper" id="organizations">
        <div class="col-lg-12">
          <h5 class="font-family__josefin-slab">Your Organizations</h5>
          <hr />
          <span class="beta-flag-notop-2"
            ><i class="fab fa-jedi-order"></i
          ></span>
          <b>Organizations created by you</b>
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

<script>
import DefaultButton from "../components/DefaultButton.vue";
import OrganizationCard from "../components/OrganizationCard.vue";
import CouponUser from "../components/CouponUser.vue";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const UserRepository = RepositoryFactory.get("user");

export default {
  name: "Dashboard",
  components: {
    "default-button": DefaultButton,
    "organization-card": OrganizationCard,
    "coupon-user": CouponUser
  },
  data: function() {
    return {
      organizations: [],
      coupons: []
    };
  },
  mounted() {
    const userId = this.$store.state.auth.authenticatedUser.id;
    UserRepository.getUserOrganizations(userId)
      .then(data => {
        this.organizations = data.data.data.organizations;
      })
      .catch(error => {
        console.log(error);
      });
    UserRepository.getUserCoupons(userId)
      .then(data => {
        this.coupons = data.data.data.coupons;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.feed-masthead {
  background-color: #fa9269;
  background-position: top;
  background-attachment: fixed;
  margin-top: 60px;
  height: 17vh;
  overflow: none;
}

.search-form {
  display: flex;
  width: 60%;
  margin: 40px auto;
  z-index: 90;
  justify-content: center;
  align-content: center;
}

.secondary-nav ul li {
  line-height: 53px;
}
</style>
