// composables/user/achievements/actions.js
import { fetchDataGeneral } from '~/api/data_general'
import { data_general } from './state'

export async function getDataGeneral() {
    const response = await fetchDataGeneral()
    data_general.value = response.data
    return response.data
}
