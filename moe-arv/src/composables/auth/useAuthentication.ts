import { http } from "@/service/http";
import { RegisterResponse } from "./auth.type";

const TOKEN_STORAGE = "arv_token"

export const useAuthentication = () => {
    
    const login = (email:string, password:string) => {
        const params = {"user":{ email, password }}
        return http.post<any,any>('/users/login', params )
    }

    const register = (email:string, password:string, username:string) => {
        const params = {"user":{ email, password, username }}
        return http.post<any, {
            data: RegisterResponse
        }>('/users', params )
    }

    const setUserAuthentication = (token:string) => {
        localStorage.setItem(TOKEN_STORAGE, token)
    }

    const getUserAuthentication = () => localStorage.getItem(TOKEN_STORAGE)

    return {
        login,
        register,
        setUserAuthentication,
        getUserAuthentication
    }
}