// composables/user/achievements/actions.js
import { fetchContenido } from '~/api/contenidos'

export async function getContenido(contenido_id) {
  const response = await fetchContenido(contenido_id)
  return response.data
}