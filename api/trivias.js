import { apiConfig } from '~/composables/apiConfig'
import query from '~/plugins/db/schema'
import objectToQueryString from '~/plugins/objectToQueryString/objectToQueryString'

export async function fetchTrivia(idTrivia) {
    const { apiBaseURL } = apiConfig()
    const { access_token } = authStore()

    const response = await fetch(`${apiBaseURL}/trivias`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(access_token) ? { 'Authorization': 'Bearer ' + access_token.value } : {},
        },
        body: JSON.stringify({
            trivias_id: idTrivia,
        })
    })
    return await response.json()
}

export async function checkTrivia(idTrivia, seleccionadas) {

    const { apiBaseURL } = apiConfig()
    const { access_token } = authStore()
    const { user } = userStore()

    const response = await fetch(`${apiBaseURL}/trivias/check-trivia`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(access_token) ? { 'Authorization': 'Bearer ' + access_token.value } : {},
        },
        body: JSON.stringify({
            trivias_id: idTrivia,
            user: user?.data?.id,
            seleccionadas: seleccionadas,
        })
    })

    return await response

}