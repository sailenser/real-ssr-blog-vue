<template>
  <div class="page-blog">
    <h2 class="page-blog__head page-blog__head--lk">Страница профиля</h2>
    <div class="page-blog__info">
      <span class="page-blog__text">Логин:</span>
      <span class="page-blog__text">{{authStore.user?.name}}</span>
    </div>
    <div class="page-blog__info">
      <span class="page-blog__text">Права:</span>
      <span class="page-blog__text">{{authStore.user?.roles}}</span>
    </div>
    <div class="page-blog__info">
      <RouterLink
          :to="{ name: 'personal.profile.create'}"
          class="page-post__btn page-post__btn--more"
      >
        Создать
      </RouterLink>
      <RouterLink
          :to="{ name: 'personal.profile.edit', params: { id: authStore.user?.id }}"
          class="page-post__btn page-post__btn--edit"
      >
        Изменить
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
  import usePageInfo from '@/composables/usePageInfo';
  import useStore from "@/composables/useStore";
  import {RouterLink} from "vue-router";

  const [ authStore ] = useStore('auth');
  usePageInfo('Профиль');
</script>