// ~/api/programas.js
import { apiConfig } from '~/composables/apiConfig'
import query from '~/plugins/db/schema'
import objectToQueryString from '~/plugins/objectToQueryString/objectToQueryString'

export async function fetchDataGeneral() {
    const { apiBaseURL } = apiConfig()

    const params = objectToQueryString({
        fields: [
            "*",
            ...query('core/file/base','foto_bienvenida'),
        ],
    })

    const response = await fetch(`${apiBaseURL}/items/data_general?${params}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + credentials.access_token,
        }
    })
    return await response.json()
}
  