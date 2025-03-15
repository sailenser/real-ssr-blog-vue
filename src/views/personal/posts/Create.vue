<template>
  <div>
    <form>
      <h2>Personal Post Create</h2>
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

      <div>
        <label for="category_id">Category:</label>
        <div>{{ errors.category_id }}</div>
        <input v-model="dataForm.category_id" type="text" id="category_id" name="content" required placeholder="Введите номер категории">
      </div>

      <button :disabled="pending" @click="send" type="button" class="btn">Create</button>
      <div>{{ externalError }}</div>
    </form>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

import useApi from '@/composables/useApi'
import useForm from '@/composables/useForm'
import usePageInfo from '@/composables/usePageInfo';

const router = useRouter();
usePageInfo('Создать Пост');

const  { dataForm, errors, pending, send, externalError } = useForm({
  fieldsForm: {
    url: '',
    title: '',
    contents: '',
    category_id: ''
  },
  apiFn: useApi().posts.store,
  onSuccess: post => {
    router.push({ name: 'blog.post', params: { id: post.data.id } })
  }
});
</script>