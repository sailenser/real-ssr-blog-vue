<template>
  <main class="page-content page-content--column">
    <div class="page-content__wrapper">
      <div class="page-aside page-content__aside">
        <CategoryTree :treeData="categoryTree" />
      </div>
      <div class="page-content__stage">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup>
import CategoryTree from '@/components/category-tree/CategoryTree.vue'
import useStore from "@/composables/useStore.ts";
import useBuildTree from "@/composables/useBuildTree.ts";

defineOptions({
  name: 'ColumnLayout',
});

const [ sampleStore ] = useStore('sample');

const categoryTree = useBuildTree(sampleStore.category)
</script>