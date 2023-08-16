// composables/user/achievements/actions.js
import { fetchContenido } from '~/api/contenidos'
import { fetchTrivia, checkTrivia } from '~/api/trivias'

export async function getContenido(contenido_id) {
  const response = await fetchContenido(contenido_id)
  return response.data
}

export async function getTrivia(trivia_id) {
  const response = await fetchTrivia(trivia_id)
  return response
}

export async function checkSeleccionadas(trivia_id, seleccionadas) {
  const response = await checkTrivia(trivia_id, seleccionadas)
  return await response
}