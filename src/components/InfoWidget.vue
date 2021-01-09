<template>
  <div v-if="showWidget">
    <div class="info-widget shadow">
      <button type="button" class="close" @click="showWidget = false">
        <span aria-hidden="true">&times;</span>
      </button>
      <span class="beta-flag-notop"
        ><i class="fab fa-jedi-order"></i>&nbsp;&nbsp;</span
      >
      <b>Pro Tip</b>
      <p class="small">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoWidget",
  props: ["text"],
  data: function() {
    return {
      showWidget: true
    };
  }
};
</script>

<style scoped>
.info-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 250px;
  height: 120px;
  background: white;
  z-index: 100;

  padding: 10px 17px;
  border-radius: 10px;

  animation: float__up 0.6s;
}

.info-widget p {
  margin-top: 5px;
}

@media (min-width: 320px) and (max-width: 480px) {
  .info-widget {
    left: calc(50vw - 125px);
    top: calc(90vh - 60px);
  }
}

@keyframes float__up {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
