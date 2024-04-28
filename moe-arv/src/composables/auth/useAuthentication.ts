import { http } from "@/service/http";
export const useAuthentication = () => {
    
    const login = (email:string, password:string) => {
        const params = {"user":{ email, password }}
        return http.post<any,any>('/users/login', params )
    }

    const register = (email:string, password:string, username:string) => {
        const params = {"user":{ email, password, username }}
        return http.post<any,any>('/users', params )
    }

    return {
        login,
        register
    }
}