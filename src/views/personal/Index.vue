<template>
  <div class="page-blog">
    <h1 class="page-blog__head">Личный кабинет</h1>
    <div>
      <RouterView v-slot="{ Component, route }">
        <Transition name="app-fade" mode="out-in">
          <div v-if="Component" :key="route.fullPath">
            <component :is="Component"></component>
          </div>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
  import usePageInfo from '@/composables/usePageInfo';
  usePageInfo('Личный кабинет');
</script>