<template>
  <div class="page-blog">
    <h2 class="page-blog__head page-blog__head--lk">Редактировать Пользователя</h2>
    <form>
      <div class="page-blog__wrap">
        <div class="page-blog__box">
          <label class="page-blog__label" for="name">Name:</label>
          <div class="page-blog__error">{{errors.name }}</div>
          <input
              class="page-blog__input"
              v-model="dataForm.name"
              type="text"
              id="name"
              name="name"
              required
              minlength="2"
              placeholder="Введите ваше имя"
          >
        </div>
        <div class="page-blog__box">
          <label class="page-blog__label" for="email">Email:</label>
          <div class="page-blog__error">{{errors.email }}</div>
          <input
              class="page-blog__input"
              v-model="dataForm.email"
              type="email"
              id="email"
              name="email"
              required
              placeholder="Введите ваш email"
          >
        </div>
        <div class="page-blog__box">
          <label class="page-blog__label" for="email">Roles:</label>
          <div class="page-blog__error">{{errors.roles }}</div>
          <select class="page-blog__input" v-model="dataForm.roles">
            <option>admin</option>
            <option>user</option>
          </select>
        </div>
        <div class="page-blog__box">
          <label class="page-blog__label" for="password">Пароль:</label>
          <div class="page-blog__error">{{ errors.password }}</div>
          <input
              class="page-blog__input"
              v-model="dataForm.password"
              type="password"
              id="password"
              name="password"
              required
              minlength="9"
              placeholder="Введите пароль"
          >
        </div>

        <div class="page-blog__box">
          <label class="page-blog__label" for="password_confirmation">Подтвердите пароль:</label>
          <div class="page-blog__error">{{ errors.password_confirmation }}</div>
          <input
              class="page-blog__input"
              v-model="dataForm.password_confirmation"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              required
              placeholder="Подтвердите пароль"
          >
        </div>
        <button
            :disabled="pending"
            @click="send"
            type="button"
            title="edit"
            aria-label="edit"
            class="page-blog__btn page-blog__btn--lk"
        >
          Редактировать
        </button>
        <div>{{ externalError }}</div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from 'vue-router';
import usePageInfo from "@/composables/usePageInfo";
import useForm from "@/composables/useForm";
import useApi from "@/composables/useApi";
import useRouteInt from "@/composables/useRouteInt";

const router = useRouter();
const { users } = useApi();
const { valid, value } = useRouteInt('id');

const { data } = await users.one(value.value);
let id = data.id;

const authStore = inject('store').auth();

const  { dataForm, errors, pending, send, externalError } = useForm({
  fieldsForm: {
    id: data.id,
    name: data.name,
    roles: data.roles,
    email: data.email,
    password: '',
    password_confirmation: ''
  },
  apiFn: users.update,
  onSuccess: user => {
    authStore.setUser(user.data);
    router.push({ name: 'personal.profile.index' })
  },
  dataTransform: dataForm => ({ ...dataForm, id })
});

usePageInfo('Редактировать пользователя');
</script>