import { ILogin, IRegister } from "@/types/auth.interface";
import {POST} from '@/services'
import { URLS } from "../urls";

export const login = async (data:ILogin) => {
    try {
        const response = await POST(URLS.auth.login, data)
        return response
    } catch (error) {
        throw error
    }
}

export const register = async (data:IRegister) => {
    try {
        const response = await POST(URLS.auth.register, data)
        return response
    } catch (error) {
        throw error
    }
}