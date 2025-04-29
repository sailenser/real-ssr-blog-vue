<template>
  <ul class="comments-tree">
    <li
        v-for="comment in treeData"
        :key="comment.id"
        class="comments-tree__item"
    >
      <div class="comments-tree__box">
        <p class="comments-tree__name">{{ comment.user.name }}</p>
        <p class="comments-tree__content">{{ comment.content }}</p>
      </div>
      <CommentTree
        v-if="comment.children && comment.children.length"
        :treeData="comment.children"
        class="comments-tree__children"
      />
    </li>
  </ul>
</template>

<script setup>
  const props = defineProps({
    treeData: {
      type: Array,
      required: true
    }
  });
</script>

<style scoped>
.comments-tree {
  list-style: none;
  padding-left: 0;
}

.comments-tree__item {
  margin-bottom: 8px;
}

.comments-tree__link {
  font-weight: 600;
  color: #343434;
  font-family: 'Raleway', sans-serif;
}

.comments-tree__link:hover {
  color: #24e29b;
}

.comments-tree__box {
  display: flex;
  flex-direction: column;
}

.comments-tree__name {
  margin-right: 5px;
}

.comments-tree__children {
  padding-left: 20px;
  margin-top: 8px;
  border-left: 2px solid #eee;
}

.comments-tree__item {
  text-decoration: none;
  color: #333;
  transition: color 0.2s;
}
</style>