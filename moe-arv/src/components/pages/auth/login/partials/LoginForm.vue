<template>
    <form @submit="submit">
        <div class="flex flex-col gap-5">
            <div>
                <BasicInput type="text" v-model="email" name="email" label="email" :error="errors?.email"/>
            </div>
            <div>
                <BasicInput type="password" v-model="password" name="password" label="password" :error="errors?.password"/>
            </div>
        </div>
        <button type="submit">Submit</button>
    </form>
</template>
<script setup lang="ts">
import BasicInput from '@/components/common/input/BasicInput.vue';
import { useForm, useField } from 'vee-validate';
import { required } from '@/utils/validations/validations.util.ts';

const validationSchema = {
  email: (value:string) => {
    const req = required(value, "Email")
    if (req !== true) return req
    return true
  }, 
  password:  (value:string) => {
    const req = required(value, "Password")
    if (req !== true) return req
    return true
  }, 
}

const { errors, handleSubmit } = useForm({
  validationSchema
})

const submit = handleSubmit(()=>{})

const { value: email } = useField('email')
const { value: password } = useField('password')
</script>