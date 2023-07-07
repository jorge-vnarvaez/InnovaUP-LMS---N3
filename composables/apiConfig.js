import { useRuntimeConfig } from '#app'

// composables/apiConfig.js
export function apiConfig() {
    const runtimeConfig = useRuntimeConfig()
    const apiBaseURL    = runtimeConfig.public.api.baseURL
    const apiFileURL    = `${runtimeConfig.public.api.baseURL}/assets/`

    return { 
        apiBaseURL,
        apiFileURL,
    }
}

export const useFoo = () => {
    return useState('foo', () => 'bar')
}