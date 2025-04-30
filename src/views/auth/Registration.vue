<template>
  <div>
    <form>
      <h1 class="page-blog__head">Регистрация</h1>
      <div class="page-blog__wrap">
        <div class="page-blog__box">
          <label class="page-blog__label" for="name">Имя:</label>
          <div class="page-blog__error">{{ errors.name }}</div>
          <input class="page-blog__input" v-model="dataForm.name" type="text" id="name" name="name" required minlength="2" placeholder="Введите ваше имя">
        </div>

        <div class="page-blog__box">
          <label class="page-blog__label" for="email">Email:</label>
          <div class="page-blog__error">{{ errors.email }}</div>
          <input class="page-blog__input" v-model="dataForm.email" type="email" id="email" name="email" required placeholder="Введите ваш email">
        </div>

        <div class="page-blog__box">
          <label class="page-blog__label" for="password">Пароль:</label>
          <div class="page-blog__error">{{ errors.password }}</div>
          <input class="page-blog__input" v-model="dataForm.password" type="password" id="password" name="password" required minlength="9" placeholder="Введите пароль">
        </div>

        <div class="page-blog__box">
          <label class="page-blog__label" for="password_confirmation">Подтвердите пароль:</label>
          <div class="page-blog__error">{{ errors.password_confirmation }}</div>
          <input class="page-blog__input" v-model="dataForm.password_confirmation" type="password" id="password_confirmation" name="password_confirmation" required placeholder="Подтвердите пароль">
        </div>
      </div>
      <button
          class="page-blog__btn page-blog__btn--login"
          @click="send"
          :disabled="pending"
          type="button"
      >
        Зарегистрироваться
      </button>
      <div>{{ externalError }}</div>
    </form>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import useForm from '@/composables/useForm';
import usePageInfo from '@/composables/usePageInfo';

const authStore = inject('store').auth();

usePageInfo('Регистрация');

const  { dataForm, errors, pending, send, externalError } = useForm({
  fieldsForm: {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  },
  apiFn: authStore.register,
  onSuccess: () => {
    alert('Вы успешно зарегистрировались!')
  }
});
</script>