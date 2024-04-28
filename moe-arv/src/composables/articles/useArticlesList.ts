import { http } from "@/service/http";
export const useArticlesList = () => {
    const fetchList = () => {
        return http.get('/articles')
    }

    const fetchByAuthorList = (author:string) => {
        return http.get('/articles', {
            params:{
                author
            }
        })
    }
}