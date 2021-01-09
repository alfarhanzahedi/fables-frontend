<template>
  <div>
    <header class="feed-masthead">
      <div class="container">
        <div class="row h-80 align-items-center img-header">
          <img
            class="img-left fill-img"
            src="@/assets/images/image-left.svg"
            style="float:left;"
          />
          <div class="search-form animation-slide-in desktop_illustration">
            <h2>
              <i class="fas fa-map-marker-alt"></i> &nbsp;{{
                organization.name
              }}
            </h2>
            <p>
              {{ organization.description }}
            </p>
          </div>
          <img
            class="img-right fill-img"
            src="@/assets/images/image-right-2.svg"
            style="float:right;"
          />
        </div>
      </div>
    </header>

    <div class="container h-100 pt-5 page-content">
      <!-- Payment Modal -->
      <payment-modal
        v-if="showModal"
        @close="showModal = false"
      ></payment-modal>
      <info-widget
        text="This Page talks with the backend & does the database sync and actual data exchange & update."
      ></info-widget>

      <div class="row h-100">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
          <div class="animation-slide-in">
            <div class="mobile_illustration details-card shadow">
              <h2>
                <b
                  ><i class="fas fa-map-marker-alt"></i> &nbsp;{{
                    organization.name
                  }}</b
                >
              </h2>
              <p>
                <span class="ml-2">{{ organization.address }}</span>
              </p>
              <p>
                <i class="fas fa-envelope"></i>
                <span class="ml-2">{{ organization.email }}</span>
              </p>
            </div>

            <h4 class="font-family__josefin-slab"><b>Reviews</b></h4>
            <div v-if="reviews.length">
              <div class="mt-3" v-for="review in reviews" :key="review.id">
                <div class="animation-slide-in mt-2">
                  <div class="element-wrapper">
                    <review-detail
                      :review="review"
                      :user="review.user"
                    ></review-detail>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="small">Be the First to add a review</p>
            </div>
            <div v-if="isUserAuthenticated" class="review-form">
              <review-creation-form
                @add-review="addReview"
              ></review-creation-form>
            </div>
          </div>

          <div class="animation-slide-in mt-2 desktop_illustration">
            <br />
            <img class="img-fluid" src="@/assets/images/business.png" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
          <div class="animation-slide-in mt-2">
            <div v-if="organization">
              <h2 class="font-family__josefin-slab">
                <b>About</b>
              </h2>
              <p>
                <i class="fas fa-map-marker-alt"></i>
                <span class="ml-2">{{ organization.address }}</span>
              </p>
              <p>
                <i class="fas fa-envelope"></i>
                <span class="ml-2">{{ organization.email }}</span>
              </p>
              <p class="description-box box-red">
                {{ organization.description }}
              </p>
            </div>

            <br />
            <h4 class="font-family__josefin-slab"><b>Gift Cards</b></h4>
            <div v-if="coupons.length" class="row">
              <div
                v-for="coupon in coupons"
                :key="coupon.id"
                class="col-lg-6 col-md-6 col-sm-6 col-xs-6 gift-card"
              >
                <div class="animation-slide-in">
                  <coupon-detail :coupon="coupon"></coupon-detail>
                </div>
              </div>
            </div>
            <div v-else>
              <p class="element-wrapper">
                If no suitable Gift Card exists for the Contribution bracket,
                the amount shall be considered a donation.
              </p>
            </div>

            <br />

            <div
              class="form-group animation-slide-in"
              v-if="!isAuthenticatedUserOwner"
            >
              <button
                v-if="isUserAuthenticated"
                class="sign_in_button button_lg button_huge"
                @click="showModal = true"
              >
                Contribute
              </button>
            </div>
          </div>
          <div v-if="isAuthenticatedUserOwner" class="animation-slide-in mt-2">
            <br />
            <h3 class="font-family__josefin-slab">Create Gift Card</h3>
            <coupon-creation-form
              @add-coupon="addCoupon"
            ></coupon-creation-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed-masthead {
  background-color: #faa369;
  background-position: top;
  background-attachment: fixed;
  margin-top: 60px;
  height: 30vh;
  overflow: none;
}

.button_huge {
  width: 100%;
}

/* @media (min-width: 320px) and (max-width: 480px) {
  .col-xs-6 {
    width: 50%;
  }
}

.col-xs-6 {
    width: 50%;
  } */

.box-red {
  background: rgb(222, 237, 255);
}

.gift-card {
  margin-top: 10px;
}

.review-form {
  margin-top: -30px;
}

.page-content {
  margin: 10px auto;
}

.page-content {
  position: relative;
  top: -40px;
}

.search-form {
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 80px auto;
  z-index: 90;
  justify-content: center;
  align-content: center;
}

.search-form p {
  position: relative;
  left: 35px;
}

@media (min-width: 320px) and (max-width: 480px) {
  .search-form {
    display: none;
  }
}
</style>

<script>
import ReviewCreationForm from "../components/ReviewCreationForm.vue";
import ReviewDetail from "../components/ReviewDetail.vue";
import CouponCreationForm from "../components/CouponCreationForm.vue";
import CouponDetail from "../components/CouponDetail.vue";
import InfoWidget from "../components/InfoWidget.vue";
import PaymentModal from "../components/PayementModal";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const OrganizationRepository = RepositoryFactory.get("organization");

export default {
  name: "OrganizationDetail",
  components: {
    "review-creation-form": ReviewCreationForm,
    "review-detail": ReviewDetail,
    "coupon-creation-form": CouponCreationForm,
    "coupon-detail": CouponDetail,
    "info-widget": InfoWidget,
    "payment-modal": PaymentModal
  },
  data: function() {
    return {
      organization: null,
      reviews: [],
      coupons: [],
      isAuthenticatedUserOwner: false,
      showModal: false
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.state.auth.isUserAuthenticated;
    }
  },
  methods: {
    addReview(review) {
      this.reviews.unshift(review);
    },
    addCoupon(coupon) {
      this.coupons.unshift(coupon);
    }
  },

  mounted() {
    OrganizationRepository.getOrganization(this.$route.params.organizationId)
      .then(data => {
        this.organization = data.data.data.organization;
        if (
          this.organization.owner.id ==
          this.$store.state.auth.authenticatedUser.id
        ) {
          this.isAuthenticatedUserOwner = true;
        }
      })
      .catch(error => {
        console.log(error.response);
      });

    OrganizationRepository.getAllReviews(this.$route.params.organizationId)
      .then(data => {
        this.reviews = data.data.data.reviews;
      })
      .catch(error => {
        console.log(error.response);
      });

    OrganizationRepository.getAllCoupons(this.$route.params.organizationId)
      .then(data => {
        this.coupons = data.data.data.coupons;
        console.log(this.coupons);
      })
      .catch(error => {
        console.log(error.response);
      });
  }
};
</script>
