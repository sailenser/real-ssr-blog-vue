import {reactive} from "vue";

//Перед выводом в компонент обработать данные для построения деревовидной структуры
export default function useBuildTree(items:any[], parentId: number):object {
    const treeItem = reactive(items);
    treeItem
        .filter(item => item.parent_id === parentId)
        .map(item => ({
            ...item,
            children: useBuildTree(items, item.id)
        }));
    return { treeItem };
}