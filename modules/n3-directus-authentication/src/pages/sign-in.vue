<template>
    <q-page padding>
        <div class="flex flex-col md:flex-row py-10 font-sans gap-10 text-slate-600">
            <div class="col">
                <!-- Sign in labels options.sign_up_labels -->
                <div class="text-4xl text-bold">Inicia Sesión</div>
                <div class="text-xl text-light flex column gap-3 py-3">
                  <div>Para comenzar, por favor ingresa tus credenciales de inicio de sesión y accede a tu cuenta. Desde allí, podrás explorar nuestros cursos y programas y avanzar en tu camino hacia el éxito académico y profesional.</div>
                  <div>Si tienes algún problema para iniciar sesión, por favor contáctanos y estaremos encantados de ayudarte.</div>
                </div>
                <!-- Sign in labels options.sign_up_labels -->
            </div>
            <q-card class="p-10 col" bordered flat>
              <!-- Sign in form -->
              <sign-in-form />
              <!-- Sign in form -->
            </q-card>
        </div>
    </q-page>
</template>
