export default {
  base: [
    'id', 'status', 'sort', 'title', 'description', 'type',
    // Projects data
    'count(projects)',
    'count(indicators)',
  ],
  compact: [
    'id', 'title'
  ]
}