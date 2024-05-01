<template>
    <BasicContainerTemplate title="New Article">
        <ArticleForm :onSubmit="doCreateArticle" :loading="loading" />
    </BasicContainerTemplate>
</template>
<script setup lang="ts">
import ArticleForm from './partials/ArticleForm.vue';
import BasicContainerTemplate from '@/components/common/template/BasicContainerTemplate.vue';
import { PostArticleParams } from '@/composables/articles/articles.type';
import { useArticle } from '@/composables/articles/useArticle';
import { ref } from 'vue';

const loading = ref()
const { createArticle } = useArticle()

const doCreateArticle = async (params:PostArticleParams) => {
    loading.value = true
    try {
        await createArticle(params)
    } catch (error) {
        
    } finally {
        loading.value = false
    }
}

</script>