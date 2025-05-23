<template>
  <header class="page-header">
    <RouterLink class="page-header__logo" to="/">VueSsr</RouterLink>
    <nav class="header-navigation page-header__navigation">
      <button
          @click="toggleMenu"
          class="header-navigation__btn"
          type="button"
          title="toggleMenu"
          aria-label="toggleMenu"
      >
        <svg
            aria-hidden="true"
            class="header-navigation__ico"
            width="24"
            height="24"
        >
          <use xlink:href="#icon-bars" />
        </svg>
      </button>
      <Transition name="app-fade-menu">
        <ul
          ref="menuElement"
          v-show="isMenuShow"
          @click="handleMenuClick"
          class="header-navigation-list header-navigation__list"
      >
        <li v-show="isMenuShow" class="header-navigation-list__item">
          <RouterLink :to="{ name: 'home' }" class="header-navigation-list__link">Главная</RouterLink>
        </li>
        <li class="header-navigation-list__item">
          <RouterLink :to="{ name: 'about' }" class="header-navigation-list__link">Обо мне</RouterLink>
        </li>
        <li class="header-navigation-list__item">
          <RouterLink :to="{ name: 'blog.index' }" class="header-navigation-list__link">Блог</RouterLink>
        </li>
        <HeaderCategoryTree :treeData="categoryTree" />
        <template v-if="!authStore.isAuth">
          <li class="header-navigation-list__item">
            <RouterLink :to="{ name: 'auth.registration' }" class="header-navigation-list__link">Регистрация</RouterLink>
          </li>
          <li class="header-navigation-list__item">
            <RouterLink :to="{ name: 'auth.login' }" class="header-navigation-list__link">Вход</RouterLink>
          </li>
        </template>
        <template v-else>
          <li class="header-navigation-list__item">
            <RouterLink :to="{ name: 'personal.lk' }" class="header-navigation-list__link">Личный кабинет</RouterLink>
          </li>
          <li class="header-navigation-list__item header-navigation-list__item--hide">
            <RouterLink :to="{ name: 'personal.profile.index' }" class="header-navigation-list__link">
              Профиль
            </RouterLink>
          </li>
          <li class="header-navigation-list__item header-navigation-list__item--hide">
            <RouterLink :to="{ name: 'personal.posts.index'}" class="header-navigation-list__link">Управление постами</RouterLink>
          </li>
          <li class="header-navigation-list__item">
            <button
                class="header-navigation-list__link"
                @click="tryLogout"
                type="button"
                title="tryLogout"
                aria-label="tryLogout"
            >
              Выход
            </button>
          </li>
        </template>
      </ul>
      </Transition>
    </nav>
  </header>
  <component :is="layoutComponent">
    <RouterView v-slot="{ Component, route }">
      <Transition name="app-fade" mode="out-in">
        <div v-if="Component" :key="route.matched[0].name">
          <Suspense :key="route.matched[0].name">
            <component :is="Component"></component>
          </Suspense>
        </div>
      </Transition>
    </RouterView>
  </component>
  <footer class="page-footer">
    <p class="page-footer__copyright">© 2025. Все права защищены</p>
  </footer>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRoute } from 'vue-router';
import useStore from '@/composables/useStore';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ColumnLayout from '@/layouts/ColumnLayout.vue';
import PersonalLayout from '@/layouts/PersonalLayout.vue';
import useBuildTree from "@/composables/useBuildTree.js";
import HeaderCategoryTree from "@/components/category-tree/HeaderCategoryTree.vue";

const [ authStore, sampleStore ] = useStore('auth', 'sample');
function tryLogout(){
  localStorage.removeItem('AUTH_TOKEN');
  document.location = '/';
}

const isMenuShow = ref(false);
const menuElement = ref(null);

function toggleMenu(event){
  event.stopPropagation();
  isMenuShow.value = !isMenuShow.value;
}

const handleClickOutside = (event) => {
  if (!menuElement.value) return;

  if (menuElement.value && !menuElement.value.contains(event.target)) {
    isMenuShow.value = false;
  }
};

onMounted(() => {
  nextTick(() => {
    document.addEventListener('click', handleClickOutside)
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const handleMenuClick = (event) => {
  const target = event.target
  if (target.closest('a')) {
    isMenuShow.value = false
  }
}

const layouts = {
  default: DefaultLayout,
  column: ColumnLayout,
  personal: PersonalLayout,
}

const route = useRoute();

// Вычисляем текущий layout
const layoutComponent = computed(() => {
  const layout = route.meta.layout || 'default'
  return layouts[layout] || layouts.default
});

const categoryTree = useBuildTree(sampleStore.category)
</script>