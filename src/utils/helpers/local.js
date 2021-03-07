export const TYPES = {
    CURRENCY: 'currency',
    VALUE: 'value',
}

export const setLocal = (key, value) => {
    return localStorage.setItem(key, value);
}

export const getLocal = (key) => {
    return localStorage.getItem(key);
}