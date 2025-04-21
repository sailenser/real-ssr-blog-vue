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

  // Общая функция для загрузки
  const loadPosts = async (urlParam) => {
    const categoryId = sampleStore.getCategoryIdByUrl(urlParam);
    await getCategoryPosts(categoryId);
  };

  const { valid, result } = useRouteString('categoryUrl');
  const [ authStore, sampleStore ] = useStore('auth', 'sample');
  const [ request, getCategoryPosts ] = useApiRequest('posts.categoryPosts');

  // Первоначальная загрузка
  await loadPosts(result.value);

  // При смене категории
  onBeforeRouteUpdate(async (to, from, next) => {
    await loadPosts(to.params.categoryUrl);
    next();
  });
</script>