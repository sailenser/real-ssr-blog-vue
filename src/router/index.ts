import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from "vue-router";

import HomePage from './../views/Home.vue';
import About from './../views/About.vue';
import Blog from './../views/blog/Index.vue';
import PostsShowPage from '@/views/blog/Post.vue';
import CategoryPosts from '@/views/blog/CategoryPosts.vue';

import Registration from '@/views/auth/Registration.vue';
import Login from '@/views/auth/Login.vue';

import Personal from '@/views/personal/Index.vue';
import PersonalProfilePage from '@/views/personal/Profile.vue';

import PersonalPostsBase from '@/views/personal/posts/Base.vue';
import PersonalPostsCreatePage from '@/views/personal/posts/Create.vue';
import PersonalPostsEditPage from '@/views/personal/posts/Edit.vue';
import PersonalPostsIndexPage from '@/views/personal/posts/Index.vue';

import E404 from './../components/errors/E404.vue'

const routes: Array<RouteRecordRaw> = [
    {
        name: 'home',
        path: '/',
        component: HomePage,
        meta: {
            layout: "default"
        },
    },
    {
        name: 'about',
        path: '/about',
        component: About,
        meta: {
            layout: "default"
        },
    },
    {
        name: 'blog.index',
        path: '/blog',
        component: Blog,
        meta: {
            layout: "column"
        },
    },
    {
        name: 'blog.post',
        path: '/blog/post/:id',
        component: PostsShowPage,
        meta: {
            layout: "column"
        },
    },
    {
        name: 'blog.category.posts',
        path: '/blog/:categoryUrl',
        component: CategoryPosts,
        meta: {
            layout: "column"
        },
    },
    {
        name: 'auth.registration',
        path: '/registration',
        meta: {
            guest: true,
            layout: "default"
        },
        component: Registration
    },
    {
        name: 'auth.login',
        path: '/login',
        meta: {
            guest: true,
            layout: "default"
        },
        component: Login
    },
    {
        name: 'personal.lk',
        path: '/lk',
        meta: {
            auth: true,
            layout: "column"
        },
        component: Personal,
        children: [
            {
                name: 'personal.profile',
                path: '/profile',
                component: PersonalProfilePage
            },
            {
                path: '/post',
                component: PersonalPostsBase,
                children: [
                    {
                        name: 'personal.posts.index',
                        path: '',
                        component: PersonalPostsIndexPage
                    },
                    {
                        name: 'personal.posts.create',
                        path: 'create',
                        component: PersonalPostsCreatePage
                    },
                    {
                        name: 'personal.posts.edit',
                        path: 'edit/:id',
                        component: PersonalPostsEditPage
                    }
                ]
            }
        ]
    },
    {
        path: "/:any(.*)",
        component: E404
    }
]

export default function createAppRouter(){
    const createEnvRouter = import.meta.env.SSR ? createMemoryHistory : createWebHistory;

    const router = createRouter({
        routes,
        history: createEnvRouter(import.meta.env.BASE_URL)
    })

    return router;
}