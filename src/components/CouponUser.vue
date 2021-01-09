<template>
  <div class="card p-3 coupon animation-slide-in">
    <h5 class="ml-1 font-family__josefin-slab">
      {{ coupon.title }}<i class="fas fa-hand-holding-heart icon"></i>
    </h5>
    <p class="description-black-box">{{ coupon.description }}</p>
    <p class="">Amount funded: {{ coupon.amount }}</p>
    <p class="small" style="font-size:11px;">
      * Valid till
      <!-- {{ coupon.validity_start_date | moment("Do MMMM, YYYY, h:mm:ss a") }} to -->
      {{ coupon.validity_end_date | moment("Do MMMM, YYYY, h:mm:ss a") }}.
    </p>
  </div>
</template>

<style scoped>
.icon {
  float: right;
  width: 26px;
  height: 26px;
  background: bisque;
  padding: 6px;
  border-radius: 50px;
}

.description-black-box {
  color: rgb(39, 39, 39);
  background: rgb(232, 242, 255);
  padding: 5px 10px;
  border-radius: 3px;
}

.coupon {
  padding-bottom: 0px !important;
  margin-left: -15px;
}
</style>

<script>
export default {
  name: "CouponUser",
  props: ["coupon"]
};
</script>
