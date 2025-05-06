<template>
  <div>
    <form>
      <h1 class="page-blog__head">Вход</h1>
      <div class="page-blog__wrap">
        <div class="page-blog__box">
          <label class="page-blog__label" for="name">Имя:</label>
          <div class="page-blog__error">{{ errors.name }}</div>
          <input class="page-blog__input" v-model="dataForm.name" type="text" id="name" name="name" required minlength="2" placeholder="Введите ваше имя">
        </div>

        <div class="page-blog__box">
          <label class="page-blog__label" for="password">Пароль:</label>
          <div class="page-blog__error">{{ errors.password }}</div>
          <input class="page-blog__input" v-model="dataForm.password" type="password" id="password" name="password" required minlength="9" placeholder="Введите пароль">
        </div>
      </div>
      <button
          :disabled="pending"
          @click="send"
          type="button"
          title="login"
          aria-label="login"
          class="page-blog__btn page-blog__btn--register"
      >
        Вход
      </button>
      <div>{{ externalError }}</div>
    </form>
  </div>
</template>

<script setup>
import useApi from '@/composables/useApi';
import useForm from '@/composables/useForm';
import usePageInfo from '@/composables/usePageInfo';

usePageInfo('Логин');

const  { dataForm, errors, pending, send, externalError } = useForm({
  fieldsForm: {
    name: '',
    password: '',
  },
  apiFn: useApi().auth.login,
  onSuccess: res => {
    localStorage.setItem('AUTH_TOKEN', res.access_token);
    document.location = '/lk';
  }
});

</script>