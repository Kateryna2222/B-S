export const storage = {
    setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    },
    getItem: (key) => {
        const item = localStorage.getItem(key);

        if(item){
            return JSON.parse(item)
        }
    },
    removeItem: (key) => {
        const item = localStorage.getItem(key);

        if(item){
            localStorage.removeItem(key)
        }
    }
}
