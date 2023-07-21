<template>
  <q-form
  @submit="onSubmit"
  @reset="onReset"
  class="q-gutter-md"
  v-if="rules"
  >
  <!-- <pre>{{ apidata }}</pre> -->
  <div class="flex flex-row gap-3">

      <div class="grow">
        <div class="font-sans font-medium text-lg">{{ core_labels.first_name_label }}</div>

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
      </div>
      <div class="grow">
        <div class="font-sans font-medium text-lg">{{ core_labels.last_name_label }}</div>
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
  </div>


  <!-- <div class="font-sans font-medium text-lg">Nombre empresa</div>
        <q-input
        class="col"
        outlined
        v-model.trim="nombre_empresa"
        label="Nombre empresa"
        hint="Ingresa el nombre de fantasía"
        counter
        lazy-rules
        :rules="[
        rules(nombre_empresa, 'required'),
        rules(nombre_empresa, 'not_empty'),
        ]"
  />

  <div class="font-sans font-medium text-lg">Principal problema</div>
        <q-input
        class="col"
        outlined
        v-model.trim="principal_problema"
        label="Principal problema"
        hint="Cuéntanos el principal problema o desafío de interés para tu empresa"
        type="textarea"
        counter
        lazy-rules
        :rules="[
        rules(principal_problema, 'required'),
        rules(principal_problema, 'not_empty'),
        ]"
  />
  <div class="font-sans font-medium text-lg">Facturación anual</div>
  <q-select
  filled
  label="Facturación anual"
  hint="Selecciona tu facturación anual"
  v-model="facturacion_anual"
  use-input
  :rules="[
    rules(principal_problema, 'required'),
    rules(principal_problema, 'not_empty'),
  ]"
  input-debounce="0"
  option-value="id"
  option-label="nombre"
  :options="[
    {
        id: 'sin-ventas',
        nombre: 'Sin ventas',
    },
    {
        id: 'micro',
        nombre: 'Micro: 0 a 2399 Uf de venta al año',
    },
    {
        id: 'pequena',
        nombre: 'Pequeña: 2400 a 24999 Uf de venta al año',
    },
    {
        id: 'mediana',
        nombre: 'Mediana: 25.000 a 99.999 Uf de venta al año',
    },
    {
        id: 'grande',
        nombre: 'Grande: +100 Uf de venta al año',
    },
  ]"
  :style="{
      width: '100%'
  }"
  /> -->




  <div class="grow">
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
  </div>

  <div class="grow">
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
  </div>                
  
  <div class="flex items-center">
      <nuxt-link to="/" class="font-bold text-uppercase tracking-widest text-slate-600">Volver</nuxt-link>
      <q-space></q-space>
      <q-btn unelevated :label="sign_up_labels.button_label" color="deep-orange" type="submit" outline class=" rounded-full text-capitalize font-sans"/>
  </div>
  </q-form>
</template>
<script setup>
import sanitizationRules from './../controllers/sanitization-rules.js'
import { useRuntimeConfig } from '#app'

const showTerms = ref(false)


const props = defineProps({
securityLvl: {
  type: String,
  default: 'weak',
},
})


const { register } = authApi()

const directusAuth = useRuntimeConfig().public.directusAuth
const { core_labels, sign_up_labels } = directusAuth

const { is_token_validated } = userStore()

const accept              = ref(false)
const rechazoMarketing    = ref(false)
const loading             = ref(true)
const first_name          = ref(null)
const last_name           = ref(null)
const email               = ref(null)
const password            = ref(null)
const rules               = ref(null)

const nombre_empresa      = ref(null)
const principal_problema  = ref(null)
const facturacion_anual   = ref(null)

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

const emit = defineEmits([
  'signUpSuccess',
  'signUpSuccessData',
]) 

const onSubmit = async () => {
const res = await register({
  email:    email.value,
  password: password.value,
  first_name: first_name.value,
  last_name: last_name.value,
  // nombre_empresa: nombre_empresa.value,
  // principal_problema: principal_problema.value,
  // facturacion_anual: facturacion_anual.value.id,
})

if(res?.data){
  emit('signUpSuccess', {
    email:    email.value,
    password: password.value,
    first_name: first_name.value,
    last_name: last_name.value,
    // nombre_empresa: nombre_empresa.value,
    // principal_problema: principal_problema.value,
    // facturacion_anual: facturacion_anual.value.id,
  })
  emit('signUpSuccessData', res.data)
}

await navigateTo('/')

return res
}

const onReset = async () => {
return await true
}



loading.value = false
      


</script>
<style lang="">
  
</style>