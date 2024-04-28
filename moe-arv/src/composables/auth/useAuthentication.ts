import { http } from "@/service/http";
import { LoginResponse, RegisterResponse, UserAuthInfo } from "./auth.type";
import { reactive, toRefs } from "vue";
import { TOKEN_STORAGE } from "@/utils/constants/constants";

const authState = reactive<{
    user:UserAuthInfo | undefined
}>({
    user:undefined
})

export const useAuthentication = () => {
    
    const login = (email:string, password:string) => {
        const params = {"user":{ email, password }}
        return http.post<any, {
            data: LoginResponse
        }>('/users/login', params )
    }

    const register = (email:string, password:string, username:string) => {
        const params = {"user":{ email, password, username }}
        return http.post<any, {
            data: RegisterResponse
        }>('/users', params )
    }

    const setUserAuthentication = (info:UserAuthInfo) => {
        if(info.token)
            localStorage.setItem(TOKEN_STORAGE, info.token)
        authState.user = { ...info }
    }

    const getUserAuthentication = () => localStorage.getItem(TOKEN_STORAGE)

    const getUser = async () => {
        try {
            const { data } = await http.get<any,{
                data: LoginResponse
            }>('/user')
            authState.user = data.user
        } catch (error) {
            
        }
    }

    return {
        login,
        register,
        setUserAuthentication,
        getUserAuthentication,
        getUser,
        ...toRefs(authState)
    }
}