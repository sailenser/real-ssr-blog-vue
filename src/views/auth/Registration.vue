<template>
  <div>
    <form>
      <h2>Регистрация</h2>
      <div>
        <label for="name">Имя:</label>
        <div>{{ errors.name }}</div>
        <input v-model="dataForm.name" type="text" id="name" name="name" required minlength="2" placeholder="Введите ваше имя">
      </div>

      <div>
        <label for="email">Email:</label>
        <div>{{ errors.email }}</div>
        <input v-model="dataForm.email" type="email" id="email" name="email" required placeholder="Введите ваш email">
      </div>

      <div>
        <label for="password">Пароль:</label>
        <div>{{ errors.password }}</div>
        <input v-model="dataForm.password" type="password" id="password" name="password" required minlength="9" placeholder="Введите пароль">
      </div>

      <div>
        <label for="password_confirmation">Подтвердите пароль:</label>
        <div>{{ errors.password_confirmation }}</div>
        <input v-model="dataForm.password_confirmation" type="password" id="password_confirmation" name="password_confirmation" required placeholder="Подтвердите пароль">
      </div>

      <button @click="send" :disabled="pending" type="button" class="btn">Зарегистрироваться</button>
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