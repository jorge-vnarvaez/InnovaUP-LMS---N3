// composables/user/achievements/actions.js
import { fetchCursos, fetchCurso } from '~/api/cursos'
import { cursos } from './state'

export async function getCursos() {
  const response = await fetchCursos()
  cursos.value = response.data
}
export async function getCurso(curso_id) {
  const response = await fetchCurso(curso_id)
  return response.data
}