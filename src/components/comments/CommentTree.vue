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