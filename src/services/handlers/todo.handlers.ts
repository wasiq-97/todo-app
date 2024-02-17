import { ILogin, IRegister } from "@/types/auth.interface";
import {DELETE, GET, POST, PUT} from '@/services'
import { URLS } from "../urls";

export const createTodo = async (data:ILogin) => {
    try {
        const response = await POST(URLS.todo.create, data)
        return response
    } catch (error) {
        throw error
    }
}

export const updateTodo = async (id:number, data:any) => {
    try {
        const response = await PUT(URLS.todo.index + `/${id}`, data)
        return response
    } catch (error) {
        throw error
    }
}

export const findTodos = async (params:any, userId:number) => {
    let url = URLS.todo.user
    if(params)
        url = url + `/${userId}` + '?' +  new URLSearchParams(params).toString()

    try {
        const response = await GET(url)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteTodo = async (id:number) => {
    try {
        const response = await DELETE(URLS.todo.index + `/${id}`)
        return response
    } catch (error) {
        throw error
    }
}