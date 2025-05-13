<template>
  <div class="page-blog">
    <h2 class="page-blog__head page-blog__head--lk">Создать пост</h2>
    <form>
      <div class="page-blog__wrap">
        <div class="page-blog__box">
          <label class="page-blog__label" for="name">Url:</label>
          <div class="page-blog__error">{{ errors.url }}</div>
          <input class="page-blog__input" v-model="dataForm.url" type="text" id="url" name="url" required minlength="2" placeholder="Введите ваше имя">
        </div>

        <div class="page-blog__box">
          <label class="page-blog__label" for="title">Title:</label>
          <div class="page-blog__error">{{ errors.title }}</div>
          <input class="page-blog__input" v-model="dataForm.title" type="text" id="title" name="title" required minlength="9" placeholder="Введите title">
        </div>

        <div class="page-blog__box">
          <label class="page-blog__label" for="title">Content:</label>
          <div class="page-blog__error">{{ errors.contents }}</div>
          <input class="page-blog__input" v-model="dataForm.contents" type="text" id="content" name="content" required minlength="9" placeholder="Введите content">
        </div>

        <div class="page-blog__box">
          <label class="page-blog__label" for="title">Description Post:</label>
          <div class="page-blog__error">{{ errors.description }}</div>
          <input class="page-blog__input" v-model="dataForm.description" type="text" id="description" name="content" required placeholder="Введите description">
        </div>

        <div class="page-blog__box">
          <label class="page-blog__label" for="category_id">Category:</label>
          <div class="page-blog__error">{{ errors.category_id }}</div>
          <select class="page-blog__input" v-model="dataForm.category_id">
            <option
                v-for="category in sampleStore.category"
                :value="category.id"
                :key="category.id"
            >{{category.name}}</option>
          </select>
        </div>
      </div>
      <button
          :disabled="pending"
          @click="send"
          type="button"
          title="create"
          aria-label="create"
          class="page-blog__btn page-blog__btn--lk"
      >
        Create
      </button>
      <div>{{ externalError }}</div>
    </form>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

import useApi from '@/composables/useApi'
import useForm from '@/composables/useForm'
import usePageInfo from '@/composables/usePageInfo';
import useStore from "@/composables/useStore";

const router = useRouter();
const [ sampleStore ] = useStore('sample');

usePageInfo('Создать Пост');

const  { dataForm, errors, pending, send, externalError } = useForm({
  fieldsForm: {
    url: '',
    title: '',
    contents: '',
    description: '',
    category_id: 1
  },
  apiFn: useApi().posts.create,
  onSuccess: post => {
    router.push({ name: 'blog.post', params: { id: post.data.id } })
  }
});
</script>