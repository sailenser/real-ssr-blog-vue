<template>
  <div>
    <h1>Posts</h1>
    <div
        v-if="request.success"
        class="page-posts"
    >
      <div
          v-for="post in request.data"
          :key="post.id"
          class="page-post page-posts__post"
      >
        <span>{{ post.title }}</span>
        <div>
          <RouterLink :to="{ name: 'blog.post', params: { id: post.id } }">Read more</RouterLink>
        </div>
        <div v-if="authStore.user?.id == post.user_id">
          <RouterLink :to="{ name: 'personal.posts.edit', params: { id: post.id } }">Edit</RouterLink>
          <button @click="removePost(post.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
  import useApi from '@/composables/useApi'
  import useStore from '@/composables/useStore'
  import useApiRequest from '@/composables/useApiRequest'
  import usePageInfo from '@/composables/usePageInfo';

  const api = useApi();
  const [ request, getAllPosts ] = useApiRequest('posts.all');
  const [ authStore ] = useStore('auth');

  usePageInfo('Блог');
  await getAllPosts();

  function removePost(id) {
    api.posts.remove(id);
    document.location = '/blog';
  }
</script>