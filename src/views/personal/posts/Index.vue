<template>
  <div>Personal Post Index</div>
  <RouterLink :to="{ name: 'personal.posts.create' }">Create post</RouterLink>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
  import usePageInfo from '@/composables/usePageInfo';

  usePageInfo('Grud Posts');
</script>
