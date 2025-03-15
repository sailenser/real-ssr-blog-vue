<template>
  <div>
    <h1>Error 404</h1>
    <div class="alert alert-warning">
      {{ text }}
    </div>
  </div>
</template>

<script setup>
import usePageInfo from '@/composables/usePageInfo';

const props = defineProps({
  text: {
    type: String,
    default: 'Page not found'
  }
});

usePageInfo(props.text, 404);

</script>