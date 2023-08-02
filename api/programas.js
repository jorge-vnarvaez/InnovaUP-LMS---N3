// ~/api/programas.js
import { apiConfig } from '~/composables/apiConfig'
import query from '~/plugins/db/schema'
import objectToQueryString from '~/plugins/objectToQueryString/objectToQueryString'

export async function fetchProgramas() {
    const { apiBaseURL } = apiConfig()
    const { access_token } = authStore()

    const response = await fetch(`${apiBaseURL}/programas`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(access_token) ? { 'Authorization': 'Bearer ' + access_token.value } : {},
        }
    })
    
    return await response.json()
}
export async function fetchPrograma(idPrograma) {
    const { apiBaseURL } = apiConfig()
    const { access_token } = authStore()

    const params = objectToQueryString({
       id: idPrograma,
    })

    const response = await fetch(`${apiBaseURL}/programas/cursos/?${params}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(access_token) ? { 'Authorization': 'Bearer ' + access_token.value } : {},
        }
    })
    return await response.json()
}
  