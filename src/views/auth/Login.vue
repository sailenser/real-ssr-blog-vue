<template>
  <div>
    <form>
      <h2>Вход</h2>
      <div>
        <label for="name">Имя:</label>
        <div>{{ errors.name }}</div>
        <input v-model="dataForm.name" type="text" id="name" name="name" required minlength="2" placeholder="Введите ваше имя">
      </div>

      <div>
        <label for="password">Пароль:</label>
        <div>{{ errors.password }}</div>
        <input v-model="dataForm.password" type="password" id="password" name="password" required minlength="9" placeholder="Введите пароль">
      </div>

      <button :disabled="pending" @click="send" type="button" class="btn">Вход</button>
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