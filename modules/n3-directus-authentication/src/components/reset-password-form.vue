<template>
    <div>
        <div v-if="success" class="bg-green-100 font-sans border rounded p-5 border-green-500 text-green-500 font-semibold flex align-center">
              <Icon size="25px" class="mr-1" name="mdi:check-circle-outline" />
              Tu contraseña ha sido actualizada exitosamente. Serás redirigido a la página de inicio de sesión en unos segundos.
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
                type="password"
                v-model="password"
                :label="core_labels.password_label"
                :hint="core_labels.password_hint"
                counter
                lazy-rules
                :rules="[...passwordLevelValidation(securityLvl, password)]"
            />
        
            <div class="flex items-center">
                <nuxt-link :to="requestPasswordTo ? requestPasswordTo : '/request-password'" class="font-bold text-uppercase tracking-widest text-slate-600">Volver</nuxt-link>
                <q-space></q-space>
                <q-btn unelevated :label="reset_password_labels.button_label" type="submit" color="deep-orange-6"/>
            </div>
            </q-form>
        </div>
    </div>
</template>
<script setup>
import sanitizationRules from './../controllers/sanitization-rules.js'
import { useRuntimeConfig } from '#app'
import { ref, watch } from 'vue'

    import { useRoute } from 'vue-router'
    const route = useRoute()
    
    
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
        requestPasswordTo: {
          type: String,
          default: null,
        },
        preUrl: {
          type: String,
          default: null,
        },
        signInTo: {
          type: String,
          default: null,
        },
        securityLvl: {
          type: String,
          default: 'weak',
        },
      })

    const { login, requestPassword, resetPassword } = authApi()

    const directusAuth = useRuntimeConfig().public.directusAuth
    const { core_labels, reset_password_labels } = directusAuth

    const { is_token_validated } = userStore()
    
    const loading   = ref(true)
    const email     = ref(null)
    const password  = ref(null)
    const rules     = ref(null)

    rules.value = sanitizationRules.rules

    const passwordLevelValidation = (lvl, validatedData) => {
      switch (lvl) {
        // At least 1 character and no spaces
        case 'min':
          return [
            sanitizationRules.rules(validatedData, 'required'),
            sanitizationRules.rules(validatedData, 'space_characters_max_length', {space_characters_max_length:0}),
          ]
          break;
        // At least 4 characters and no spaces
        case 'weak':
          return [
            sanitizationRules.rules(validatedData, 'required'),
            sanitizationRules.rules(validatedData, 'space_characters_max_length', {space_characters_max_length:0}),
            sanitizationRules.rules(validatedData, 'characters_min_length', {characters_min_length: 4}),
          ]
          break;
        // At least 8 characters, 1 number, 1 uppercase, 1 special character and no spaces
        case 'strong':
          return [
            sanitizationRules.rules(validatedData, 'required'),
            sanitizationRules.rules(validatedData, 'space_characters_max_length', {space_characters_max_length:0}),
            sanitizationRules.rules(validatedData, 'characters_min_length', {characters_min_length: 8}),
            sanitizationRules.rules(validatedData, 'has_number_character'),
            sanitizationRules.rules(validatedData, 'has_uppercase_character'),
            sanitizationRules.rules(validatedData, 'has_special_character'),
          ]
          break;
      
        default:
          break;
      }
    }

    const onSubmit = async () => {
        const { token } = route.query

        if(!token){
          return false
        }

        const res = await resetPassword({
            password:    password.value,
            token: token,
        }, props.preUrl)
        
        // console.log('resetingpassowrd', params)

        if(res?.ok == true){
            success.value = true
            // timeout 1000 and redirect to login
            setTimeout(async() => {
                await navigateTo(props.signInTo ? props.signInTo : '/sign-in')
            }, 3000)

        }

        console.log(res)

        if(res?.type == 'error'){
            errorMessage.value = res?.message
            showErrorMessage.value = true
        }

        if(res?.status == 403){
            errorMessage.value = 'No tienes permisos para realizar esta acción. El token ha expirado.'
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