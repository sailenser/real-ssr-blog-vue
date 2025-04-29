<template>
  <main class="page-content">
    <div class="page-content__wrapper">
      <slot />
    </div>
  </main>
</template>

<script setup>
defineOptions({
  name: 'DefaultLayout',
})
</script>