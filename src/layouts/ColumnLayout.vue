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

defineOptions({
  name: 'ColumnLayout',
});

const [ sampleStore ] = useStore('sample');

//Функция для построения дерева категорий
const buildTree = (items, parentId = null) => {
  return items
      .filter(item => item.parent_id === parentId)
      .map(item => ({
        ...item,
        children: buildTree(items, item.id)
      }));
};

const categoryTree = computed(() => buildTree(sampleStore.category));
</script>