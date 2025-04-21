<template>
  <header>
    <nav>
      <RouterLink to="/">Logo</RouterLink>
      <RouterLink to="/about">Обо мне</RouterLink>
      <RouterLink to="/blog">Блог</RouterLink>
      <template v-if="!authStore.isAuth">
        <RouterLink to="/registration">Регистрация</RouterLink>
        <RouterLink to="/login">Вход</RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/lk">Личный кабинет</RouterLink>
        <button @click="tryLogout">Выход</button>
      </template>
    </nav>
  </header>
  <main>
    <div>
      <pre>
        <CategoryTree :treeData="categoryTree" />
      </pre>
    </div>
    <RouterView v-slot="{ Component, route }">
      <Transition name="app-fade" mode="out-in">
        <div v-if="Component" :key="route.matched[0].name">
          <Suspense :key="route.matched[0].name">
            <component :is="Component"></component>
          </Suspense>
        </div>
      </Transition>
    </RouterView>
  </main>
  <footer>
    <p>© 2025. Все права защищены</p>
  </footer>
</template>
<script setup>
import useStore from '@/composables/useStore';
import CategoryTree from '@/components/category-tree/CategoryTree.vue'
import {computed} from "vue";

const [ authStore, sampleStore ] = useStore('auth', 'sample');

function tryLogout(){
  localStorage.removeItem('AUTH_TOKEN');
  document.location = '/';
}

//Функция для построения дерева категорий
const buildTree = (items, parentId = null) => {
  // console.log("items", items);

  return items
      .filter(item => item.parent_id === parentId)
      .map(item => ({
        ...item,
        children: buildTree(items, item.id)
      }));
};

const categoryTree = computed(() => buildTree(sampleStore.category));
</script>