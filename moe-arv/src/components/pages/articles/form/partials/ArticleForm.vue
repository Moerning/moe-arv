<template>
    <BasicFormTemplate :on-submit="submit">
        <div>
            <BasicInput v-model="title" name="title" label="title" :error="errors.title"/>
        </div>
        <div>
            <BasicInput v-model="description" name="description" label="description" :error="errors.description"/>
        </div>
        <div>
            <BasicTextarea v-model="body" name="body" label="body" :error="errors.body"/>
        </div>
    </BasicFormTemplate>
</template>
<script setup lang="ts">
import BasicFormTemplate from "@/components/common/template/BasicFormTemplate.vue";
import { required } from "@/utils/validations/validations.util";
import { useForm, useField } from 'vee-validate';
import BasicInput from "@/components/common/input/BasicInput.vue";
import BasicTextarea from "@/components/common/input/BasicTextarea.vue";
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


const submit = handleSubmit(() => { })

</script>