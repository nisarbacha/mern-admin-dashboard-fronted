

export const localStorage = () => {

    return {
        getItem: (key: string): string | null => {
            return window.localStorage.getItem(key);
        },
        setItem: (key: string, value: string): void => {
            window.localStorage.setItem(key, value);
        },
        removeItem: (key: string): void => {
            window.localStorage.removeItem(key);
        },
    }
}