<template>
    <BasicFormTemplate :on-submit="submit">
        <template #body>
            <div class="grid grid-cols-5 gap-8">
                <div class="flex flex-col gap-5 col-span-5 lg:col-span-4">
                    <div>
                        <BasicInput
                            block
                            v-model="title"
                            name="title"
                            label="title"
                            :error="errors.title"
                        />
                    </div>
                    <div>
                        <BasicInput
                            block
                            v-model="description"
                            name="description"
                            label="description"
                            :error="errors.description"
                        />
                    </div>
                    <div>
                        <BasicTextarea
                            block
                            v-model="body"
                            name="body"
                            label="body"
                            :error="errors.body"
                        />
                    </div>
                </div>
                <div class="flex flex-col gap-5 col-span-5 lg:col-span-1">
                    <div>
                        <BasicInput
                            placeholder="New Tag"
                            block
                            v-model="newTag"
                            name="tag"
                            label="Tags"
                        >
                            <template #control="{ value }">
                                <button
                                    class="add-tag-btn"
                                    v-if="value"
                                    @click="addTag"
                                >
                                    Add
                                </button>
                            </template>
                        </BasicInput>
                    </div>
                    <div class="tags">
                        <div v-for="t in tags">
                            <BasicCheckbox
                                :label="t"
                                :name="t"
                                v-model="selectedTags[t]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #bottom>
            <BasicButton :loading="props.loading" :block="false"
                >Submit</BasicButton
            >
        </template>
    </BasicFormTemplate>
</template>
<script setup lang="ts">
import BasicFormTemplate from '@/components/common/template/BasicFormTemplate.vue'
import { required } from '@/utils/validations/validations.util'
import { useForm, useField } from 'vee-validate'
import BasicInput from '@/components/common/input/BasicInput.vue'
import BasicTextarea from '@/components/common/input/BasicTextarea.vue'
import { useArticlesList } from '@/composables/articles/useArticlesList'
import { reactive, ref } from 'vue'
import BasicCheckbox from '@/components/common/input/BasicCheckbox.vue'
import {
    Article,
    PostArticleParams
} from '@/composables/articles/articles.type'
import BasicButton from '@/components/common/input/BasicButton.vue'
//state
const props = defineProps<{
    onSubmit: Function
    loading: boolean | undefined
    editable?: Article
}>()
const validationSchema = {
    title: (value: string) => {
        const req = required(value, 'Title')
        if (req !== true) return req
        return true
    },
    description: (value: string) => {
        const req = required(value, 'Description')
        if (req !== true) return req
        return true
    },
    body: (value: string) => {
        const req = required(value, 'Body')
        if (req !== true) return req
        return true
    }
}

const { errors, handleSubmit } = useForm({
    validationSchema
})

const { value: title } = useField<string>('title')
const { value: description } = useField<string>('description')
const { value: body } = useField<string>('body')
const newTag = ref()
const tags = ref<string[]>([])

const selectedTags = reactive<{ [key: string]: boolean }>({})

const { fetchAllTags } = useArticlesList()

//action
if (props.editable) {
    title.value = props.editable.title
    description.value = props.editable.description
    body.value = props.editable.body
    if (props.editable.tagList && props.editable.tagList.length) {
        props.editable.tagList.forEach((t) => {
            selectedTags[t] = true
        })
    }
}

const addTag = () => {
    if (!tags.value.includes(newTag.value)) {
        tags.value = [...tags.value, newTag.value]
        selectedTags[newTag.value] = true
        newTag.value = ''
    }
}

const submit = handleSubmit(() => props.onSubmit(prepareParams()))
const getAllTags = async () => {
    try {
        const { data } = await fetchAllTags()
        tags.value = data.tags
    } catch (error) {}
}

const prepareParams = (): PostArticleParams => {
    let tagsSelected: string[] = []
    Object.keys(selectedTags).forEach((t) => {
        if (selectedTags[t]) {
            tagsSelected.push(t)
        }
    })
    const params: PostArticleParams = {
        article: {
            title: title.value,
            description: description.value,
            body: body.value,
            tagList: tagsSelected
        }
    }

    return params
}

getAllTags()
</script>
<style scoped>
.tags {
    @apply rounded border border-[#dddddd] p-5;
}
.add-tag-btn {
    @apply bg-water-blue text-white text-center p-1 h-full px-2 inline-block py-2;
}
</style>
