<template>
  <form>
    <h2>Personal Post Edit</h2>
    <div>
      <label for="name">Url:</label>
      <div>{{ errors.url }}</div>
      <input v-model="dataForm.url" type="text" id="url" name="url" required minlength="2" placeholder="Введите ваше имя">
    </div>

    <div>
      <label for="title">Title:</label>
      <div>{{ errors.title }}</div>
      <input v-model="dataForm.title" type="text" id="title" name="title" required minlength="9" placeholder="Введите title">
    </div>

    <div>
      <label for="title">Content:</label>
      <div>{{ errors.contents }}</div>
      <input v-model="dataForm.contents" type="text" id="content" name="content" required minlength="9" placeholder="Введите content">
    </div>

    <button :disabled="pending" @click="send" type="button" class="btn">Edit</button>
    <div>{{ externalError }}</div>
  </form>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';

import useApi from '@/composables/useApi'
import useForm from '@/composables/useForm'
import useRouteInt from '@/composables/useRouteInt'
import usePageInfo from '@/composables/usePageInfo';

const { posts } = useApi();
const { valid, value } = useRouteInt('id');
const router = useRouter();

const { data } = await posts.one(value.value);

let id = data.id;

usePageInfo('Редактировать пост');

const  { dataForm, errors, pending, send, externalError } = useForm({
  fieldsForm: {
    url: data.url,
    title: data.title,
    contents: data.contents
  },
  apiFn: posts.update,
  onSuccess: post => {
    router.push({ name: 'blog.post', params: { id: post.id } })
  },
  dataTransform: dataForm => ({ ...dataForm, id })
});
</script>