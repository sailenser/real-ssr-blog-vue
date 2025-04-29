<template>
  <div class="page-blog">
    <RouterLink
        :to="{ name: 'blog.index'}"
        class="page-post__btn page-post__btn--back"
    >
      Назад
    </RouterLink>
    <div v-if="requestPost.success">
      <h1>{{ requestPost.data.title }}</h1>
      <div>{{ requestPost.data.url }}</div>
      <div>{{ requestPost.data.contents }}</div>
      <h2>Комментарии</h2>
      <CommentTree :treeData="commentsTree" />
    </div>
    <E404 v-else text="Post not found" />
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router';
  import useApi from '@/composables/useApi'
  import useApiRequest from '@/composables/useApiRequest'
  import useRouteInt from '@/composables/useRouteInt'
  import usePageInfo from '@/composables/usePageInfo';
  import E404 from '@/components/errors/E404.vue'
  import CommentTree from '@/components/comments/CommentTree.vue'
  import useBuildTree from "@/composables/useBuildTree.js";
  import { toRaw } from 'vue';

  const { valid, value } = useRouteInt('id');
  const api = useApi();
  const [ requestPost, getOnePost ] = useApiRequest('posts.one');

  await getOnePost(value.value);

  const [ requestComments, getComments ] = useApiRequest('comments.all');

  await getComments(value.value);

  const { comments } = toRaw(requestComments.value.data);
  const commentsTree = useBuildTree(comments)

  if(requestPost.value.success){
    usePageInfo(requestPost.value.data.title);
  }
</script>