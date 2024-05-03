import { http } from "@/service/http";
import { Article, PostArticleParams } from "./articles.type";
export const useArticle = () => {
    
    const createArticle = (params:PostArticleParams) => {
        return http.post('/articles', params)
    }

    const updateArticle = (slug:string, params: PostArticleParams) => {
        return http.put(`/articles/${slug}`, params)
    }

    const deleteArticle = (slug:string) => {
        return http.delete(`/articles/${slug}`)
    }

    const fetchArticleBySlug = (slug:string) => {
        return http.get<any,{
            data:{
                article:Article
            }
        }>(`/articles/${slug}`)
    }

    return {
        createArticle,
        updateArticle,
        deleteArticle,
        fetchArticleBySlug
    }
}