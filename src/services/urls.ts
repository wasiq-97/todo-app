
const baseUrl = 'https://dummyjson.com'
export const URLS = {
    auth: {
        login: `${baseUrl}/auth/login`,
        register: `${baseUrl}/users/add`,
    },
    todo: {
        create: `${baseUrl}/todos/add`,
        index: `${baseUrl}/todos`,
        user:  `${baseUrl}/todos/user`,
    },
}