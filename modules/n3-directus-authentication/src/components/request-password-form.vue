<template>
    <div>
        <div v-if="success" class="bg-green-100 font-sans border rounded p-5 border-green-500 text-green-500 font-semibold flex align-center">
              <Icon size="25px" class="mr-1" name="mdi:check-circle-outline" />
              Hemos recibido tu solicitud exitosamente. En caso de estar debidamente registrado tu correo recibirá un mail con las instrucciones para recuperar tu contraseña.
        </div>
        <div v-else>
            <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
            v-if="rules"
            >
            <!-- <pre>{{ apidata }}</pre> -->
            <div v-if="showErrorMessage" class="bg-red-100 font-sans border rounded p-5 border-red-500 text-red-500 font-semibold flex align-center">
              <Icon size="25px" class="mr-1" name="mdi:progress-close" />
              {{ errorMessage }}
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
        
            <div class="flex items-center">
                <nuxt-link :to="signInTo ? signInTo : '/sign-in'" class="font-bold text-uppercase tracking-widest text-slate-600">Volver</nuxt-link>
                <q-space></q-space>
                <q-btn unelevated :label="request_password_labels.button_label" :loading="loading" type="submit" color="deep-orange-6"/>
            </div>
            </q-form>
        </div>
    </div>
</template>
<script setup>
import sanitizationRules from '../controllers/sanitization-rules.js'
import { useRuntimeConfig } from '#app'
import { ref, watch } from 'vue'
    
    const showErrorMessage = ref(false)
    const errorMessage = ref(null)

    const success  = ref(false)

    watch(() => showErrorMessage.value, (value) => {
      if(value){
        setTimeout(() => {
          showErrorMessage.value = false
        }, 3000)
      }
    })


      const props = defineProps({
        signUpTo: {
          type: String,
          default: null,
        },
        signInTo: {
          type: String,
          default: null,
        },
        resetPasswordTo: {
          type: String,
          default: null,
        },
        preUrl: {
          type: String,
          default: null,
        },
      })

    const { login, requestPassword } = authApi()

    const directusAuth = useRuntimeConfig().public.directusAuth
    const { core_labels, request_password_labels } = directusAuth

    const { is_token_validated } = userStore()
    
    const loading   = ref(true)
    const email     = ref(null)
    const password  = ref(null)
    const rules     = ref(null)

    rules.value = sanitizationRules.rules

   

    const onSubmit = async () => {

      loading.value = true

      const res = await requestPassword({
        email:    email.value,
        resetPasswordTo: props.resetPasswordTo,
      }, props.preUrl)

      if(res?.ok == true && res?.status == 204){
        success.value = true
      }

      if(res?.type == 'error'){
        errorMessage.value = res?.message
        showErrorMessage.value = true
      }


      
      return res
      
    }

    const onReset = async () => {
      return await true
    }

    loading.value = false

</script>
<style lang="">
    
</style>