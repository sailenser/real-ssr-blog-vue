<template>
    <div>
      <pre>
        <CategoryTree :treeData="categoryTree" />
      </pre>
    </div>
  <div>
    <slot />
  </div>
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