<template>
  <div>
    <star-rating
      class="mb-1"
      @rating-selected="rating = $event"
      :rating="review.rating"
      :star-size="20"
      :rounded-corners="true"
      :show-rating="false"
      :read-only="true"
    ></star-rating>
    <div class="text-muted ml-1">{{ review.comment }}</div>
    <div class="small">
      -
      {{ user.first_name ? user.first_name : "Anonymous" }}, on
      {{ review.updated_at | moment("Do MMMM, YYYY") }}
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  name: "ReviewDetail",
  components: {
    "star-rating": StarRating
  },
  props: ["review", "user"]
};
</script>
