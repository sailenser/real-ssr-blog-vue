<template>
  <main class="page-content page-content--column">
    <div class="page-content__wrapper">
      <div class="page-aside page-content__aside">
        <div>
          <RouterLink class="page-aside__link" to="/profile">Профиль</RouterLink>
        </div>
        <div>
          <RouterLink class="page-aside__link" to="/post">Управление постами</RouterLink>
        </div>
      </div>
      <slot />
    </div>
  </main>
</template>

<script setup>
defineOptions({
  name: 'PersonalLayout',
})
</script>