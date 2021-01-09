<template>
  <div class="container pt-5">
    <div class="row align-items-center">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
        <div class="animation-slide-in mt-2">
          <img class="img-fluid" src="@/assets/images/business_list.png" />
          <br />
          <h3 class="font-family__josefin-slab">Things to keep note of:</h3>
          <ul class="ml-n1">
            <li>
              Remember to fill in correct details to be eligible to get listed
              as a funsraiser.
            </li>
            <li>
              Our system uses a some serious ranking jujitsu to ensure that we
              show your business to the right individuals.
              <br />We would be showing your listing to the people most likely
              to be a patron.
            </li>
            <li>Be Patient!</li>
          </ul>
          <h5 class="font-family__josefin-slab">
            That's All, let's get you rolling!
          </h5>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
        <div class="animation-slide-in mt-2">
          <form @submit.prevent="createOrganization" class="element-wrapper">
            <h2 class="font-family__josefin-slab">
              Onboarding<span class="beta-flag-notop-2"
                ><i class="fas fa-business-time"></i
              ></span>
            </h2>
            <p>Just fill up this form and you're good to go!</p>
            <div class="form-group">
              <label for="name" class="sr-only">Name</label>
              <input
                id="name"
                type="text"
                class="form-control pl-0 border-0 rounded-0 border-bottom-default"
                placeholder="Sesame Street"
                v-model="name"
                v-bind:class="{
                  'border-bottom-danger': errors.name.length
                }"
                v-on:input="errors.name = []"
              />
              <div class="small text-muted mt-1">
                The name of your organization.
              </div>
              <div class="text-danger small">{{ errors.name.join() }}</div>
            </div>
            <div class="form-group">
              <label for="description" class="sr-only">Description</label>
              <textarea
                id="description"
                type="text"
                placeholder="Keep this authentic"
                class="form-control pl-0 border-0 rounded-0 border-bottom-default mb-2"
                v-model="description"
                v-bind:class="{
                  'border-bottom-danger': errors.description.length
                }"
                v-on:input="errors.description = []"
              ></textarea>
              <div class="small text-muted mt-1">
                A description for your organization. Remember to make it
                interesting :)
              </div>
              <div class="text-danger small">
                {{ errors.description.join() }}
              </div>
            </div>
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
              <div class="small text-muted mt-1">
                The email address through which people can get in touch with the
                organization.
              </div>
              <div class="text-danger small">{{ errors.email.join() }}</div>
            </div>
            <div class="form-group">
              <label for="address" class="sr-only">Address</label>
              <vue-google-autocomplete
                id="address"
                class="form-control pl-0 border-0 rounded-0 border-bottom-default"
                placeholder
                v-on:placechanged="getAddressData"
                v-model="address"
                v-bind:class="{
                  'border-bottom-danger': errors.address.length
                }"
                v-on:input="errors.address = []"
              ></vue-google-autocomplete>
              <div class="small text-muted mt-1">
                The address of the organization. Type to get suggestions.
              </div>
              <div class="text-danger small">{{ errors.address.join() }}</div>
            </div>
            <div class="form-group">
              <label for="amount_to_be_raised" class="sr-only"
                >Amount to be raised</label
              >
              <input
                id="amount_to_be_raised"
                type="number"
                class="form-control pl-0 border-0 rounded-0 border-bottom-default"
                placeholder="1000"
                v-model="amount_to_be_raised"
                v-bind:class="{
                  'border-bottom-danger': errors.amount_to_be_raised.length
                }"
                v-on:input="errors.amount_to_be_raised = []"
              />
              <div class="small text-muted mt-1">
                The amount that your organization needs to raise as
                funding/donations.
              </div>
              <div class="text-danger small">
                {{ errors.amount_to_be_raised.join() }}
              </div>
            </div>
            <div class="form-group">
              <default-button type="submit" text="Onboard"></default-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input,
textarea {
  background: transparent;
}
.element-wrapper {
  padding: 30px 40px 30px 40px;
}

.beta-flag-notop-2 {
  float: right;
  font-size: 16px;
  padding: 10px;
  position: relative;
  left: 12px;
  top: -6px;
}
</style>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import DefaultButton from "../components/DefaultButton.vue";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const OrganizationRepository = RepositoryFactory.get("organization");

export default {
  name: "OrganizationCreationForm",
  components: {
    "default-button": DefaultButton,
    "vue-google-autocomplete": VueGoogleAutocomplete
  },
  data: function() {
    return {
      name: "",
      description: "",
      email: "",
      address: "",
      latitude: "",
      longitude: "",
      amount_to_be_raised: "",
      errors: {
        name: [],
        description: [],
        email: [],
        address: [],
        latitude: [],
        longitude: [],
        amount_to_be_raised: []
      }
    };
  },

  methods: {
    createOrganization() {
      let payload = {
        name: this.name,
        description: this.description,
        email: this.email,
        address: this.address,
        latitude: this.latitude,
        longitude: this.longitude,
        amount_to_be_raised: this.amount_to_be_raised
      };
      OrganizationRepository.createOrganization(payload)
        .then(data => {
          console.log(data.data.data.organization);
          this.$router.push({
            name: "OrganizationDetail",
            params: {
              organizationId: data.data.data.organization.id
            }
          });
        })
        .catch(error => {
          if (error.response.data.data) {
            Object.assign(this.errors, error.response.data.data);
            if (this.errors.address.length) {
              this.errors.address = [
                "Please select one of the addresses from the suggestions."
              ];
            }
          }
        });
    },
    getAddressData(addressData, placeResultData) {
      this.address = placeResultData.formatted_address;
      this.latitude = addressData.latitude;
      this.longitude = addressData.longitude;
      this.errors.address = [];
    }
  }
};
</script>
