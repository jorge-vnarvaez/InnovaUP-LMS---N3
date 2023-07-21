import { apiConfig } from '~/composables/apiConfig'
import query from '~/plugins/db/schema'
import objectToQueryString from '~/plugins/objectToQueryString/objectToQueryString'

export async function fetchTrivia(idTrivia) {
    const { apiBaseURL } = apiConfig()
    const { access_token } = authStore()

    const params = objectToQueryString({
        fields: [
            ...query('lms/trivia/base'),
        ],
        sort: ['sort'],
    })

    const response = await fetch(`${apiBaseURL}/items/trivias/${idTrivia}?${params}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(access_token) ? { 'Authorization': 'Bearer ' + access_token.value } : {},
        }
    })
    return await response.json()

}
