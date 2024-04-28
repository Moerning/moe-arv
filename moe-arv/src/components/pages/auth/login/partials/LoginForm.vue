<template>
  <BasicFormTemplate :on-submit="submit" title="LOGIN">
    <template #body>
      <div>
        <BasicInput type="text" v-model="email" name="email" label="email" :error="errors?.email" />
      </div>
      <div>
        <BasicInput type="password" v-model="password" name="password" label="password" :error="errors?.password" />
      </div>
    </template>
    <template #bottom>
      <p class="dont-have-account">Don't have an account? <span>Register Now</span></p>
    </template>
  </BasicFormTemplate>
</template>
<script setup lang="ts">
import BasicInput from '@/components/common/input/BasicInput.vue';
import { useForm, useField } from 'vee-validate';
import { required } from '@/utils/validations/validations.util.ts';
import BasicFormTemplate from '@/components/common/template/BasicFormTemplate.vue';
import { useAuthentication } from "@/composables/auth/useAuthentication";
import { useToasMessage } from '@/composables/toast/useToastMessage';
//state
const validationSchema = {
  email: (value: string) => {
    const req = required(value, "Email")
    if (req !== true) return req
    return true
  },
  password: (value: string) => {
    const req = required(value, "Password")
    if (req !== true) return req
    return true
  },
}

const { errors, handleSubmit } = useForm({
  validationSchema
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')

const { login, setUserAuthentication } = useAuthentication()

//actions
const submit = handleSubmit(async () => {
  try {
    const { data } = await login(email.value, password.value)
    setUserAuthentication(data.user)
    //moerning-x redirect to main page
  } catch (error) {
    let err = error as any
    let msg = '';
    if(err && err.response && err.response?.data && err.response?.data.errors) {
      let resp = err.response.data.errors as any
      for (let index = 0; index < Object.keys(resp).length; index++) {
        const element = Object.keys(resp)[index];
        msg = `${element} ${resp[element]}`
      }
    }
    const toast = useToasMessage()
    toast.showErrorToast(msg, "Error")
  }
})
</script>
<style scoped>
.dont-have-account{
  @apply text-charcoal-grey;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: normal;
  text-align: left;
  margin: 15px 11px 0 8px;
}

.dont-have-account span{
  @apply text-charcoal-grey font-bold;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: normal;
  text-align: left;
}

</style>