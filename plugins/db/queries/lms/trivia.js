export default {
    base: [
        'id', 
        'titulo', 
        'descripcion',
        '*.*',
        'alternativas.alternativas_id.id',
        'alternativas.alternativas_id.titulo',
    ],
}