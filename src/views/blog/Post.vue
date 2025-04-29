<template>
  <div class="page-blog">
    <RouterLink
        :to="{ name: 'blog.index'}"
        class="page-post__btn page-post__btn--back"
    >
      Назад
    </RouterLink>
    <div v-if="request.success">
      <h1>{{ request.data.title }}</h1>
      <div>{{ request.data.url }}</div>
      <div>{{ request.data.contents }}</div>
      <AppCommentWidget :id="value" />
    </div>
    <E404 v-else text="Post not found" />
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
  import useApi from '@/composables/useApi'
  import useApiRequest from '@/composables/useApiRequest'
  import useRouteInt from '@/composables/useRouteInt'
  import usePageInfo from '@/composables/usePageInfo';
  import E404 from '@/components/errors/E404.vue'
  import AppCommentWidget from '@/components/comments/Widget.vue'

  const { valid, value } = useRouteInt('id');
  const api = useApi();
  const [ request, getProduct ] = useApiRequest('posts.one');

  await getProduct(value.value);

  if(request.value.success){
    usePageInfo(request.value.data.title);
  }
</script>