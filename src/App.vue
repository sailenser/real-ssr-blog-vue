<template>
  <header class="page-header">
    <RouterLink class="page-header__logo" to="/">VueSsr</RouterLink>
    <nav class="header-navigation page-header__navigation">
      <RouterLink class="header-navigation__item" to="/about">Обо мне</RouterLink>
      <RouterLink class="header-navigation__item" to="/blog">Блог</RouterLink>
      <template v-if="!authStore.isAuth">
        <RouterLink class="header-navigation__item" to="/registration">Регистрация</RouterLink>
        <RouterLink class="header-navigation__item" to="/login">Вход</RouterLink>
      </template>
      <template v-else>
        <RouterLink class="header-navigation__item" to="/lk">Личный кабинет</RouterLink>
        <button class="header-navigation__item" @click="tryLogout">Выход</button>
      </template>
    </nav>
  </header>
  <main>
    <component :is="layoutComponent">
      <RouterView v-slot="{ Component, route }">
        <Transition name="app-fade" mode="out-in">
          <div v-if="Component" :key="route.matched[0].name">
            <Suspense :key="route.matched[0].name">
              <component :is="Component"></component>
            </Suspense>
          </div>
        </Transition>
      </RouterView>
    </component>
  </main>
  <footer>
    <p>© 2025. Все права защищены</p>
  </footer>
</template>
<script setup>
import useStore from '@/composables/useStore';

import {computed} from "vue";

const [ authStore ] = useStore('auth');

function tryLogout(){
  localStorage.removeItem('AUTH_TOKEN');
  document.location = '/';
}

import { useRoute } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ColumnLayout from '@/layouts/ColumnLayout.vue';
import PersonalLayout from '@/layouts/PersonalLayout.vue';

const layouts = {
  default: DefaultLayout,
  column: ColumnLayout,
  personal: PersonalLayout,
}

const route = useRoute();

// Вычисляем текущий layout
const layoutComponent = computed(() => {
  const layout = route.meta.layout || 'default'
  return layouts[layout] || layouts.default
})
</script>