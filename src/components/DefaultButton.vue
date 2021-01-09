<template>
  <button :type="type" class="sign_in_button button_lg">{{ text }}</button>
</template>

<script>
export default {
  name: "DefaultButton",
  props: ["text", "type"]
};
</script>
