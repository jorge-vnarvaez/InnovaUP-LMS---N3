export default {
  base: [
    // Administrative metadata
    'id', 'user_created', 'date_created', 'user_updated', 'date_updated',
    // Content 
    'body',
    // Map
    'parent_project', 'parent_ip_milestone', 'files.directus_files_id.*',
  ],
  id: [
    'id',
  ]
}