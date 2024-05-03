<template>
    <BasicContainerTemplate title="New Article">
        <ArticleForm :onSubmit="doCreateArticle" :loading="loading" />
    </BasicContainerTemplate>
</template>
<script setup lang="ts">
import ArticleForm from './partials/ArticleForm.vue'
import BasicContainerTemplate from '@/components/common/template/BasicContainerTemplate.vue'
import { PostArticleParams } from '@/composables/articles/articles.type'
import { useArticle } from '@/composables/articles/useArticle'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToasMessage } from '@/composables/toast/useToastMessage'

const { showSuccessToast } = useToasMessage()
const router = useRouter()

const loading = ref()
const { createArticle } = useArticle()

const doCreateArticle = async (params: PostArticleParams) => {
    loading.value = true
    try {
        await createArticle(params)
        router.push({ name: 'ArticlesListView' })
        showSuccessToast('Article created!')
    } catch (error) {
    } finally {
        loading.value = false
    }
}
</script>
