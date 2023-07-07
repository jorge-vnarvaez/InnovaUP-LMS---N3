export default {
  base: [
    'id', 'sort', 'title', 'excerpt', 'body',
    'count(project_updates)',
    'count(milestone_tasks)',
  ],
}