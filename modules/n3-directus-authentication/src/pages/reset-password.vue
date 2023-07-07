<template>
    <q-page padding>
        <div class="flex flex-col md:flex-row py-10 font-sans gap-10 text-slate-600">
            <div class="col">
                <!-- Sign in labels options.sign_up_labels -->
                <div class="text-4xl text-bold">Actualizar contraseña</div>
                <div class="text-xl text-light flex column gap-3 py-3">
                  <div>Ingresa nueva contraseña.</div>
                  <div>Una vez modificada te redirigemos a la página de inicio de sesión para que utilices tus nuevas credenciales.</div>
                </div>
                <!-- Sign in labels options.sign_up_labels -->
            </div>
            <q-card class="p-10 col" bordered flat>
              <!-- Sign in form -->
              <reset-password-form sign-in-to="/sign-in" />
              <!-- Sign in form -->
            </q-card>
        </div>
    </q-page>
</template>
