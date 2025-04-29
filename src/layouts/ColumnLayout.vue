<template>
  <main class="page-content page-content--column">
    <div class="page-content__wrapper">
      <div class="page-aside page-content__aside">
        <CategoryTree :treeData="categoryTree" />
      </div>
      <slot />
    </div>
  </main>
</template>

<script setup>
import {computed} from "vue";
import CategoryTree from '@/components/category-tree/CategoryTree.vue'
import useStore from "@/composables/useStore.js";
import useBuildTree from "@/composables/useBuildTree.ts";

defineOptions({
  name: 'ColumnLayout',
});

const [ sampleStore ] = useStore('sample');
const { treeItem } = useBuildTree(sampleStore.category)
const categoryTree = computed(() => treeItem);
</script>