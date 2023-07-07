import { defineNuxtPlugin } from '#app'
import { watch } from 'vue'
    
export default defineNuxtPlugin((nuxtApp) => {
  
  nuxtApp.hook('app:beforeMount', (app) => {

    app.directive('hide', { 
        
        beforeMount(el, binding, vnode) {
            el.style.display = 'none'
        },
        mounted(el, binding, vnode) {
            
            el.style.display = 'none'
        }
    })

    app.directive('hide-logged-in', {
        beforeMount(el, binding, vnode) {

          const { is_user_logged_in } = userStore()

          watch(is_user_logged_in, (isLoggedIn) => {

            if (isLoggedIn) {
              el.style.display = 'none'
            } else {
              el.style.display = ''
            }

          }, { immediate: true })
        },
    })

    app.directive('hide-logged-out', {
        beforeMount(el, binding, vnode) {
                
             const { is_user_logged_in } = userStore()
    
             watch(is_user_logged_in, (isLoggedIn) => {

                if (isLoggedIn) {
                  el.style.display = ''
                } else {
                  el.style.display = 'none'
                }
    
             }, { immediate: true })
          }
    })

    app.directive('on-click-outside', {
      beforeMount(el, binding) {

        const handler = (e) => {
          if (!el.contains(e.target)) {
            binding.value(e);
          }
        };
    
        onMounted(() => {
          document.addEventListener('click', handler);
        });
    
        onBeforeUnmount(() => {
          document.removeEventListener('click', handler);
        });


      },
    });



    // on-hide-selector
    app.directive('on-hide-selector', {
      beforeMount(el, binding) {
        const display = ref(el.style.display);
        watch(display, (newVal, oldVal) => {
          if (newVal === 'none' && el.matches(binding.arg)) {
            binding.value();
          }
        }, { immediate: true });
      },
    });

    // on-show-selector
    app.directive('on-show-selector', {
      beforeMount(el, binding) {
        const display = ref(el.style.display);
        watch(display, (newVal, oldVal) => {
          if (oldVal === 'none' && newVal !== 'none' && el.matches(binding.arg)) {
            binding.value();
          }
        }, { immediate: true });
      },
    });






  })

})