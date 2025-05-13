<template>
  <div class="page-blog">
    <h1 class="page-blog__head">Новости</h1>
    <div
        v-if="request.success"
        class="page-posts page-blog__posts"
    >
      <div
          v-for="post in request.data"
          :key="post.id"
          class="page-post page-posts__post"
      >
        <RouterLink :to="{ name: 'blog.post', params: { id: post.id } }" class="page-post__title">{{ post.title }}</RouterLink>
        <p class="page-post__date">{{ post.data }}</p>
        <p class="page-post__descript">{{ post.description }}</p>
        <div>
          <RouterLink
              :to="{ name: 'blog.post', params: { id: post.id } }"
              class="page-post__btn page-post__btn--more"
          >
            Подробнее
          </RouterLink>
          <template v-if="authStore.user?.id == post.user_id">
            <RouterLink
                :to="{ name: 'personal.posts.edit', params: { id: post.id } }"
                class="page-post__btn page-post__btn--edit"
            >
              Редактировать
            </RouterLink>
            <button
                @click="removePost(post.id)"
                type="button"
                title="delete"
                aria-label="delete"
                class="page-post__btn page-post__btn--delete"
            >Удалить</button>
          </template>
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
  import { inject } from "vue";

  const api = useApi();
  const [ request, getAllPosts ] = useApiRequest('posts.all');
  const [ authStore ] = useStore('auth');

  usePageInfo('Блог');
  await getAllPosts();

  async function removePost(id) {
    api.posts.remove(id);
    await getAllPosts();
    document.location = '/blog';
  }
</script>