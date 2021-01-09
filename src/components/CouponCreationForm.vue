<template>
  <div class="pt-5 coupon-form">
    <form @submit.prevent="createCoupon">
      <div class="form-group mb-1">
        <label for="title" class="sr-only">Title</label>
        <input
          id="title"
          type="text"
          class="form-control pl-0 border-0 rounded-0 border-bottom-default"
          placeholder="Back for the Delight"
          v-model="title"
          v-bind:class="{
            'border-bottom-danger': errors.title.length
          }"
          v-on:input="errors.title = []"
        />
        <div class="small text-muted mt-1">
          A suitable title for your Gift Card
        </div>
        <div class="text-danger small">{{ errors.title.join() }}</div>
      </div>
      <div class="form-group">
        <label for="description" class="sr-only">Description</label>
        <textarea
          id="description"
          type="text"
          placeholder="50% discount on your next purchase (max upto to the amount funded)"
          class="form-control pl-0 border-0 rounded-0 border-bottom-default mb-2"
          v-model="description"
          v-bind:class="{
            'border-bottom-danger': errors.description.length
          }"
          v-on:input="errors.description = []"
        ></textarea>
        <div class="small text-muted mt-1">
          A description for the Gift Card. Remember to include all the necessary
          info.
        </div>
        <div class="text-danger small">{{ errors.description.join() }}</div>
      </div>
      <div class="form-group mb-1">
        <label for="minimum_fund" class="sr-only">Minimum Fund</label>
        <input
          id="minimum_fund"
          type="number"
          class="form-control pl-0 border-0 rounded-0 border-bottom-default"
          placeholder
          v-model="minimum_fund"
          v-on:input="errors.minimum_fund = []"
          v-bind:class="{
            'border-bottom-danger': errors.minimum_fund.length
          }"
        />
        <div class="small text-muted mt-1">
          The minimum funding amount in which this Gift Card is valid.
        </div>
        <div class="text-danger small">{{ errors.minimum_fund.join() }}</div>
      </div>
      <div class="form-group mb-1">
        <label for="maximum_fund" class="sr-only">Maximum Fund</label>
        <input
          id="maximum_fund"
          type="number"
          class="form-control pl-0 border-0 rounded-0 border-bottom-default"
          placeholder
          v-model="maximum_fund"
          v-on:input="errors.maximum_fund = []"
          v-bind:class="{
            'border-bottom-danger': errors.maximum_fund.length
          }"
        />
        <div class="small text-muted mt-1">
          The maximum funding amount in which this Gift Card is valid.
        </div>
        <div class="text-danger small">{{ errors.maximum_fund.join() }}</div>
      </div>
      <div class="form-group mb-1">
        <label for="validity_start_date" class="sr-only">Valid from</label>
        <input
          id="validity_start_date"
          type="text"
          class="form-control pl-0 border-0 rounded-0 border-bottom-default"
          placeholder
          v-model="validity_start_date"
          v-on:input="errors.validity_start_date = []"
          v-bind:class="{
            'border-bottom-danger': errors.validity_start_date.length
          }"
        />
        <div class="small text-muted mt-1">
          The date and time from which this Gift Card is valid. Input format:
          YYYY-MM-DD HH:MM:SS
        </div>
        <div class="text-danger small">
          {{ errors.validity_start_date.join() }}
        </div>
      </div>
      <div class="form-group mb-1">
        <label for="validity_end_date" class="sr-only">Valid till</label>
        <input
          id="validity_end_date"
          type="text"
          class="form-control pl-0 border-0 rounded-0 border-bottom-default"
          placeholder
          v-model="validity_end_date"
          v-on:input="errors.validity_end_date = []"
          v-bind:class="{
            'border-bottom-danger': errors.validity_end_date.length
          }"
        />
        <div class="small text-muted mt-1">
          The date and time till which this Gift Card is valid. Input format:
          YYYY-MM-DD HH:MM:SS
        </div>
        <div class="text-danger small">
          {{ errors.validity_end_date.join() }}
        </div>
      </div>
      <div class="form-group">
        <default-button type="submit" text="Create Gift Card"></default-button>
      </div>
      <br />
      <br />
    </form>
  </div>
</template>

<style scoped></style>

<script>
import moment from "moment";
import DefaultButton from "../components/DefaultButton.vue";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const OrganizationRepository = RepositoryFactory.get("organization");

export default {
  name: "CouponCreationForm",
  components: {
    "default-button": DefaultButton
  },
  data: function() {
    return {
      title: "",
      description: "",
      minimum_fund: "",
      maximum_fund: "",
      validity_start_date: "",
      validity_end_date: "",
      errors: {
        title: [],
        description: [],
        minimum_fund: [],
        maximum_fund: [],
        validity_start_date: [],
        validity_end_date: []
      }
    };
  },
  methods: {
    createCoupon() {
      this.validity_start_date = moment
        .utc(moment(this.validity_start_date))
        .format();
      this.validity_end_date = moment
        .utc(moment(this.validity_end_date))
        .format();

      let payload = {
        title: this.title,
        description: this.description,
        minimum_fund: this.minimum_fund,
        maximum_fund: this.maximum_fund,
        validity_start_date: this.validity_start_date,
        validity_end_date: this.validity_end_date
      };
      OrganizationRepository.createCoupon(
        this.$route.params.organizationId,
        payload
      )
        .then(data => {
          this.title = "";
          this.description = "";
          this.minimum_fund = "";
          this.maximum_fund = "";
          this.validity_start_date = "";
          this.validity_end_date = "";

          this.$emit("add-coupon", data.data.data.coupon);
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

<style scoped>
.coupon-form {
  margin-top: -20px;
}
</style>
