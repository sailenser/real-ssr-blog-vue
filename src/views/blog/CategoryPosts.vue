<template>
  <div>
    <h1>Posts Category</h1>
    <Transition name="app-fade" mode="out-in">
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
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>


<script setup>
  import useApi from '@/composables/useApi'
  import useStore from '@/composables/useStore'
  import useApiRequest from '@/composables/useApiRequest'
  import useRouteString from "@/composables/useRouteString";
  import {RouterLink} from "vue-router";
  import { onBeforeRouteUpdate } from 'vue-router';

  const api = useApi();

  const { valid, result } = useRouteString('categoryUrl');
  const [ request, getCategoryPosts ] = useApiRequest('posts.categoryPosts');

  const [ authStore, sampleStore ] = useStore('auth', 'sample');

  const categoryId = sampleStore.getCategoryIdByUrl(result.value);

  await getCategoryPosts(categoryId);
  onBeforeRouteUpdate(async (to, from, next) => {
    const categoryIdUP = sampleStore.getCategoryIdByUrl(to.params.categoryUrl);
    await getCategoryPosts(categoryIdUP);
    next();
  });
</script>