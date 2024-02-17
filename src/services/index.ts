import axios from "axios"

/*
    * Handler for handling the GET routes
    * @param {string} url - The URL to send the GET request to.
    * @returns {Promise<any>} - A Promise that resolves with the response data if the request is successful,
    *                          or rejects with an error if the request fails.
*/
export const GET = async (url:string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = (await axios.get(url)).data
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

/*
    * Handler for handling the POST routes
    * @param {string} url - The URL to send the POST request to.
    * @param {any} body - The type of data send to post requests.
    * @returns {Promise<any>} - A Promise that resolves with the response data if the request is successful,
    *                          or rejects with an error if the request fails.
*/

export const POST = async (url:string, data:any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(url, data)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

/*
    * Handler for handling the Patch routes
    * @param {string} url - The URL to send the PATCH request to.
    * @param {any} body - The type of data send to PATCH requests.
    * @returns {Promise<any>} - A Promise that resolves with the response data if the request is successful,
    *                          or rejects with an error if the request fails.
*/

export const PATCH = async (url:string, data:any) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(url, data)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

/*
    * Handler for handling the DELETE routes
    * @param {string} url - The URL to send the DELETE request to.
    * @param {any} body - The type of data send to DELETE requests.
    * @returns {Promise<any>} - A Promise that resolves with the response data if the request is successful,
    *                          or rejects with an error if the request fails.
*/

export const DELETE = async (url:string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.delete(url)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}