import { defineStore } from "pinia";
import { ref } from 'vue';
import type { Ref } from 'vue';

import type { CategoryPost, CategoryPostsApi } from "../api/typesApi/typesPost.ts"
import type { ApiResponse } from "../api/typesApi/types.ts";

interface SampleState {
    category: Ref<CategoryPost[]>;
}

// TODO: это хранилище с глобальными данными в Pinia, такими как категории, теги и т.д.
export default function createSampleStore(postsApi: CategoryPostsApi) {
    return defineStore('sample', {
        state: ():SampleState => ({
            category: ref([]),
        }),
        actions: {
            async initData(): Promise<void> {
                const { data }: ApiResponse<CategoryPost[]> = await postsApi.category();
                this.category = data;
            }
        }
    });
}