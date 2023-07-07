import defaultTheme from 'tailwindcss/defaultTheme'
export default {
    theme: {
      extend: {
        colors: {
          'innovaup': '#f2682b',
        },
        aspectRatio: {
          '4/3': '4 / 3',
        },
      }
    },
    content: [
      'components/**/*.{vue,js,ts}',
      'components/**/**/*.{vue,js,ts}',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'composables/**/*.{js,ts}',
      'plugins/**/*.{js,ts}',
      'App.{js,ts,vue}',
      'app.{js,ts,vue}',
      'Error.{js,ts,vue}',
      'error.{js,ts,vue}',
      'content/**/*.md',
      'modules/**/src/**/*.{vue,js,ts}',
    ]
}