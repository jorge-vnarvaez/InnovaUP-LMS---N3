
import { defineNuxtModule, addImportsDir, createResolver, addPlugin  } from '@nuxt/kit'
import path from "path";
import { defu } from 'defu'

export default defineNuxtModule({
  // Expose getOptions and getMeta for internal usage of Nuxt
  meta: {
    name: '@n3-directus-authentication',
    configKey: 'directusAuth',
    compatibility: {
      nuxt: '^3.4.0'
    }
  },
  // Default configuration options for your module, can also be a function returning those
  defaults: {
    core_labels: {
      first_name_label: 'Nombre',
      first_name_hint: '',
      last_name_label: 'Apellido',
      last_name_hint: '',
      email_label: 'Correo Electrónico',
      email_hint: 'correo@dominio.com',
      password_label: 'Contraseña',
      password_hint: '1 Mayúscula, 1 número, 1 carácter especial, 8 caracteres',
    },
    sign_up_labels: {
        title: 'Regístrate',
        button_label: 'Registrarse',
        message: 'Regístrate para tener acceso a la plataforma.',
    },
    sign_in_labels: {
        title: 'Inicia Sesión',
        button_label: 'Iniciar Sesión',
        message: 'Para comenzar, por favor ingresa tus credenciales de inicio de sesión y accede a tu cuenta. Desde allí, podrás explorar nuestros cursos y programas y avanzar en tu camino hacia el éxito académico y profesional. \n Si tienes algún problema para iniciar sesión, por favor contáctanos y estaremos encantados de ayudarte.',
    },
    request_password_labels: {
        title: 'Recuperar Contraseña',
        button_label: 'Recuperar Contraseña',
        message: 'Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña.',
    },
    reset_password_labels: {
        title: 'Cambiar Contraseña',
        button_label: 'Cambiar Contraseña',
        message: 'Ingresa tu nueva contraseña.',
    },
    PASSWORD_STRENGTH: 'weak',
    DIRECTUS_AUTHENTICATION_URL: 'http://localhost:8055',
    DEFAULT_SIGNUP_REDIRECT: '/',
    DEFAULT_LOGIN_REDIRECT: '/',
    DEFAULT_LOGOUT_REDIRECT: '/',
    DEFAULT_PASSWORD_REQUEST_REDIRECT: '/',
    DEFAULT_PASSWORD_RESET_REDIRECT: '/',
    DEFAULT_ACCESS_DENIED_REDIRECT: '/',
    messages: {
      sign_up: {
        400: {
          'message': 'El correo electrónico ya está registrado',
          'code': 400,
          'status_code': 400,
          'type': 'error',
          'error': 'Bad Request',
        },
        200: {
          'message': 'Registro exitoso',
          'code': 200,
          'status_code': 200,
          'type': 'success',
        },
        401: {
          'message': 'Credenciales de usuario incorrectas',
          'code': 401,
          'status_code': 401,
          'type': 'error',
          'error': 'Unauthorized',
        },
        500: {
          'message': 'Error del servidor, intenta más tarde',
          'code': 500,
          'status_code': 500,
          'type': 'error',
          'error': 'Internal Server Error',
        },
        // Mensaje por defecto registro seguro
        204: {
          'message': 'Registro exitoso',
          'code': 204,
          'status_code': 204,
          'type': 'success',
        }
      },
      sign_in: {
        400: {
          'message': 'Correo electrónico o contraseña incorrectos',
          'code': 400,
          'status_code': 400,
          'type': 'error',
          'error': 'Bad Request',
        },
        200: {
          'message': 'Inicio de sesión exitoso',
          'code': 200,
          'status_code': 200,
          'type': 'success',
        },
        401: {
          'message': 'Credenciales de usuario incorrectas',
          'code': 401,
          'status_code': 401,
          'type': 'error',
          'error': 'Unauthorized',
        },
        500: {
          'message': 'Error del servidor, intenta más tarde',
          'code': 500,
          'status_code': 500,
          'type': 'error',
          'error': 'Internal Server Error',
        },
      }
    },
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
        pages.push({
            name: 'My profile',
            path: '/my-profile',
            file: path.resolve(__dirname, "./src/pages/my-profile.vue"),
        });
        pages.push({
            name: 'Sign In',
            path: '/sign-in',
            file: path.resolve(__dirname, "./src/pages/sign-in.vue"),
        });
        pages.push({
            name: 'Sign up',
            path: '/sign-up',
            file: path.resolve(__dirname, "./src/pages/sign-up.vue"),
        });
        pages.push({
          name: 'Request password',
          path: '/request-password',
          file: path.resolve(__dirname, "./src/pages/request-password.vue"),
        });
        pages.push({
            name: 'Reset password',
            path: '/reset-password',
            file: path.resolve(__dirname, "./src/pages/reset-password.vue"),
        });
        pages.push({
            name: 'Thank you',
            path: '/sign-up-thanks',
            file: path.resolve(__dirname, "./src/pages/sign-up-thanks.vue"),
        });
        pages.push({
            name: 'Access denied',
            path: '/access-denied',
            file: path.resolve(__dirname, "./src/pages/access-denied.vue"),
        });
        pages.push({
            name: 'Auth status',
            path: '/auth-status',
            file: path.resolve(__dirname, "./src/pages/auth-status.vue"),
        });
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

    

    // Agregar plugin que hace el runtime
    addPlugin({
      src: path.resolve(__dirname, 'src/runtimers/startup-builders.js'),
      fileName: 'startup-builders.js',
      options: moduleOptions,
    })

    addPlugin({
      src: path.resolve(__dirname, 'src/plugins/auth-directives.js'),
      fileName: 'auth-directives.js',
      options: moduleOptions,
    })


    // Agregar middlewares
    addPlugin({
      src: path.resolve(__dirname, 'src/middleware/auth-middlewares.js'),
      fileName: 'auth-middlewares.js',
      options: moduleOptions,
    })



    // Agregar observadores de estados de la interfaz
    addPlugin({
      src: path.resolve(__dirname, 'src/watchers/check-refresh-token.js'),
      fileName: 'check-refresh-token.js',
      options: moduleOptions,
    })

    


    // addRouteMiddleware({
    //   name: 'another-auth',
    //   src: path.resolve(__dirname, 'src/middleware/another-auth.js'),
    //   fileName: 'another-auth.js',
    // })


    // addRouteMiddleware((to) => {
    //   if (to.path === '/forbidden') {
    //     return false
    //   }
    // })
    


    
  }
})
