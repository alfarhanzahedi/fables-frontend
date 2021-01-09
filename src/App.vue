<template>
  <div id="app" class="font-family__nunito h-100">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<style></style>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar }
};
</script>
