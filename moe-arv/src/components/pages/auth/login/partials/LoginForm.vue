<template>
  <BasicFormTemplate :loading="loading" :on-submit="submit" title="LOGIN">
    <template #body>
      <div>
        <BasicInput type="text" v-model="email" name="email" label="email" :error="errors?.email" />
      </div>
      <div>
        <BasicInput type="password" v-model="password" name="password" label="password" :error="errors?.password" />
      </div>
    </template>
    <template #footer>
      <p class="dont-have-account">Don't have an account? <router-link :to="{ name:'RegisterView' }"><span>Register Now</span></router-link></p>
    </template>
  </BasicFormTemplate>
</template>
<script setup lang="ts">
import BasicInput from '@/components/common/input/BasicInput.vue';
import { useForm, useField } from 'vee-validate';
import { required } from '@/utils/validations/validations.util.ts';
import BasicFormTemplate from '@/components/common/template/BasicFormTemplate.vue';
import { useAuthentication } from "@/composables/auth/useAuthentication";
import { useRouter } from 'vue-router';
import { ref } from 'vue';
//state
const loading = ref()
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
const router = useRouter()

//actions
const submit = handleSubmit(async () => {
  loading.value = true
  try {
    const { data } = await login(email.value, password.value)
    setUserAuthentication(data.user)
    router.push({
      name:"ArticlesListView"
    })
  } catch (error) {
    
  } finally {
    loading.value = false
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