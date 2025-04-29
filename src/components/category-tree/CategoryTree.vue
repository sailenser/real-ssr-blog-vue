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
          class="category-children"
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

<style scoped>
.category-tree {
  list-style: none;
  padding-left: 0;
}

.category-tree__item {
  margin-bottom: 8px;
}

.category-tree__link {
  font-weight: 600;
  color: #343434;
  font-family: 'Raleway', sans-serif;
}

.category-tree__link:hover {
  color: #24e29b;
}

.category-children {
  padding-left: 20px;
  margin-top: 8px;
  border-left: 2px solid #eee;
}

.category-link {
  text-decoration: none;
  color: #333;
  transition: color 0.2s;
}

.category-link:hover {
  color: #42b983;
}
</style>