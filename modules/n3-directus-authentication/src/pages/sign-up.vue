<template>
    <q-page class="bg-slate-200 flex justify-center items-center flex-col pb-12">
        
        <div class="py-10">
            <div class="inline-flex items-center font-sans font-semibold gap-2 text-lg">
                <q-img src="/compitelogo.png" width="200px" />
            </div>
        </div>
        
        <div class="">
            <div class="p-10 max-w-lg mx-auto bg-white rounded-2xl border w-full md:min-w-[600px]">
                <sign-up-form pre-url="/second-auth" sign-up-to="/registro" />
            </div>
        </div>
    </q-page>
</template>
<script setup>

</script>