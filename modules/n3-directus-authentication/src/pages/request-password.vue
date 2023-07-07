<template>
    <q-page padding>
        <div class="flex flex-col md:flex-row py-10 font-sans gap-10 text-slate-600">
            <div class="col">
                <!-- Sign in labels options.sign_up_labels -->
                <div class="text-4xl text-bold">Recuperar contraseña</div>
                <div class="text-xl text-light flex column gap-3 py-3">
                  <div>Ingresa tu correo electrónico para recuperar tu contraseña.</div>
                  <div>Si el correo electrónico indicado es un usuario te llegará un correo electrónico a tu casilla con las instrucciones para recuperar tu contraseña.</div>
                </div>
                <!-- Sign in labels options.sign_up_labels -->
            </div>
            <q-card class="p-10 col" bordered flat>
              <!-- Sign in form -->
              <request-password-form />
              <!-- Sign in form -->
            </q-card>
        </div>
    </q-page>
</template>
