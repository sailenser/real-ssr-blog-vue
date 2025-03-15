<template>
  <header>
    <nav>
      <RouterLink to="/">Logo</RouterLink>
      <RouterLink to="/about">Обо мне</RouterLink>
      <RouterLink to="/blog">Блог</RouterLink>
      <template v-if="!authStore.isAuth">
        <RouterLink to="/registration">Регистрация</RouterLink>
        <RouterLink to="/login">Вход</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/lk">Личный кабинет</RouterLink>
        <button @click="tryLogout">Выход</button>
      </template>
    </nav>
  </header>
  <main>
    <RouterView v-slot="{ Component, route }">
      <Transition name="app-fade" mode="out-in">
        <div v-if="Component" :key="route.matched[0].name">
          <Suspense :key="route.matched[0].name">
            <component :is="Component"></component>
          </Suspense>
        </div>
      </Transition>
    </RouterView>
  </main>
  <footer>
    <p>© 2025. Все права защищены</p>
  </footer>
</template>
<script setup>
import useStore from '@/composables/useStore';

const [ authStore ] = useStore('auth', 'sample');

function tryLogout(){
  localStorage.removeItem('AUTH_TOKEN');
  document.location = '/';
}
</script>