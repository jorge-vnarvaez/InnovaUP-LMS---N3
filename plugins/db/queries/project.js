export default {
  'base': [
    'id', 'status', 'title', 'description', 'date_created',
    // Features
    'technical_difficulty_level', 'commercial_difficulty_level',
    'solution_type', 'client_type',
    // Images
    'cover_image',
    'master_files.directus_files_id.*',
    // Updates
    'count(project_updates)',
  ],
  'mini': [
    'id', 'title',
    'count(project_updates)',
  ],
  'nano': [
    'id', 'title',
  ],
}