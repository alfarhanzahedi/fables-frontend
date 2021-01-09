<template>
  <div class="pt-5">
    <form @submit.prevent="createReview" class="element-wrapper">
      <p></p>
      <div class="form-group mb-1">
        <div class="form-group ml-n1">
          <label for="rating" class="sr-only">Rating</label>
          <star-rating
            id="rating"
            v-model="rating"
            :star-size="20"
            :rounded-corners="true"
            :show-rating="false"
            @rating-selected="errors.rating = []"
          ></star-rating>
          <div class="text-danger small mt-1">{{ errors.rating.join() }}</div>
        </div>

        <label for="comment" class="sr-only">Comment</label>
        <input
          id="comment"
          type="text"
          class="form-control pl-0 border-0 rounded-0 border-bottom-default"
          placeholder="It's a nice establishment. 100% recommended!"
          v-model="comment"
        />
        <div class="small text-muted mt-1">
          We love to hear what you think about this org
        </div>
      </div>
      <div class="form-group">
        <button type="submit" class="button_lg">Post Review</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
input {
  background: transparent;
}
</style>

<script>
import StarRating from "vue-star-rating";

import { RepositoryFactory } from "../repositories/RepositoryFactory";
const OrganizationRepository = RepositoryFactory.get("organization");

export default {
  name: "ReviewCreationForm",
  components: {
    "star-rating": StarRating
  },
  data: function() {
    return {
      rating: 0,
      comment: "",
      errors: {
        rating: [],
        comment: []
      }
    };
  },

  methods: {
    createReview() {
      let payload = {
        rating: this.rating,
        comment: this.comment
      };
      OrganizationRepository.createReview(
        this.$route.params.organizationId,
        payload
      )
        .then(data => {
          this.rating = 0;
          this.comment = "";
          this.$emit("add-review", data.data.data.review);
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
