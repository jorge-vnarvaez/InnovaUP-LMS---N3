// src/watchers/check-refresh-token.js

import { defineNuxtPlugin } from '#app'

const now_to_utc_0_time = (addExpiresMs = 0) => {

    const now = new Date()
    const now_utc_0 = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
    const now_utc_0_ms = now_utc_0.getTime()
    const now_utc_0_ms_expires = now_utc_0_ms + addExpiresMs

    return now_utc_0_ms_expires 

}


const INACTIVE_INTERVAL_TIME = 10000; // Interval time in milliseconds when tab is inactive
const ACTIVE_INTERVAL_TIME = 5000; // Interval time in milliseconds when tab is active
const PERFORM_IF_MS_LTE = 450000; // ejecutar si es menor que. Es decir si faltan 450 segundos / 7,5 minutos o menos para que expire el token

export default defineNuxtPlugin(nuxtApp => {
  if (typeof document === 'undefined') {
    // server-side, do nothing.
    return;
  }

  let inactiveIntervalId;
  let activeIntervalId;
  let actionCount = 0; // Initialize action count

  const performAction = async (status) => {

    /**
     * Action to perform
     */
    actionCount++; // Increment action count
    // console.log(`Performing ${status} action... Count: ${actionCount}`);

    const { is_user_logged_in } = userStore()
    const { access_token, refresh_token, expires, expires_time, refresh_auth_tokens } = authStore()

    if(!expires_time.value) {
        // No ejecutar, no hay expires_time
    }
    if(expires_time.value && ((expires_time.value - now_to_utc_0_time()) > PERFORM_IF_MS_LTE)) {
        // No ejecutar, falta
        
    }
    if(expires_time.value && ((expires_time.value - now_to_utc_0_time()) <= PERFORM_IF_MS_LTE)) {
        // console.log('Refreshing token...')
        await refresh_auth_tokens()
    }

    // Add the action you want to perform here.
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' || document.hasFocus()) {
      /**
       * Tab is active
       */
      // If the inactive interval is set, clear it.
      if (inactiveIntervalId) {
        clearInterval(inactiveIntervalId);
        inactiveIntervalId = null;
      }
      // Perform the action immediately when the tab becomes active.
      performAction('active-immediate');
      // Set an interval to perform the action every ACTIVE_INTERVAL_TIME milliseconds.
      activeIntervalId = setInterval(() => performAction('while-active'), ACTIVE_INTERVAL_TIME);
    } else {
      /**
       * Tab is inactive
       */
      // If the active interval is set, clear it.
      if (activeIntervalId) {
        clearInterval(activeIntervalId);
        activeIntervalId = null;
      }
      // Set an interval to perform the action every INACTIVE_INTERVAL_TIME milliseconds.
      inactiveIntervalId = setInterval(() => performAction('while-inactive'), INACTIVE_INTERVAL_TIME);
    }
  };

  nuxtApp.hook('app:beforeMount', () => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    handleVisibilityChange(); // Check the visibility state immediately
  });
});
