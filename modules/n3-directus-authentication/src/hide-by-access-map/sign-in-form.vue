<template>
    <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
    v-if="rules"
    >
    <!-- <pre>{{ apidata }}</pre> -->
    <q-input
        outlined
        v-model.trim="email"
        :label="core_labels.email_label"
        :hint="core_labels.email_hint"
        counter
        lazy-rules
        :rules="[
          rules(email, 'required'),
          rules(email, 'is_email_format'),
        ]"
    />

    <q-input
        outlined
        type="password"
        v-model="password"
        :label="core_labels.password_label"
        :hint="core_labels.password_hint"
        counter
        lazy-rules
        :rules="[
          rules(password, 'required'),
          rules(password, 'space_characters_max_length', {space_characters_max_length:0}),
          rules(password, 'characters_min_length', {characters_min_length: 8}),
          rules(password, 'has_number_character'),
          rules(password, 'has_uppercase_character'),
          rules(password, 'has_special_character'),
        ]"
    />                
    <div>
        <q-btn unelevated :label="sign_in_labels.button_label" type="submit" color="deep-orange-6"/>
    </div>
    </q-form>
  </template>
<script>
import sanitizationRules from './../controllers/sanitization-rules.js'
import { useRuntimeConfig } from '#app'

export default defineComponent({
  async setup() {

        const { login } = authApi()

        const directusAuth = useRuntimeConfig().public.directusAuth
        const { core_labels, sign_in_labels } = directusAuth

        const { is_token_validated } = userStore()
        
        const loading   = ref(true)
        const email     = ref(null)
        const password  = ref(null)
        const rules     = ref(null)

        rules.value = sanitizationRules.rules

        const onSubmit = async () => {
          const res = await login({
            email:    email.value,
            password: password.value,
          })

          if(res?.data){
            // redirect home
            await navigateTo('/')
          }
          
          return res
          
        }

        const onReset = async () => {
          return await true
        }

        

        loading.value = false
        return {
            // Methods
            onSubmit,
            onReset,
            
            // state
            loading,
            email,
            password,
            rules,

            //
            core_labels,
            sign_in_labels,
            is_token_validated,
            // apidata,
            // hello,
        }


    }
})
</script>
<style lang="">
    
</style>