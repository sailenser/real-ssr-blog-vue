export function getByDottedKey<T = unknown>(obj: Record<string, any>, key: string): T {
    return key.split('.').reduce((res, localKey) => {
        if (res === undefined || res === null || !(localKey in res)) {
            throw new Error('wrong dotted key');
        }
        return res[localKey];
    }, obj) as T;
}