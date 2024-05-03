import { http } from '@/service/http'
import { Article } from './articles.type'
export const useArticlesList = () => {
    const fetchList = () => {
        return http.get<
            any,
            {
                data: {
                    articles: Article[]
                    articlesCount: number
                }
                status: number
            }
        >('/articles')
    }

    const fetchByAuthorList = (author: string) => {
        return http.get('/articles', {
            params: {
                author
            }
        })
    }

    const fetchAllTags = () => {
        return http.get<
            any,
            {
                data: {
                    tags: string[]
                }
                status: number
            }
        >('/tags')
    }

    return {
        fetchByAuthorList,
        fetchAllTags,
        fetchList
    }
}
