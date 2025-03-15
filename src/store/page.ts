import {defineStore} from "pinia";
import { ref } from 'vue';
import type { Ref } from 'vue';

interface PageState {
    status: Ref<number>;
    title: Ref<string>;
}

export default function createPageStore() {
    return defineStore('page', {
        state: ():PageState => ({
            status: ref(200),
            title: ref('')
        }),
        actions: {
            async setInfo(newTitle:string, newStatus:number = 200): Promise<void> {
                this.title = newTitle;
                this.status = newStatus;

                if(!import.meta.env.SSR){
                    document.title = this.title;
                }
            }
        }
    });
}