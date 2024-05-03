<template>
    <BasicContainerTemplate title="Edit Article">
        <ArticleForm :editable="theArticle" v-if="theArticle" :onSubmit="doUpdateArticle" :loading="loading" />
    </BasicContainerTemplate>
</template>
<script setup lang="ts">
import ArticleForm from './partials/ArticleForm.vue';
import BasicContainerTemplate from '@/components/common/template/BasicContainerTemplate.vue';
import { Article, PostArticleParams } from '@/composables/articles/articles.type';
import { useArticle } from '@/composables/articles/useArticle';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToasMessage } from '@/composables/toast/useToastMessage';

const { showSuccessToast } = useToasMessage()
const route = useRoute()
const router = useRouter()
const loading = ref()
const { fetchArticleBySlug, updateArticle } = useArticle()

const theArticle = ref<Article>()

const getArticle = async () => {
    loading.value = true
    try {
        const { data } = await fetchArticleBySlug(route.params.slug as string)
        theArticle.value = data.article
    } catch (error) {
        
    } finally {
        loading.value = false
    }
}

const doUpdateArticle = async (params:PostArticleParams) => {
    loading.value = true
    try {
        await updateArticle(route.params.slug as string, params)
        router.push({ name:"ArticlesListView" })
        showSuccessToast("Article updated!")
    } catch (error) {
        
    } finally {
        loading.value = false
    }
}

getArticle()

</script>