import useStore from "./useStore";

export default function usePageInfo(title: string, status: number = 200): void {
    const [pageStore] = useStore('page');
    pageStore.setInfo(title, status);
}