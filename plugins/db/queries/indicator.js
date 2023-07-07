export default {
  base: [
    // Descriptive fields
    'id', 'title', 'sort', 'description',
    'date_created',
    // Logic
    'goal_logic',
    'goal_timeframe',

    'goal_statement',
    'current_okr_goal',
    'latest_now_value',
    'latest_now_value_rel_base100',
    'is_okr_active',

    // Projects data
    'count(projects)',
    'count(indicator_goals)',
    'count(indicator_managers)',
    'parent_indicator',
  ],
  compact: [
    'id', 'title'
  ],
  okr: [
    'id', 'title', 'description', 
    'goal_logic', 'goal_timeframe',
    'goal_statement', 'parent_indicator'
  ],
}