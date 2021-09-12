/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

const printableSet = new Set(["boolean", "string", "number"]);

export function filter<T = any>(obj: T, text: string): any {
    if (Array.isArray(obj)) {
        const items = obj.map((item) => filter(item, text)).filter((x) => x !== undefined);
        if (!items.length) {
            return;
        }
        return items;
    }
    if (isPrintable(obj)) {
        if (!isMatched(obj as any, text)) {
            return;
        }
        return obj;
    }
    obj = { ...obj };
    for (const key in obj) {
        if (isMatched(key, text)) {
            continue;
        }
        const filtered = filter(obj[key], text);
        if (filtered === undefined) {
            delete obj[key];
        } else {
            obj[key] = filtered;
        }
    }

    if (isEmpty(obj)) {
        return;
    }
    return obj;
}

function isEmpty<T>(data: T) {
    if (isPrintable(data)) {
        return false;
    }
    if (!data) {
        return true;
    }
    for (const i in data) {
        if (data[i] !== undefined) {
            return false;
        }
    }
    return true;
}

function isPrintable<T>(value: T) {
    return printableSet.has(typeof value);
}

function isMatched(haystack: any, needle: string) {
    try {
        return new RegExp(needle, "i").test(haystack);
    } catch (err) {
        return false;
    }
}
