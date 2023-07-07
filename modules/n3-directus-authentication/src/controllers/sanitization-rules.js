export default {
    rules: (val, target_rule, options = {}) => {

        const defaultOptions = {
            length: 0,
            characters: [],
            characters_min_length: null,
            characters_max_length: null,
            special_characters_min_length: null,
            special_characters_max_length: null,
            space_characters_min_length: null,
            space_characters_max_length: null,
            uppercase_characters_min_length: null,
            uppercase_characters_max_length: null,
            lowercase_characters_min_length: null,
            lowercase_characters_max_length: null,
            numbers_min_length: null,
            numbers_max_length: null,
            fractions_min_length: null,
            fractions_max_length: null,
            array_max_length: null,
            array_min_length: null,
            required_characters: [],
            forbidden_characters: [],
            required_words: [],
            forbidden_words: [],
            allowed_extensions: [],
            disallowed_extensions: [],
            target_type: null,
            target_value: null,
        }
    
        options = {...defaultOptions, ...options}
        
        const evals = {
            required: val => val !== null || 'Requerido',
            not_null: val => val !== null || 'Requerido',
            not_empty: val => val !== '' || 'Requerido',
    
            // Any character rules
            characters_min_length: val => val.length >= options.characters_min_length || `Largo mínimo ${options.characters_min_length}`,
            characters_max_length: val => val.length <= options.characters_max_length || `Largo máximo ${options.characters_max_length}`,
            has_characters_or: val => new RegExp(`[${options.required_characters.join('')}]`).test(val) || `Debe tener alguno de los siguientes caracteres ${options.required_characters.join(', ')}`,
            has_characters_and: val => options.required_characters.every(char => val.includes(char)) || `Debe tener todos los siguientes caracteres ${options.required_characters.join(', ')}`,
    
            // Forbidden characters validation
            forbidden_characters_or: val => !new RegExp(`[${options.forbidden_characters.join('')}]`).test(val) || `No debe tener ninguno de los siguientes caracteres ${options.forbidden_characters.join(', ')}`,
            forbidden_characters_or_min_length: val => (val.match(new RegExp(`[${options.forbidden_characters.join('')}]`, 'g')) || []).length <= options.forbidden_characters_or_max_length || `Debe tener máximo ${options.forbidden_characters_or_max_length} de los siguientes caracteres prohibidos ${options.forbidden_characters.join(', ')}`,
            forbidden_characters_or_max_length: val => (val.match(new RegExp(`[${options.forbidden_characters.join('')}]`, 'g')) || []).length >= options.forbidden_characters_or_min_length || `Debe tener al menos ${options.forbidden_characters_or_min_length} de los siguientes caracteres prohibidos ${options.forbidden_characters.join(', ')}`,
            forbidden_characters_and: val => options.forbidden_characters.every(char => !val.includes(char)) || `No debe tener todos los siguientes caracteres ${options.forbidden_characters.join(', ')}`,
            forbidden_characters_and_min_length: val => options.forbidden_characters.filter(char => !val.includes(char)).length <= options.forbidden_characters_and_max_length || `Debe tener máximo ${options.forbidden_characters_and_max_length} de los siguientes caracteres prohibidos ${options.forbidden_characters.join(', ')}`,
            forbidden_characters_and_max_length: val => options.forbidden_characters.filter(char => !val.includes(char)).length >= options.forbidden_characters_and_min_length || `Debe tener al menos ${options.forbidden_characters_and_min_length} de los siguientes caracteres prohibidos ${options.forbidden_characters.join(', ')}`,
    
            // Words validation
            words_min_length: val => val.split(/\s+/).length >= options.words_min_length || `Debe tener al menos ${options.words_min_length} palabras`,
            words_max_length: val => val.split(/\s+/).length <= options.words_max_length || `Debe tener máximo ${options.words_max_length} palabras`,
            has_words_and: val => options.required_words.every(word => val.includes(word)) || `Debe tener todas las siguientes palabras ${options.required_words.join(', ')}`,
            has_words_or: val => options.required_words.some(word => val.includes(word)) || `Debe tener alguna de las siguientes palabras ${options.required_words.join(', ')}`,
            words_and_min_length: val => options.required_words.filter(word => val.includes(word)).length >= options.words_and_min_length || `Debe tener al menos ${options.words_and_min_length} de las siguientes palabras requeridas ${options.required_words.join(', ')}`,
            words_and_max_length: val => options.required_words.filter(word => val.includes(word)).length <= options.words_and_max_length || `Debe tener máximo ${options.words_and_max_length} de las siguientes palabras requeridas ${options.required_words.join(', ')}`,
            forbidden_words_or: val => !options.forbidden_words.some(word => val.includes(word)) || `No debe tener ninguna de las siguientes palabras ${options.forbidden_words.join(', ')}`,
            forbidden_words_or_min_length: val => options.forbidden_words.filter(word => val.includes(word)).length <= options.forbidden_words_or_max_length || `Debe tener máximo ${options.forbidden_words_or_max_length} de las siguientes palabras prohibidas ${options.forbidden_words.join(', ')}`,
            forbidden_words_or_max_length: val => options.forbidden_words.filter(word => val.includes(word)).length >= options.forbidden_words_or_min_length || `Debe tener al menos ${options.forbidden_words_or_min_length} de las siguientes palabras prohibidas ${options.forbidden_words.join(', ')}`,
            forbidden_words_and: val => options.forbidden_words.every(word => !val.includes(word)) || `No debe tener todas las siguientes palabras ${options.forbidden_words.join(', ')}`,
            forbidden_words_and_min_length: val => options.forbidden_words.filter(word => !val.includes(word)).length <= options.forbidden_words_and_max_length || `Debe tener máximo ${options.forbidden_words_and_max_length} de las siguientes palabras prohibidas ${options.forbidden_words.join(', ')}`,
            
            // Words no separators validation
            words_no_separators_min_length: val => val.split(/[^a-zA-Z]+/).length >= options.words_no_separators_min_length || `Debe tener al menos ${options.words_no_separators_min_length} palabras sin separadores`,
            words_no_separators_max_length: val => val.split(/[^a-zA-Z]+/).length <= options.words_no_separators_max_length || `Debe tener máximo ${options.words_no_separators_max_length} palabras sin separadores`,
            has_words_no_separators_and: val => options.required_words.every(word => val.split(/[^a-zA-Z]+/).includes(word)) || `Debe tener todas las siguientes palabras sin separadores ${options.required_words.join(', ')}`,
            has_words_no_separators_or: val => options.required_words.some(word => val.split(/[^a-zA-Z]+/).includes(word)) || `Debe tener alguna de las siguientes palabras sin separadores ${options.required_words.join(', ')}`,
            words_no_separators_and_min_length: val => options.required_words.filter(word => val.split(/[^a-zA-Z]+/).includes(word)).length >= options.words_no_separators_and_min_length || `Debe tener al menos ${options.words_no_separators_and_min_length} de las siguientes palabras sin separadores requeridas ${options.required_words.join(', ')}`,
            words_no_separators_and_max_length: val => options.required_words.filter(word => val.split(/[^a-zA-Z]+/).includes(word)).length <= options.words_no_separators_and_max_length || `Debe tener máximo ${options.words_no_separators_and_max_length} de las siguientes palabras sin separadores requeridas ${options.required_words.join(', ')}`,
            forbidden_words_no_separators_or: val => !options.forbidden_words.some(word => val.split(/[^a-zA-Z]+/).includes(word)) || `No debe tener ninguna de las siguientes palabras sin separadores ${options.forbidden_words.join(', ')}`,
            forbidden_words_no_separators_or_min_length: val => options.forbidden_words.filter(word => val.split(/[^a-zA-Z]+/).includes(word)).length <= options.forbidden_words_no_separators_or_max_length || `Debe tener máximo ${options.forbidden_words_no_separators_or_max_length} de las siguientes palabras sin separadores prohibidas ${options.forbidden_words.join(', ')}`,
            forbidden_words_no_separators_or_max_length: val => options.forbidden_words.filter(word => val.split(/[^a-zA-Z]+/).includes(word)).length >= options.forbidden_words_no_separators_or_min_length || `Debe tener al menos ${options.forbidden_words_no_separators_or_min_length} de las siguientes palabras sin separadores prohibidas ${options.forbidden_words.join(', ')}`,
            forbidden_words_no_separators_and: val => options.forbidden_words.every(word => !val.split(/[^a-zA-Z]+/).includes(word)) || `No debe tener todas las siguientes palabras sin separadores ${options.forbidden_words.join(', ')}`,
            forbidden_words_no_separators_and_min_length: val => options.forbidden_words.filter(word => !val.split(/[^a-zA-Z]+/).includes(word)).length <= options.forbidden_words_no_separators_and_max_length || `Debe tener máximo ${options.forbidden_words_no_separators_and_max_length} de las siguientes palabras sin separadores prohibidas ${options.forbidden_words.join(', ')}`,
            forbidden_words_no_separators_and_max_length: val => options.forbidden_words.filter(word => !val.split(/[^a-zA-Z]+/).includes(word)).length >= options.forbidden_words_no_separators_and_min_length || `Debe tener al menos ${options.forbidden_words_no_separators_and_min_length} de las siguientes palabras sin separadores prohibidas ${options.forbidden_words.join(', ')}`,
    
            // Boolean rules
            is_boolean: val => typeof val === 'boolean' || 'Debe ser un booleano',
    
            // Array rules
            is_array: val => Array.isArray(val) || 'Debe ser un arreglo',
            array_elements_are: val => Array.isArray(val) && val.every(el => typeof el === options.target_type) || `Todos los elementos deben ser de tipo ${options.target_type}`,
            array_min_length: val => Array.isArray(val) && val.length >= options.array_min_length || `Debe tener al menos ${options.array_min_length} elementos`,
            array_max_length: val => Array.isArray(val) && val.length <= options.array_max_length || `Debe tener máximo ${options.array_max_length} elementos`,
    
            // Object rules
            is_object: val => typeof val === 'object' && !Array.isArray(val) || 'Debe ser un objeto',
            is_value: val => val === options.target_value || `El valor debe ser ${options.target_value}`,
            object_has_keys: val => Object.keys(val).every(key => options.required_keys.includes(key)) || `El objeto debe tener los siguientes atributos ${options.required_keys.join(', ')}`,
            
            // Space character rules
            is_space_character: val => /^\s+$/.test(val) || 'Debe ser un espacio',
            has_space_character: val => /\s/.test(val) || 'Debe tener al menos un espacio',
            space_characters_min_length: val => (val.match(/\s/g) || []).length >= options.space_characters_min_length || `Debe tener al menos ${options.space_characters_min_length} espacios`,
            space_characters_max_length: val => (val.match(/\s/g) || []).length <= options.space_characters_max_length || `Debe tener máximo ${options.space_characters_max_length} espacios`,
    
            // Uppercase character rules
            is_uppercase_character: val => /^[A-Z]+$/.test(val) || 'Debe ser un caracter en mayúsculas',
            has_uppercase_character: val => /[A-Z]/.test(val) || 'Debe tener al menos un caracter en mayúsculas',
            uppercase_characters_min_length: val => (val.match(/[A-Z]/g) || []).length >= options.uppercase_characters_min_length || `Debe tener al menos ${options.uppercase_characters_min_length} caracteres en mayúsculas`,
            uppercase_characters_max_length: val => (val.match(/[A-Z]/g) || []).length <= options.uppercase_characters_max_length || `Debe tener máximo ${options.uppercase_characters_max_length} caracteres en mayúsculas`,
    
            // Lowercase character rules
            is_lowercase_character: val => /^[a-z]+$/.test(val) || 'Debe ser un carácter en minúscula',
            has_lowercase_character: val => /[a-z]/.test(val) || 'Debe tener al menos un carácter en minúscula',
            lowercase_characters_min_length: val => (val.match(/[a-z]/g) || []).length >= options.lowercase_characters_min_length || `Debe tener al menos ${options.lowercase_characters_min_length} caracteres en minúscula`,
            lowercase_characters_max_length: val => (val.match(/[a-z]/g) || []).length <= options.lowercase_characters_max_length || `Debe tener máximo ${options.lowercase_characters_max_length} caracteres en minúscula`,
    
            // Special character rules
            is_special_character: val => /^[!@#$%^&*(),.?":{}|<>]+$/.test(val) || 'Debe ser un caracter especial',
            has_special_character: val => /[!@#$%^&*(),.?":{}|<>]/.test(val) || 'Debe tener al menos un caracter especial',
            special_characters_min_length: val => (val.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length >= options.special_characters_min_length || `Debe tener al menos ${options.special_characters_min_length} caracteres especiales`,
            special_characters_max_length: val => (val.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length <= options.special_characters_max_length || `Debe tener máximo ${options.special_characters_max_length} caracteres especiales`,
    
            // Number rules
            is_number: val => /^[0-9]+$/.test(val) || 'Debe ser un número',
            has_number_character: val => /[0-9]/.test(val) || 'Debe tener al menos un número',
            number_characters_min_length: val => (val.match(/[0-9]/g) || []).length >= options.number_characters_min_length || `Debe tener al menos ${options.number_characters_min_length} números`,
            number_characters_max_length: val => (val.match(/[0-9]/g) || []).length <= options.number_characters_max_length || `Debe tener máximo ${options.number_characters_max_length} números`,
    
            // Integer rules
            is_integer: val => /^-?[0-9]+$/.test(val) || 'Debe ser un entero',
            has_integer: val => /-?[0-9]+/.test(val) || 'Debe tener al menos un entero',
            integers_min_length: val => (val.match(/-?[0-9]+/g) || []).length >= options.integers_min_length || `Debe tener al menos ${options.integers_min_length} enteros`,
            integers_max_length: val => (val.match(/-?[0-9]+/g) || []).length <= options.integers_max_length || `Debe tener máximo ${options.integers_max_length} enteros`,
    
            // Decimal rules with comma as a separator
            is_decimal_comma: val => /^-?[0-9]+(,[0-9]+)?$/.test(val) || 'Debe ser un número decimal con coma como separador',
            has_decimal_comma: val => /-?[0-9]+(,[0-9]+)?/.test(val) || 'Debe tener al menos un número decimal con coma como separador',
            decimal_comma_numbers_min_length: val => (val.match(/-?[0-9]+(,[0-9]+)?/g) || []).length >= options.decimal_comma_numbers_min_length || `Debe tener al menos ${options.decimal_comma_numbers_min_length} números decimales con coma`,
            decimal_comma_numbers_max_length: val => (val.match(/-?[0-9]+(,[0-9]+)?/g) || []).length <= options.decimal_comma_numbers_max_length || `Debe tener máximo ${options.decimal_comma_numbers_max_length} números decimales con coma`,
            decimal_comma_fractions_min_length: val => (val.match(/,(?=[0-9])/g) || []).length >= options.decimal_comma_fractions_min_length || `Debe tener al menos ${options.decimal_comma_fractions_min_length} fracciones decimales con coma`,
            decimal_comma_fractions_max_length: val => (val.match(/,(?=[0-9])/g) || []).length <= options.decimal_comma_fractions_max_length || `Debe tener máximo ${options.decimal_comma_fractions_max_length} fracciones decimales con coma`,
    
            // Decimal rules with point as a separator
            is_decimal_point: val => /^-?[0-9]+(\.[0-9]+)?$/.test(val) || 'Debe ser un número decimal con punto como separador',
            has_decimal_point: val => /-?[0-9]+(\.[0-9]+)?/.test(val) || 'Debe tener al menos un número decimal con punto como separador',
            decimal_point_numbers_min_length: val => (val.match(/-?[0-9]+(\.[0-9]+)?/g) || []).length >= options.decimal_point_numbers_min_length || `Debe tener al menos ${options.decimal_point_numbers_min_length} números decimales con punto`,
            decimal_point_numbers_max_length: val => (val.match(/-?[0-9]+(\.[0-9]+)?/g) || []).length <= options.decimal_point_numbers_max_length || `Debe tener máximo ${options.decimal_point_numbers_max_length} números decimales con punto`,
            decimal_point_fractions_min_length: val => (val.match(/\.(?=[0-9])/g) || []).length >= options.decimal_point_fractions_min_length || `Debe tener al menos ${options.decimal_point_fractions_min_length} fracciones decimales con punto`,
            decimal_point_fractions_max_length: val => (val.match(/\.(?=[0-9])/g) || []).length <= options.decimal_point_fractions_max_length || `Debe tener máximo ${options.decimal_point_fractions_max_length} fracciones decimales con punto`,
    
            // Formats
            is_email_format: val => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(val) || 'Formato de correo electrónico inválido',
            is_url_format: val => /^https?:\/\/([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(val) || 'Formato de URL inválido',
            is_query_string: val => /^[?&]?(\w+=\w+(&\w+=\w+)*)?$/.test(val) || 'Debe ser una cadena de consulta válida',
            is_file_url: val => /^https?:\/\/[\w-]+(\.[\w-]+)+\/[\w-]+(\.[\w-]+)*(\/[\w-]+(\.[\w-]+)*)*(\?[a-zA-Z0-9%_&=+-]+)?$/.test(val) || 'Debe ser una URL de archivo válida',
            is_file_name: val => /^[^\/:*?"<>|]+(\.[a-zA-Z0-9]+)+$/.test(val) || 'Debe ser un nombre de archivo válido',
    
            has_url: val => /\b(?:https?:\/\/|www\.)\S+/i.test(val) || 'El texto tiene una URL',
            forbidden_url: val => !/\b(?:https?:\/\/|www\.)\S+/i.test(val) || 'El texto tiene una URL no permitida',
            is_valid_html_element: val => /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/.test(val) || 'Debe ser un elemento HTML válido',
            has_escape_chars: val => /\\[0-7]{1,3}|\\x[0-9A-Fa-f]{1,2}|\\u[0-9A-Fa-f]{4}|\\U[0-9A-Fa-f]{8}|\\./.test(val) || 'El texto tiene caracteres de escape',
            forbidden_escape_chars: val => !/\\[0-7]{1,3}|\\x[0-9A-Fa-f]{1,2}|\\u[0-9A-Fa-f]{4}|\\U[0-9A-Fa-f]{8}|\\./.test(val) || 'El texto tiene caracteres de escape no permitidos',
            is_blob: val => /^blob:/.test(val) || 'Debe ser un blob',
            is_base64: val => /^(data:\w+\/[a-zA-Z\-\+]+(;charset=[\w\d-]+)?;base64,)?([\w\d+\/=]+\s*)*$/i.test(val) || 'Debe ser una cadena base64 válida',
            is_utf8: val => /^([\x09\x0A\x0D\x20-\x7E]|[\xC2-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF4][\x80-\xBF]{3})*$/.test(val) || 'Debe ser una cadena UTF-8 válida',
            is_img_file: val => /\.(jpe?g|png|gif|bmp|tiff|webp)$/i.test(val) || 'Debe ser un archivo de imagen válido',
            is_video_file: val => /\.(mp4|webm|mkv|flv|vob|ogv|avi|wmv|mov|qt|avchd|swf|m4v)$/i.test(val) || 'Debe ser un archivo de video válido',
    
            is_iso_8859_1: val => /^[\x00-\xFF]*$/.test(val) || 'Debe ser una cadena ISO-8859-1 válida',
            is_iso_8859_2: val => /^[\x00-\xFF]*$/.test(val) || 'Debe ser una cadena ISO-8859-2 válida',
            is_windows_1252: val => /^[\x00-\xFF]*$/.test(val) || 'Debe ser una cadena Windows-1252 válida',
            is_windows_1251: val => /^[\x00-\xFF]*$/.test(val) || 'Debe ser una cadena Windows-1251 válida',
            is_shift_jis: val => /^[\x00-\x7F\xA1-\xDF]*$/.test(val) || 'Debe ser una cadena Shift_JIS válida',
            is_gb2312: val => /^[\x00-\xFF]*$/.test(val) || 'Debe ser una cadena GB2312 válida',
            is_big5: val => /^[\x00-\x7F\xA1-\xF9]*$/.test(val) || 'Debe ser una cadena Big5 válida',
            is_euc_kr: val => /^[\x00-\x7F\xA1-\xFE]*$/.test(val) || 'Debe ser una cadena EUC-KR válida',
            is_euc_jp: val => /^[\x00-\x7F\xA1-\xFE]*$/.test(val) || 'Debe ser una cadena EUC-JP válida',
            is_koi8_r: val => /^[\x00-\xFF]*$/.test(val) || 'Debe ser una cadena KOI8-R válida',
            is_pdf_file: val => /\.(pdf)$/i.test(val) || 'Debe ser un archivo PDF válido',
            is_doc_file: val => /\.(doc|docx)$/i.test(val) || 'Debe ser un archivo DOC/DOCX válido',
            is_xls_file: val => /\.(xls|xlsx)$/i.test(val) || 'Debe ser un archivo XLS/XLSX válido',
            is_ppt_file: val => /\.(ppt|pptx)$/i.test(val) || 'Debe ser un archivo PPT/PPTX válido',
            is_txt_file: val => /\.(txt)$/i.test(val) || 'Debe ser un archivo TXT válido',
            is_csv_file: val => /\.(csv)$/i.test(val) || 'Debe ser un archivo CSV válido',
            is_zip_file: val => /\.(zip)$/i.test(val) || 'Debe ser un archivo ZIP válido',
            is_rar_file: val => /\.(rar)$/i.test(val) || 'Debe ser un archivo RAR válido',
            is_7z_file: val => /\.(7z)$/i.test(val) || 'Debe ser un archivo 7z válido',
            is_gzip_file: val => /\.(gz)$/i.test(val) || 'Debe ser un archivo GZIP válido',
    
            is_trimmed_start: val => val.trimStart() === val || 'La cadena debe comenzar sin espacios en blanco',
            is_trimmed_end: val => val.trimEnd() === val || 'La cadena debe finalizar sin espacios en blanco',
            no_html_tags: val => !/<[^>]*>/g.test(val) || 'La cadena no debe contener etiquetas HTML',
            no_script_tags: val => !/<script[^>]*>[\s\S]*?<\/script>/gi.test(val) || 'La cadena no debe contener etiquetas de script',
            no_iframe_tags: val => !/<iframe[^>]*>[\s\S]*?<\/iframe>/gi.test(val) || 'La cadena no debe contener etiquetas de iframe',
            no_js_event_handlers: val => !/on[a-z]+\s*=/i.test(val) || 'La cadena no debe contener controladores de eventos de JavaScript',
            no_sql_keywords: val => !/\b(?:SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)\b/i.test(val) || 'La cadena no debe contener palabras clave de SQL',
            no_php_tags: val => !/<\?php[^>]*>[\s\S]*?\?>/gi.test(val) || 'La cadena no debe contener etiquetas PHP',
            no_inline_styles: val => !/<style[^>]*>[\s\S]*?<\/style>/gi.test(val) || 'La cadena no debe contener estilos en línea',
            no_leading_slash: val => !/^\//.test(val) || 'La cadena no debe comenzar con una barra diagonal',
            no_trailing_slash: val => !/\/$/.test(val) || 'La cadena no debe finalizar con una barra diagonal',
            no_angularjs_expression: val => !/\{\{(.+?)\}\}/g.test(val) || 'La cadena no debe contener expresiones de AngularJS',
            no_leading_dots: val => !/^\.{1,2}\//.test(val) || 'La cadena no debe comenzar con puntos seguidos de una barra diagonal',
            no_file_protocol: val => !/^file:\/\//i.test(val) || 'La cadena no debe contener el protocolo "file://"',
            no_data_protocol: val => !/^data:/i.test(val) || 'La cadena no debe contener el protocolo "data:"',
            no_javascript_protocol: val => !/^javascript:/i.test(val) || 'La cadena no debe contener el protocolo "javascript:"',
            no_tel_protocol: val => !/^tel:/i.test(val) || 'La cadena no debe contener el protocolo "tel:"',
            no_hex_entities: val => !/&#x[0-9a-fA-F]+;/g.test(val) || 'La cadena no debe contener entidades hexadecimales',
            no_decimal_entities: val => !/&#\d+;/g.test(val) || 'La cadena no debe contener entidades decimales',
            no_multiline_comments: val => !/\/\*[\s\S]*?\*\//.test(val) || 'La cadena no debe contener comentarios multilínea',
    
    
            no_unicode_control_characters: val => !/[\u0000-\u001F\u007F-\u009F]/.test(val) || 'La cadena no debe contener caracteres de control Unicode',
            no_ipv4_addresses: val => !/\b(?:\d{1,3}\.){3}\d{1,3}\b/.test(val) || 'La cadena no debe contener direcciones IPv4',
            no_ipv6_addresses: val => !/\b(?:(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4})\b/.test(val) || 'La cadena no debe contener direcciones IPv6',
            no_email_addresses: val => !/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/.test(val) || 'La cadena no debe contener direcciones de correo electrónico',
            no_credit_card_numbers: val => !/\b(?:\d{4}-){3}\d{4}\b/.test(val) || 'La cadena no debe contener números de tarjeta de crédito',
            no_social_security_numbers: val => !/\b\d{3}-\d{2}-\d{4}\b/.test(val) || 'La cadena no debe contener números de seguro social',
            no_base64_encoded_data: val => !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(val) || 'La cadena no debe contener datos codificados en Base64',
            no_leading_hyphens: val => !/^-/.test(val) || 'La cadena no debe comenzar con un guion',
            no_trailing_hyphens: val => !/-$/.test(val) || 'La cadena no debe finalizar con un guion',
            no_leading_underscores: val => !/^_/.test(val) || 'La cadena no debe comenzar con un guion bajo',
            no_trailing_underscores: val => !/_$/.test(val) || 'La cadena no debe finalizar con un guion bajo',
            no_leading_colons: val => !/^:/.test(val) || 'La cadena no debe comenzar con dos puntos',
            no_trailing_colons: val => !/:$/.test(val) || 'La cadena no debe finalizar con dos puntos',
            no_leading_semicolons: val => !/^;/.test(val) || 'La cadena no debe comenzar con punto y coma',
            no_trailing_semicolons: val => !/;$/.test(val) || 'La cadena no debe finalizar con punto y coma',
            no_leading_question_marks: val => !/^\?/.test(val) || 'La cadena no debe comenzar con signo de interrogación',
            no_trailing_question_marks: val => !/\?$/.test(val) || 'La cadena no debe finalizar con signo de interrogación',
            no_multiple_whitespace: val => !/\s{2,}/.test(val) || 'La cadena no debe contener espacios en blanco múltiples',
            no_percent_encoding: val => !/%[0-9a-fA-F]{2}/.test(val) || 'La cadena no debe contener codificación de porcentaje',
            // no_reserved_uri_characters
    
            no_svg_tags: val => !/<svg[^>]*>[\s\S]*?<\/svg>/gi.test(val) || 'La cadena no debe contener etiquetas SVG',
            no_svg_script_tags: val => !/<script[^>]*>[\s\S]*?<\/script>/gi.test(val) || 'La cadena SVG no debe contener etiquetas de script',
            no_svg_external_resources: val => !/<(?:image|use)\s[^>]*?xlink:href\s*=\s*["']?[^"'>]+["']?[^>]*>/gi.test(val) || 'La cadena SVG no debe contener recursos externos',
            no_svg_data_uris: val => !/<(?:image|use)\s[^>]*?xlink:href\s*=\s*["']?data:[^"'>]+["']?[^>]*>/gi.test(val) || 'La cadena SVG no debe contener URI de datos',
            no_svg_inline_styles: val => !/<style[^>]*>[\s\S]*?<\/style>/gi.test(val) || 'La cadena SVG no debe contener estilos en línea',
            no_svg_js_event_handlers: val => !/on[a-z]+\s*=/i.test(val) || 'La cadena SVG no debe contener controladores de eventos de JavaScript',
            no_svg_foreign_objects: val => !/<foreignObject[^>]*>[\s\S]*?<\/foreignObject>/gi.test(val) || 'La cadena SVG no debe contener elementos "foreignObject"',
            no_svg_xmlns_xlink: val => !/\s+xmlns:xlink\s*=\s*["']?[^"'>]+["']?/i.test(val) || 'La cadena SVG no debe contener atributos "xmlns:xlink"',
            no_svg_version: val => !/\s+version\s*=\s*["']?[^"'>]+["']?/i.test(val) || 'La cadena SVG no debe contener atributos de versión',
            no_svg_doctype: val => !/<!DOCTYPE\s+svg[^>]*>/i.test(val) || 'La cadena SVG no debe contener DOCTYPE',
            no_svg_xml_declaration: val => !/<\?xml[^>]*\?>/i.test(val) || 'La cadena SVG no debe contener declaración XML',
            no_svg_comments: val => !/<!--[\s\S]*?-->/.test(val) || 'La cadena SVG no debe contener comentarios',
            no_svg_conditional_processing: val => !/<(?:switch|g)\s[^>]*?required(?:Extensions|Features|Formats|Fonts)\s*=\s*["']?[^"'>]+["']?[^>]*>/gi.test(val) || 'La cadena SVG no debe contener procesamiento condicional',
            no_svg_enable_background: val => !/\s+enable-background\s*=\s*["']?[^"'>]+["']?/i.test(val) || 'La cadena SVG no debe contener atributos "enable-background"',
            no_svg_overflow: val => !/\s+overflow\s*=\s*["']?[^"'>]+["']?/i.test(val) || 'La cadena SVG no debe contener atributos "overflow"',
            no_svg_clip_path: val => !/\s+clip-path\s*=\s*["']?[^"'>]+["']?/i.test(val) || 'La cadena SVG no debe contener atributos "clip-path"',
    
            has_svg_root: val => /<svg[^>]*>/i.test(val) || 'El SVG debe tener un elemento raíz',
            has_svg_title: val => /<title[^>]*>[\s\S]*?<\/title>/i.test(val) || 'El SVG debe tener un elemento de título',
            has_svg_desc: val => /<desc[^>]*>[\s\S]*?<\/desc>/i.test(val) || 'El SVG debe tener un elemento de descripción',
            has_svg_defs: val => /<defs[^>]*>[\s\S]*?<\/defs>/i.test(val) || 'El SVG debe tener un elemento de definiciones',
            has_svg_g: val => /<g[^>]*>[\s\S]*?<\/g>/i.test(val) || 'El SVG debe tener un elemento de grupo',
            has_svg_rect: val => /<rect[^>]*>[\s\S]*?<\/rect>/i.test(val) || 'El SVG debe tener un elemento de rectángulo',
            has_svg_circle: val => /<circle[^>]*>[\s\S]*?<\/circle>/i.test(val) || 'El SVG debe tener un elemento de círculo',
            has_svg_ellipse: val => /<ellipse[^>]*>[\s\S]*?<\/ellipse>/i.test(val) || 'El SVG debe tener un elemento de elipse',
            has_svg_line: val => /<line[^>]*>[\s\S]*?<\/line>/i.test(val) || 'El SVG debe tener un elemento de línea',
            has_svg_polyline: val => /<polyline[^>]*>[\s\S]*?<\/polyline>/i.test(val) || 'El SVG debe tener un elemento de polilínea',
            has_svg_polygon: val => /<polygon[^>]*>[\s\S]*?<\/polygon>/i.test(val) || 'El SVG debe tener un elemento de polígono',
            has_svg_path: val => /<path[^>]*>[\s\S]*?<\/path>/i.test(val) || 'El SVG debe tener un elemento de ruta',
            has_svg_text: val => /<text[^>]*>[\s\S]*?<\/text>/i.test(val) || 'El SVG debe tener un elemento de texto',
            has_svg_tspan: val => /<tspan[^>]*>[\s\S]*?<\/tspan>/i.test(val) || 'El SVG debe tener un elemento de tspan',
            has_svg_image: val => /<image[^>]*>[\s\S]*?<\/image>/i.test(val) || 'El SVG debe tener un elemento de imagen',
            has_svg_symbol: val => /<symbol[^>]*>[\s\S]*?<\/symbol>/i.test(val) || 'El SVG debe tener un elemento de símbolo',
            has_svg_use: val => /<use[^>]*>[\s\S]*?<\/use>/i.test(val) || 'El SVG debe tener un elemento de uso',
            has_svg_linearGradient: val => /<linearGradient[^>]*>[\s\S]*?<\/linearGradient>/i.test(val) || 'El SVG debe tener un elemento de degradado lineal',
            has_svg_radialGradient: val => /<radialGradient[^>]*>[\s\S]*?<\/radialGradient>/i.test(val) || 'El SVG debe tener un elemento de degradado radial',
            has_svg_marker: val => /<marker[^>]*>[\s\S]*?<\/marker>/i.test(val) || 'El SVG debe tener un elemento de marcador',
            has_svg_clipPath: val => /<clipPath[^>]*>[\s\S]*?<\/clipPath>/i.test(val) || 'El SVG debe tener un elemento de clipPath',
            has_svg_mask: val => /<mask[^>]*>[\s\S]*?<\/mask>/i.test(val) || 'El SVG debe tener un elemento de máscara',
            has_svg_pattern: val => /<pattern[^>]*>[\s\S]*?<\/pattern>/i.test(val) || 'El SVG debe tener un elemento de patrón',
            has_svg_view: val => /<view[^>]*>[\s\S]*?<\/view>/i.test(val) || 'El SVG debe tener un elemento de vista',
            has_svg_metadata: val => /<metadata[^>]*>[\s\S]*?<\/metadata>/i.test(val) || 'El SVG debe tener un elemento de metadatos',
            has_svg_switch: val => /<switch[^>]*>[\s\S]*?<\/switch>/i.test(val) || 'El SVG debe tener un elemento de interruptor',
            has_svg_a: val => /<a[^>]*>[\s\S]*?<\/a>/i.test(val) || 'El SVG debe tener un elemento de enlace',
            has_svg_feGaussianBlur: val => /<feGaussianBlur[^>]*>[\s\S]*?<\/feGaussianBlur>/i.test(val) || 'El SVG debe tener un elemento de desenfoque gaussiano',
    
    
    
            // no_svg_opacity
            
            is_valid_html: val => /^<!DOCTYPE html>((?!<!DOCTYPE html>)[\s\S])*?<\/html>$/i.test(val) || 'Debe ser un documento HTML válido',
            has_allowed_extensions: val => {
                const fileExtensions = val.match(/(\.[a-zA-Z0-9]+)+/g);
                return fileExtensions && options.allowed_extensions.some(ext => fileExtensions.includes(ext)) || `Debe tener alguna de las siguientes extensiones: ${options.allowed_extensions.join(', ')}`;
            },
            has_no_disallowed_extensions: val => {
                const fileExtensions = val.match(/(\.[a-zA-Z0-9]+)+/g);
                return fileExtensions && !options.disallowed_extensions.some(ext => fileExtensions.includes(ext)) || `No debe tener ninguna de las siguientes extensiones: ${options.disallowed_extensions.join(', ')}`;
            },
            // JSON object validation
            is_valid_json_object: val => {
                try {
                    JSON.parse(val);
                    return true;
                } catch (e) {
                    return 'Debe ser un objeto JSON válido';
                }
            },
        }
    
        return evals[target_rule];
    }
}