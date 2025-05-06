<template>
  <ul class="header-navigation-sublist">
    <li
        v-for="category in treeData"
        :key="category.url"
        class="header-navigation-sublist__item">
      <RouterLink
          :to="{ name: 'blog.category.posts', params: { categoryUrl: category.url} }"
          class="header-navigation-sublist__link"
      >
        {{ category.name }}
      </RouterLink>
      <HeaderCategoryTree
          v-if="category.children && category.children.length"
          :treeData="category.children"
          class="header-navigation-sublist--children"
      />
    </li>
  </ul>
</template>

<script>
import {RouterLink} from "vue-router";

export default {
  name: 'HeaderCategoryTree',
  components: {RouterLink},
  props: {
    treeData: {
      type: Array,
      required: true
    }
  }
}
</script>