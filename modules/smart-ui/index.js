
import { defineNuxtModule, addImportsDir, createResolver, addPlugin  } from '@nuxt/kit'
import path from "path";
import { defu } from 'defu'

export default defineNuxtModule({
  // Expose getOptions and getMeta for internal usage of Nuxt
  meta: {
    name: '@smart-ui',
    configKey: 'smartui',
    compatibility: {
      nuxt: '^3.4.0'
    }
  },
  // Default configuration options for your module, can also be a function returning those
  defaults: {},
  hooks: {
    // Componentes
    // Called within app:resolve allowing to extend the directories that are scanned for auto-importable components
    "components:dirs"(dirs) {
        dirs.push({
            path: path.resolve(__dirname, "./src/components"), pathPrefix: false
        });
    },
  },
  async setup(moduleOptions, nuxt) {

    // Access the public runtime configuration
    const publicRuntimeConfig = nuxt.options.runtimeConfig.public

    // Agregar opciones de módulo a las opciones de tiempo de ejecución
    nuxt.options.runtimeConfig.public.smartui = defu(publicRuntimeConfig.smartui, moduleOptions)

    // Auto import de todos los composables
    // Mantener acceso a una función que tenga nombre de archivo
    const resolver = createResolver(import.meta.url)
    const resolved_path = resolver.resolve('src/composables')
    addImportsDir(resolved_path)
    
  }
})
