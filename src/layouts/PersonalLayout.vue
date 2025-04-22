<template>
  <div>
    <h1>Personal Layout</h1>
    <div>Column Content Personal</div>
    <slot />
  </div>
</template>

<script setup>
defineOptions({
  name: 'PersonalLayout',
})
</script>