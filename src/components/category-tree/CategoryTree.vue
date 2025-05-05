<template>
  <ul class="category-tree">
    <li v-for="category in treeData" :key="category.id" class="category-tree__item">
      <RouterLink
          :to="{ name: 'blog.category.posts', params: { categoryUrl: category.url} }"
          class="category-tree__link"
      >
        {{ category.name }}
      </RouterLink>
      <CategoryTree
          v-if="category.children && category.children.length"
          :treeData="category.children"
          class="category-tree__children"
      />
    </li>
  </ul>
</template>

<script>
import {RouterLink} from "vue-router";

export default {
  name: 'CategoryTree',
  components: {RouterLink},
  props: {
    treeData: {
      type: Array,
      required: true
    }
  }
}
</script>