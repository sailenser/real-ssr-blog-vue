<template>
  <div v-if="commentReq.success">
    <pre>{{ commentReq.data }}</pre>
    <form>
      form for comment
    </form>
  </div>
</template>

<script setup>
  import useApiRequest from '@/composables/useApiRequest';

  const props = defineProps({
    id: { type: Number, required: true }
  });
  const [ commentReq, getComments ] = useApiRequest('comments.all');

  await getComments(props.id);
</script>