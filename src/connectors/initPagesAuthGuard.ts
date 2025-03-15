import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

// TODO: разобраться с useAuthStore: any!
export default function initPagesAuthGuard(router: Router, useAuthStore: any): void {
    router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
        const onlyAuth = to.matched.some(r => r.meta.auth);
        const onlyGuest = to.matched.some(r => r.meta.guest);

        if(onlyAuth || onlyGuest){
            const authStore = useAuthStore();
            await authStore.ready;

            if(onlyAuth && !authStore.isAuth){
                next({ name: 'auth.login' });
            }
            else if(onlyGuest && authStore.isAuth){
                next({ name: 'office.profile' });
            }
            else {
                next();
            }
        }
        else{
            next();
        }
    });
}