import { http } from "@/service/http";
import { PostArticleParams } from "./articles.type";
export const useArticle = () => {
    
    const createArticle = (params:PostArticleParams) => {
        return http.post('/articles', params)
    }

    return {
        createArticle
    }
}