<template>
    <BasicFormTemplate :on-submit="submit">
        <template #body>
            <div class="grid grid-cols-5 gap-8">
                <div class="flex flex-col gap-5 col-span-4">
                    <div>
                        <BasicInput block v-model="title" name="title" label="title" :error="errors.title"/>
                    </div>
                    <div>
                        <BasicInput block v-model="description" name="description" label="description" :error="errors.description"/>
                    </div>
                    <div>
                        <BasicTextarea block v-model="body" name="body" label="body" :error="errors.body"/>
                    </div>
                </div>
                <div class="flex flex-col gap-5">
                    <div>
                        <BasicInput placeholder="New Tag" block v-model="newTag" name="tag" label="Tags" />
                    </div>
                    <div class="tags">
                        <div v-for="t in tags">
                            <BasicCheckbox :label="t" :name="t" v-model="selectedTags[t]" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </BasicFormTemplate>
</template>
<script setup lang="ts">
import BasicFormTemplate from "@/components/common/template/BasicFormTemplate.vue";
import { required } from "@/utils/validations/validations.util";
import { useForm, useField } from 'vee-validate';
import BasicInput from "@/components/common/input/BasicInput.vue";
import BasicTextarea from "@/components/common/input/BasicTextarea.vue";
import { useArticlesList } from "@/composables/articles/useArticlesList";
import { reactive, ref } from "vue";
import BasicCheckbox from "@/components/common/input/BasicCheckbox.vue";
//state
const validationSchema = {
    title: (value: string) => {
        const req = required(value, "Title")
        if (req !== true) return req
        return true
    },
    description: (value: string) => {
        const req = required(value, "Description")
        if (req !== true) return req
        return true
    },
    body: (value: string) => {
        const req = required(value, "Body")
        if (req !== true) return req
        return true
    },
}

const { errors, handleSubmit } = useForm({
    validationSchema
})

const { value: title } = useField<string>('title')
const { value: description } = useField<string>('description')
const { value: body } = useField<string>('body')
const newTag = ref()
const tags = ref<string[]>()

const selectedTags = reactive<{ [key:string]: boolean }>({})

const { fetchAllTags } = useArticlesList()


//action
const submit = handleSubmit(() => { })
const getAllTags = async () => {
    try {
        const { data } = await fetchAllTags()
        tags.value = data.tags
    } catch (error) {
        
    }
}

getAllTags()

</script>
<style>
.tags{
    @apply rounded border border-[#dddddd] p-5
}
</style>