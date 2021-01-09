<template>
  <div class="card p-3 coupon animation-slide-in">
    <p class="ml-1">
      {{ coupon.title }}<i class="fas fa-hand-holding-heart icon"></i>
    </p>
    <p class="description-black-box">{{ coupon.description }}</p>
    <p class="small">
      ₹ {{ coupon.minimum_fund }} - {{ coupon.maximum_fund }}.
    </p>
    <p style="font-size: 11px;">
      Valid till
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
}
</style>

<script>
export default {
  name: "CouponDetail",
  props: ["coupon"]
};
</script>
