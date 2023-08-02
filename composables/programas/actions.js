// ~/composables/programas/actions.js
import { fetchProgramas, fetchPrograma } from '~/api/programas'
import { programas } from './state'

export async function getProgramas() {
  const response = await fetchProgramas()
  programas.value = response
}

export async function getPrograma(programa_id) {
  const response = await fetchPrograma(programa_id)
  return response
}


