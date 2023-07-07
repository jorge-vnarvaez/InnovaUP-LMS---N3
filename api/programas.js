// ~/api/programas.js
import { apiConfig } from '~/composables/apiConfig'
import query from '~/plugins/db/schema'
import objectToQueryString from '~/plugins/objectToQueryString/objectToQueryString'

export async function fetchProgramas() {
    const { apiBaseURL } = apiConfig()
    const { access_token } = authStore()
    
    const params = objectToQueryString({
        fields: [
            ...query('lms/programa/base'),
            ...query('core/file/base','logo_programa'),
            ...query('core/file/base','foto_tarjeta'),
            ...query('core/file/base','foto_portada'),
        ],
        filter: {
            _and: [
                {
                    status:{
                        _eq: 'published'
                    }
                }
            ]
        }
    })

    const response = await fetch(`${apiBaseURL}/items/programas?${params}`,{
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
        fields: [
            'user_created',
            ...query('lms/programa/base'),
            ...query('core/file/base','logo_programa'),
            ...query('core/file/base','foto_tarjeta'),
            ...query('core/file/base','foto_portada'),
            ...query('lms/curso/base','cursos.cursos_id'),
            ...query('core/file/base','cursos.cursos_id.foto_tarjeta'),
            ...query('core/file/base','cursos.cursos_id.foto_portada'),
            ...query('core/file/base','material.directus_files_id'),
        ],
        deep: {
            material: {
                _sort: ['sort'],
            },
        }
    })
    const response = await fetch(`${apiBaseURL}/items/programas/${idPrograma}?${params}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(access_token) ? { 'Authorization': 'Bearer ' + access_token.value } : {},
        }
    })
    return await response.json()
}
  