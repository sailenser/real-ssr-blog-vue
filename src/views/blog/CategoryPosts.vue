<template>
  <div class="page-blog">
    <h1 class="page-blog__head">{{titlePage}}</h1>
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
                class="page-post__btn page-post__btn--delete"
            >Удалить</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {RouterLink} from "vue-router";
  import useApi from '@/composables/useApi'
  import useStore from '@/composables/useStore'
  import useApiRequest from '@/composables/useApiRequest'
  import useRouteString from "@/composables/useRouteString";
  import { onBeforeRouteUpdate } from 'vue-router';
  import usePageInfo from '@/composables/usePageInfo';
  import {ref} from "vue";

  const [ authStore, sampleStore ] = useStore('auth', 'sample');

  const api = useApi();

  // Общая функция для загрузки
  const loadPosts = async (urlParam) => {
    const categoryId = sampleStore.getCategoryIdByUrl(urlParam);
    await getCategoryPosts(categoryId);
  };
  const { valid, result } = useRouteString('categoryUrl');
  const [ request, getCategoryPosts ] = useApiRequest('posts.categoryPosts');

  const titlePage = ref(sampleStore.getCategoryNameByUrl(result.value));

  usePageInfo(titlePage);

  function removePost(id) {
    api.posts.remove(id);
    document.location = '/blog';
  }

  // Первоначальная загрузка
  await loadPosts(result.value);

  // При смене категории
  onBeforeRouteUpdate(async (to, from, next) => {
    usePageInfo(sampleStore.getCategoryNameByUrl(to.params.categoryUrl));
    await loadPosts(to.params.categoryUrl);
    next();
  });
</script>