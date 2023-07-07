# Acerca
n3-directus-authentication es un plugin para agregar componentes de autenticación de directus a nuxt3

Nombre de opciones públicas: directusAuth

# Recordatorio / Buenas prácticas módulos
A continuación se detallan algunas buenas prácticas para el desarrollo de módulos:
1. El nombre del módulo debe ser el mismo que el nombre del directorio
2. Que el nombre de los composables sea expuestos sean únicos

Recordar que el scope de tailwind en los módulos es:
'modules/**/src/**/*.{vue,js,ts}'
Cualquier elemento fuera este scope no será considerado


# Estructura
El plugin tiene la siguiente estructura de directorio

/src: contiene el código fuente del plugin
/src/api: contiene los requests admitidos
/src/components: contiene los componentes del plugin  
/src/composables: contiene los composables del plugin
/src/middleware: contiene los middlewares del plugin
/src/watchers: contiene los watchers del plugin
/src/pages: contiene las páginas del plugin
/src/directives: contiene las directivas del plugin
/src/controllers: contiene los controladores del plugin
/src/layouts: contiene los layouts del plugin
/init: contiene el código de inicialización del plugin
/init/index.js: contiene el código de inicialización del plugin
/README.md: contiene la documentación del plugin

# Requerimientos
A continuación se detallan los requerimientos del plugin

## Opciones de módulo de entorno

Provee opciones públicas vía
```javascript
import { useRuntimeConfig } from '#app'
const directusAuth = useRuntimeConfig().public.directusAuth
```

1. DIRECTUS_AUTHENTICATION_URL: url de la api de directus
2. DEFAULT_SIGNUP_REDIRECT: ruta a la que se redirecciona luego de crear una cuenta
3. DEFAULT_LOGIN_REDIRECT: ruta a la que se redirecciona luego de iniciar sesión
4. DEFAULT_LOGOUT_REDIRECT: ruta a la que se redirecciona luego de cerrar sesión
5. DEFAULT_ACCESS_DENIED_REDIRECT: ruta a la que se redirecciona luego de denegar el acceso
6. core_labels.email_label: 'Correo Electrónico'
6. core_labels.email_hint: 'correo@dominio.com'
6. core_labels.password_label: 'Contraseña'
6. core_labels.password_hint: '1 Mayúscula, 1 número, 1 carácter especial, 8 caracteres'
6. sign_up_labels.title: 'Regístrate'
6. sign_up_labels.button_label: 'Registrarse'
6. sign_up_labels.message: 'Regístrate para tener acceso a la plataforma.'
6. sign_in_labels.title: 'Inicia Sesión'
6. sign_in_labels.button_label: 'Iniciar Sesión'
6. sign_in_labels.message: 'Para comenzar, por favor ingresa tus credenciales de inicio de sesión y accede a tu cuenta. Desde allí, podrás explorar nuestros cursos y programas y avanzar en tu camino hacia el éxito académico y profesional. \n Si tienes algún problema para iniciar sesión, por favor contáctanos y estaremos encantados de ayudarte.'

## Módulos
Para correr requiere de las siguientes módulos:

1. Quasar: utiliza sus componentes de q-input, q-btn y q-form. También sus validadores.
https://nuxt.com/modules/quasar

2. Tailwind: utiliza sus clases para estilizar el formulario
https://nuxt.com/modules/tailwindcss

## Vanilla js
2. Fetch: utiliza la api nativa de fetch para hacer las peticiones a directus.

# Output
En este apartado se detalla la salida del plugin

## Componentes
- SignInForm: permite iniciar sesión
- SignUpForm: permite crear una cuenta
- RequestPasswordForm: permite solicitar una nueva contraseña
- ResetPasswordForm: permite cambiar la contraseña
- AccessDenied: muestra un mensaje de acceso denegado
- SignInButtons: muestra botones para iniciar sesión
- SignUpButtons: muestra botones para crear una cuenta
- SignButtons: muestra botones para iniciar sesión o crear una cuenta
- LogOutButton: muestra un botón para cerrar sesión
- UserNav: muestra un menú para el usuario logueado

## Composables

### state
- access_token (string): token de acceso
- refresh_token (string): token de refresco
- expires (integer): tiempo de expiración del token en ms
- mode (string): modo de respuesta de directus. JSON por defecto.
- is_user_logged_in (boolean): indica si el usuario está logueado
- is_refreshing_token (boolean): indica si se está refrescando el token
- user_roles (array): roles del usuario logueado
- user (object): datos del usuario logueado

### Actions
- async login (credentials = {}): inicia sesión
- async logout (credentials = {}): cierra sesión y destruye token
- async signup (credentials = {}): crea una cuenta e inicia sesión
- async refresh (credentials = {}): 
- async requestPassword (credentials = {}):
- async resetPassword (credentials = {}, token = null):
- async updatePassword (credentials = {}, newPassword = null): actualiza la contraseña del usuario logueado
- async fetchUser (credentials = {}): obtiene los datos del usuario logueado
- async fetchUserRoles (credentials = {}): obtiene los roles del usuario logueado
- async updateUser(credentials = {}, data = {}): actualiza los datos del usuario logueado

### Middleware
- is_user_logged_in: verifica si el usuario está logueado
- is_user_role(role): verifica si el usuario tiene el rol indicado
- access_denied_redirect(path): redirecciona a la ruta indicada

### Watchers
- refresh_token: verifica periódicamente si es necesario refrescar el token

### Providers


### Directives
- allowed_roles(roles=[]): verifica si el usuario tiene alguno de los roles indicados
- forbidden_roles(roles=[]): verifica si el usuario tiene alguno de los roles indicados
- logged_in: verifica si el usuario está logueado
- logged_out: verifica si el usuario no está logueado

### Cookies y local storage
Usando el módulo de nuxt useCookie se provee:

- access_token: token de acceso
- refresh_token: token de refresco
- expires: timestamp de expiración del token
- token_ts: timestamp de creación del token

Se recomienda usar siempre el cookie para asegurar su uso en modo SSR.