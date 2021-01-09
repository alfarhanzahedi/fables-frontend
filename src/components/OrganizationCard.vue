<template>
  <div class="card animation-slide-in org-card">
    <div class="card-content p-3">
      <h3 class="font-family__josefin-slab">
        <b>{{ organization.name }}</b>
      </h3>
      <p class="small">{{ organization.description.substring(0, 140) }}</p>
      <p>
        <i class="fas fa-map-marker-alt"></i>
        {{ organization.address.substring(0, 30) }}
      </p>
      <a :href="'mailto:' + organization.email">
        <i class="fas fa-envelope"></i>
        {{ organization.email }}
      </a>
      <br />
      <router-link
        :to="{
          name: 'OrganizationDetail',
          params: { organizationId: organization.id }
        }"
      >
        <button class="btn btn-alternate">View More</button>
      </router-link>
      <a class="card-phone" href="tel:+919856236956">
        <i class="fas fa-phone"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrganizationCard",
  props: ["organization"]
};
</script>

<style scoped>
.amount-collected {
  position: relative;
  background: white;
  padding: 6px 12px;
  border-radius: 50px;
}
</style>
