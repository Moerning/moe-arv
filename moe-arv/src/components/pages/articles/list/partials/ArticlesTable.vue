<template>
    <BasicTableTemplate
        block
        :headers="headers"
        :values="currentList"
        v-if="currentList"
    >
        <template #author="{ row }">
            {{ getAuthor(row) }}
        </template>
        <template #excerpt="{ row }">
            {{ getExerpt(row) }}
        </template>
        <template #tags="{ row }">
            <div class="w-[110px] flex flex-wrap gap-1">
                <DefaultTag v-for="t in row.tagList" :title="t" />
            </div>
        </template>
        <template #created="{ row }">
            <div class="flex items-center">
                <!-- <span>
                    {{ row.createdAt }}
                </span> -->
                <span>
                    <Menu>
                        <MenuButton>
                            <div class="controls">
                                <button class="w-[36px]">...</button>
                                <button class="w-[31px]">
                                    <material-icon name="arrow_drop_down" />
                                </button>
                            </div>
                        </MenuButton>
                        <MenuItems as="section">
                            <div class="relative">
                                <div class="article-controls">
                                    <MenuItem>
                                        <router-link
                                            :to="{
                                                name: 'EditArticle',
                                                params: { slug: row.slug }
                                            }"
                                        >
                                            <button class="default-menu-btn">
                                                Edit
                                            </button>
                                        </router-link>
                                    </MenuItem>
                                    <MenuItem>
                                        <button
                                            @click="initDelete(row)"
                                            class="default-menu-btn"
                                        >
                                            Delete
                                        </button>
                                    </MenuItem>
                                </div>
                            </div>
                        </MenuItems>
                    </Menu>
                </span>
            </div>
        </template>
    </BasicTableTemplate>
    <BasicDialog title="Delete Article" ref="deleteConfirm">
        <div class="p-4 flex flex-col gap-8">
            <p class="text-2xl">Are you sure you want to delete ?</p>
            <div class="grid grid-cols-2 gap-4">
                <BasicButton theme="danger" @click="doDeleteArticle"
                    >Yes, delete</BasicButton
                >
                <BasicButton theme="white" @click="toggleDialog"
                    >Cancel</BasicButton
                >
            </div>
        </div>
    </BasicDialog>
</template>
<script lang="ts" setup>
import { useArticlesList } from '@/composables/articles/useArticlesList'
import { ref } from 'vue'
import BasicTableTemplate from '@/components/common/template/BasicTableTemplate.vue'
import { TableHeader } from '@/components/types/types.type'
import { Article } from '@/composables/articles/articles.type'
import DefaultTag from '@/components/common/DefaultTag.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import BasicDialog from '@/components/common/template/BasicDialog.vue'
import BasicButton from '@/components/common/input/BasicButton.vue'
import { useArticle } from '@/composables/articles/useArticle'
import { useToasMessage } from '@/composables/toast/useToastMessage'

const { showSuccessToast } = useToasMessage()
const { fetchList } = useArticlesList()
const { deleteArticle } = useArticle()

const currentList = ref<Article[]>()
const deleteConfirm = ref()
const deletableArticle = ref<Article>()

const headers: TableHeader[] = [
    { title: 'title', key: 'title', align: 'left' },
    { title: 'author', key: 'author', align: 'left' },
    { title: 'tags', key: 'tags', align: 'left' },
    { title: 'excerpt', key: 'excerpt', align: 'center' },
    { title: 'created', key: 'created', align: 'left' }
]

//actions
const getList = async () => {
    try {
        const { data } = await fetchList()
        currentList.value = data.articles
    } catch (error) {}
}

const getAuthor = (art: Article) => art.author.username

const getExerpt = (art: Article) => {
    function regFirstWords(s: string, n: number) {
        var a = s.match(
            new RegExp('[\\w\\.]+' + '(?:[\\s-]*[\\w\\.]+){0,' + (n - 1) + '}')
        )
        return a === undefined || a === null ? '' : a[0]
    }
    return regFirstWords(art.body, 5)
}

const doDeleteArticle = async () => {
    try {
        await deleteArticle(deletableArticle.value?.slug!)
        showSuccessToast('Article Deleted Successfully!')
        toggleDialog()
        getList()
    } catch (error) {}
}

function initDelete(row: Article) {
    deletableArticle.value = row
    toggleDialog()
}

const toggleDialog = () => {
    deleteConfirm.value.toggleDialog()
}

getList()
</script>
<style>
.default-menu-btn {
    @apply bg-white hover:bg-silver;
    width: 175px;
    height: 43px;
}

.controls {
    @apply h-[40px] bg-dark-sky-blue rounded-md p-0 overflow-hidden;
}

.controls button {
    @apply bg-transparent text-white hover:bg-dark-sky-soft h-full pt-1;
}

.controls:nth-child(1) {
    @apply flex items-center;
}

.article-controls {
    @apply absolute right-0 bg-white flex flex-col divide-y border rounded overflow-hidden;
}
</style>
