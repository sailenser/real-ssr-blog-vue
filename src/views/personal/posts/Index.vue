<template>
  <div class="page-blog">
    <h2 class="page-blog__head page-blog__head--lk">Управление постами блога</h2>
    <RouterLink
        :to="{ name: 'personal.posts.create' }"
        class="page-blog__btn page-blog__btn--create"
    >
      Создать пост
    </RouterLink>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
  import usePageInfo from '@/composables/usePageInfo';

  usePageInfo('Grud Posts');
</script>
