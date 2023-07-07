// api/cursos.js
import { apiConfig } from '~/composables/apiConfig'
import query from '~/plugins/db/schema'
import objectToQueryString from '~/plugins/objectToQueryString/objectToQueryString'
import axios from 'axios'

export async function fetchCursos() {
    const { apiBaseURL } = apiConfig()
    const { access_token } = authStore()
    const params = objectToQueryString({
        fields: [
            ...query('lms/curso/base'),
            ...query('core/file/base','foto_tarjeta'),
            ...query('core/file/base','foto_portada'),
            ...query('core/file/base','material.directus_files_id'),
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
    const response = await fetch(`${apiBaseURL}/items/cursos?${params}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(access_token) ? { 'Authorization': 'Bearer ' + access_token.value } : {},
        }
    })
    return await response.json()
}
export async function fetchCurso(idCurso) {

    const { apiBaseURL } = apiConfig()
    const { access_token } = authStore()
    const params = {
        fields: [
            ...query('lms/curso/base'),
            ...query('core/file/base','foto_tarjeta'),
            ...query('core/file/base','foto_portada'),
            ...query('lms/modulo_curso/base','modulos_cursos.modulos_cursos_id'),
            ...query('lms/contenido_modulo/base','modulos_cursos.modulos_cursos_id.contenidos_modulo.contenidos_modulos_id'),
            ...query('core/user/base','profesores_curso.directus_users_id'),
            ...query('core/file/base','material.directus_files_id'),
            // 'material.*',
            'modulos_cursos.modulos_cursos_id.contenidos_modulo.sort',
            // ...query('core/user/base','profesores_curso.directus_users_id'),
            // 'profesores_curso',
        ],
        deep: {
            modulos: {
                contenidos_modulo: {
                    _sort: ['sort'],
                }
            },
            material: {
                _sort: ['sort'],
            },
        }
    }

    const response = await axios.get(`${apiBaseURL}/items/cursos/${idCurso}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(access_token) ? { 'Authorization': 'Bearer ' + access_token.value } : {},
        },
        params: params
    })

    // console.log(response.data)

    return await response.data
}
  