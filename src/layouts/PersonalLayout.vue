<template>
  <main class="page-content page-content--column">
    <div class="page-content__wrapper">
      <div class="page-aside page-content__aside">
        <div>
          <RouterLink
              :to="{ name: 'personal.profile.index' }"
              class="page-aside__link"
          >
            Профиль
          </RouterLink>
        </div>
        <div>
          <RouterLink
              :to="{ name: 'personal.posts.index'}"
              class="page-aside__link"
          >
            Управление постами
          </RouterLink>
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