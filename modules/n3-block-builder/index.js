
import { defineNuxtModule, addImportsDir, createResolver, addPlugin  } from '@nuxt/kit'
import path from "path";
import { defu } from 'defu'

export default defineNuxtModule({
  // Expose getOptions and getMeta for internal usage of Nuxt
  meta: {
    name: '@n3-block-builder',
    configKey: 'directusBuilder',
    compatibility: {
      nuxt: '^3.4.0'
    }
  },
  // Default configuration options for your module, can also be a function returning those
  defaults: {

  },
  hooks: {
    // Componentes
    // Called within app:resolve allowing to extend the directories that are scanned for auto-importable components
    "components:dirs"(dirs) {
        dirs.push({
            path: path.resolve(__dirname, "./src/components"), pathPrefix: false
        });
    },
    // Pages
    // Called after pages routes are resolved.
    "pages:extend"(pages) {
        // pages.push({
        //     name: 'My profile',
        //     path: '/my-profile',
        //     file: path.resolve(__dirname, "./src/pages/my-profile.vue"),
        // });
        // pages.push({
        //     name: 'Sign In',
        //     path: '/sign-in',
        //     file: path.resolve(__dirname, "./src/pages/sign-in.vue"),
        // });
        // pages.push({
        //     name: 'Sign up',
        //     path: '/sign-up',
        //     file: path.resolve(__dirname, "./src/pages/sign-up.vue"),
        // });
        // pages.push({
        //   name: 'Request password',
        //   path: '/request-password',
        //   file: path.resolve(__dirname, "./src/pages/request-password.vue"),
        // });
        // pages.push({
        //     name: 'Reset password',
        //     path: '/reset-password',
        //     file: path.resolve(__dirname, "./src/pages/reset-password.vue"),
        // });
        // pages.push({
        //     name: 'Thank you',
        //     path: '/sign-up-thanks',
        //     file: path.resolve(__dirname, "./src/pages/sign-up-thanks.vue"),
        // });
        // pages.push({
        //     name: 'Access denied',
        //     path: '/access-denied',
        //     file: path.resolve(__dirname, "./src/pages/access-denied.vue"),
        // });
        // pages.push({
        //     name: 'Auth status',
        //     path: '/auth-status',
        //     file: path.resolve(__dirname, "./src/pages/auth-status.vue"),
        // });
    },
  },
  async setup(moduleOptions, nuxt) {

    // Access the public runtime configuration
    const publicRuntimeConfig = nuxt.options.runtimeConfig.public
    if(publicRuntimeConfig?.api.baseURL){
      moduleOptions.DIRECTUS_AUTHENTICATION_URL = publicRuntimeConfig.api.baseURL
    }

    // Agregar opciones de módulo a las opciones de tiempo de ejecución
    nuxt.options.runtimeConfig.public.directusAuth = defu(publicRuntimeConfig.directusAuth, moduleOptions)

    // Auto import de todos los composables
    // Mantener acceso a una función que tenga nombre de archivo
    const resolver = createResolver(import.meta.url)
    const resolved_path = resolver.resolve('src/composables')
    addImportsDir(resolved_path)
  }
})
