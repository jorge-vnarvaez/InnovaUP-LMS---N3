<template>
  <q-form
  @submit="onSubmit"
  @reset="onReset"
  class="q-gutter-md"
  v-if="rules"
  ref="signInForm"
  @validation-success="onValidationSuccess"
  @validation-error="onValidationError"
  @validate="onValidate"
  >
  <!-- <pre>{{ apidata }}</pre> -->
  <div v-if="showErrorMessage" class="bg-red-100 font-sans border rounded p-5 border-red-500 text-red-500 font-semibold flex align-center">
    <Icon size="25px" class="mr-1" name="mdi:progress-close" />
    {{ errorMessage }}
  </div>


  <div class="font-sans font-medium text-lg">{{ core_labels.email_label }}</div>

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

  <div class="font-sans font-medium text-lg">{{ core_labels.password_label }}</div>
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

  
  
  <!-- {{ isFormValid }} -->
  
  
  <div class="flex items-center py-4">
      <!-- <nuxt-link to="/" class="font-bold text-uppercase tracking-widest text-slate-600">Volver</nuxt-link> -->
      <!-- <q-space></q-space> -->
      <!-- <q-btn unelevated :label="sign_in_labels.button_label" type="submit" :color="!isFormValid ? `grey-3` : `deep-orange-6`"/> -->
      <q-btn unelevated ouline color="deep-orange" class="rounded-full w-full font-sans text-capitalize font-medium" :label="sign_in_labels.button_label" type="submit"/>
  </div>

  <div class="flex gap-1 justify-between underline text-entel-azul text-[16px]">
    <!-- <div><nuxt-link class="font-semibold" :to="`${requestPasswordTo ? requestPasswordTo : '/request-password'}`">Olvidé mi clave</nuxt-link></div>
    <div><nuxt-link class="font-semibold" :to="`${signUpTo ? signUpTo : '/sign-up'}`">No tengo cuenta</nuxt-link></div> -->
    <!-- <div>¿Aún no tienes cuenta? <nuxt-link class="font-semibold" :to="`${signUpTo ? signUpTo : '/sign-up'}`">Regístrate</nuxt-link></div> -->
    <!-- <div>¿Olvidaste tu contraseña? <nuxt-link class="font-semibold" :to="`${requestPasswordTo ? requestPasswordTo : '/request-password'}`">Recuperar contraseña</nuxt-link></div> -->
  </div>


  </q-form>
</template>
<script setup>
import sanitizationRules from './../controllers/sanitization-rules.js'
import { useRuntimeConfig } from '#app'
import { ref, reactive, watch, } from 'vue'

  const signInForm = ref(null)
  const isFormValid = ref(false)
  const onValidationSuccess = () => {
    console.log('onValidationSuccess')
    isFormValid.value = true
  };

  const onValidationError = (ref) => {
    console.log('onValidationError','ref')
    isFormValid.value = false
  };

  const onValidate = (shouldFocus) => {
    console.log('onValidate', shouldFocus)
  }
  
  const showErrorMessage = ref(false)
  const errorMessage = ref(null)

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
      securityLvl: {
        type: String,
        default: 'weak',
      },
    })

  const { login } = authApi()

  const directusAuth = useRuntimeConfig().public.directusAuth
  const { core_labels, sign_in_labels } = directusAuth

  const { is_token_validated } = userStore()
  
  const loading   = ref(true)
  const email     = ref(null)
  const password  = ref(null)
  const rules     = ref(null)


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


  watch([email, password], ([newElement1, newElement2], [oldElement1, oldElement2]) => {

    if(newElement1 && newElement2){
      isFormValid.value = true
    } else {
      isFormValid.value = false
    }
    
  });

  rules.value = sanitizationRules.rules


  const emit = defineEmits([
    'signInSuccess',
    'signInSuccessData',
  ]) 

  const onSubmit = async () => {
    const res = await login({
      email:    email.value,
      password: password.value,
    }, props.preUrl)

    if(res?.data){
      // redirect home
      emit('signInSuccess', {
        email: email.value,
        password: password.value,
      })
      emit('signInSuccessData', res.data)
      await navigateTo('/')
    }

    if(res?.type == 'error' && res?.code == 401){
      // console.log('res', res)
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