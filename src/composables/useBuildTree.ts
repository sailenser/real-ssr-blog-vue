//Перед выводом в компонент обработать данные для построения деревовидной структуры
export default function useBuildTree(
    treeItems: any[],
    parentId: number | null = null
): any[] {
   return treeItems
        .filter(item => item.parent_id === parentId)
        .map(item => ({
            ...item,
            children: useBuildTree(treeItems, item.id),
        }));
}