import rules from '../controllers/sanitization-rules.js'

export function sanitizationApi() {

    return {
        sanitizationRules: rules,
    }
}  