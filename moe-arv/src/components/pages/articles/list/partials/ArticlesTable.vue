<template>
    <div>
        articles table
    </div>
    <BasicTableTemplate :headers="headers" :values="currentList" v-if="currentList">
        <template #author="{ row }">
            {{ getAuthor(row) }}
        </template>
        <template #excerpt="{ row }">
            {{ getExerpt(row) }}
        </template>
        <template #tags="{ row }">
            <DefaultTag v-for="t in row.tags" :title="t" />
        </template>
        <template #created="{  }">
            <div class="flex items-center">
                <!-- <span>
                    {{ row.createdAt }}
                </span> -->
                <span>
                    <Menu >
                        <MenuButton>...</MenuButton>
                        <MenuItems as="section">
                            <div class="relative">
                                <div class="absolute right-0 bg-white p-3">
                                    <MenuItem>
                                        <button class="default-menu-btn">Edit</button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button class="default-menu-btn">Delete</button>
                                    </MenuItem>
                                </div>
                            </div>
                        </MenuItems>
                    </Menu>
                </span>
            </div>
        </template>
    </BasicTableTemplate>
</template>
<script lang="ts" setup>
import { useArticlesList } from "@/composables/articles/useArticlesList";
import { ref } from "vue";
import BasicTableTemplate from "@/components/common/template/BasicTableTemplate.vue";
import { TableHeader } from "@/components/types/types.type";
import { Article } from "@/composables/articles/articles.type";
import DefaultTag from "@/components/common/DefaultTag.vue";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const { fetchList } = useArticlesList()

const currentList = ref<Article[]>()

const getList = async () => {
    try {
        const { data } = await fetchList()
        currentList.value = data.articles
    } catch (error) {

    }
}

const getAuthor = (art: Article) => art.author.username

const getExerpt = (art: Article) => {
    function regFirstWords(s:string, n:number) {
        var a = s.match(new RegExp('[\\w\\.]+' + '(?:[\\s-]*[\\w\\.]+){0,' + (n - 1) + '}')); 
        return  (a === undefined || a === null) ? '' : a[0];
    }
    return regFirstWords(art.body, 5)
}

const headers: TableHeader[] = [
    { title: "title", key: "title", align: 'left' },
    { title: "author", key: "author", align: 'left' },
    { title: "tags", key: "tags", align: 'right' },
    { title: "excerpt", key: "excerpt", align: 'center' },
    { title: "created", key: "created", align: 'left' },
]

getList()
</script>
<style>
.default-menu-btn{
    width: 175px;
    height: 43px;
}
</style>