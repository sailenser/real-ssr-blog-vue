<template>
  <div>Lk Home</div>
  <RouterLink to="/profile">Профиль</RouterLink>
  <RouterLink to="/posts">Посты</RouterLink>
  <div>
    <RouterView v-slot="{ Component, route }">
      <Transition name="app-fade" mode="out-in">
        <div v-if="Component" :key="route.fullPath">
          <component :is="Component"></component>
        </div>
      </Transition>
    </RouterView>
  </div>
</template>
<script setup>
  import usePageInfo from '@/composables/usePageInfo';
  usePageInfo('Личный кабинет');
</script>