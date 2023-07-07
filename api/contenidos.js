// ~/api/programas.js
import { apiConfig } from '~/composables/apiConfig'
import query from '~/plugins/db/schema'
import objectToQueryString from '~/plugins/objectToQueryString/objectToQueryString'

export async function fetchContenido(idPrograma) {
    const { apiBaseURL } = apiConfig()
    const { access_token } = authStore()
    const params = objectToQueryString({
        fields: [
            ...query('lms/contenido_modulo/base'),
            ...query('core/file/base','material.directus_files_id'),
            ...query('core/file/base','pdf_guia'),
        ],
        sort: ['sort'],
    })
    const response = await fetch(`${apiBaseURL}/items/contenidos_modulos/${idPrograma}?${params}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(access_token) ? { 'Authorization': 'Bearer ' + access_token.value } : {},
        }
    })
    return await response.json()
}
  