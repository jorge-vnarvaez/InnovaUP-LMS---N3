<template>
    <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md"
    v-if="rules"
    >
    <!-- <pre>{{ apidata }}</pre> -->
    <div class="flex flex-row gap-3">
        <q-input
            class="col"
            outlined
            v-model.trim="first_name"
            :label="core_labels.first_name_label"
            :hint="core_labels.first_name_hint"
            counter
            lazy-rules
            :rules="[
            rules(first_name, 'required'),
            rules(first_name, 'not_empty'),
            ]"
        />
        <q-input
            class="col"
            outlined
            v-model.trim="last_name"
            :label="core_labels.last_name_label"
            :hint="core_labels.last_name_hint"
            counter
            lazy-rules
            :rules="[
            rules(last_name, 'required'),
            rules(last_name, 'not_empty'),
            ]"
        />
    </div>
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
        <q-btn unelevated :label="sign_up_labels.button_label" type="submit" color="deep-orange-6"/>
    </div>
    </q-form>
  </template>
<script>
import sanitizationRules from './../controllers/sanitization-rules.js'
import { useRuntimeConfig } from '#app'

export default defineComponent({
  async setup() {

        const { register } = authApi()

        const directusAuth = useRuntimeConfig().public.directusAuth
        const { core_labels, sign_up_labels } = directusAuth

        const { is_token_validated } = userStore()
        
        const loading       = ref(true)
        const first_name    = ref(null)
        const last_name     = ref(null)
        const email         = ref(null)
        const password      = ref(null)
        const rules         = ref(null)

        rules.value = sanitizationRules.rules

        const onSubmit = async () => {
          const res = await register({
            email:    email.value,
            password: password.value,
            first_name: first_name.value,
            last_name: last_name.value,
          })
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
            first_name,
            last_name,
            rules,

            //
            core_labels,
            sign_up_labels,
            is_token_validated,
            // apidata,
            // hello,
        }


    }
})
</script>
<style lang="">
    
</style>