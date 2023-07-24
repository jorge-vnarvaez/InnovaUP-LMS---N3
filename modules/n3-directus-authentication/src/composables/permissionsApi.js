import { useRuntimeConfig } from '#app'
import axios from 'axios'

const getApiUrl = async () => {
    const { DIRECTUS_AUTHENTICATION_URL } = await useRuntimeConfig().public.directusAuth;
    return DIRECTUS_AUTHENTICATION_URL;
}

const directus_my_access = async ({
    // Access
    token=null,
    url= null,
    // Arbitrary
    user_id=null,
    // Debug
    debug=false,
}) => {
    
    const { access_token }              = authStore()
    const DIRECTUS_AUTHENTICATION_URL   = await getApiUrl();

    token = token || access_token.value
    url = url || DIRECTUS_AUTHENTICATION_URL


    const target_debug          = (debug === true || debug === 'true') ? true : false;
    const user_id_filter        = (user_id && user_id.length > 0) ?
                                    {
                                        role: {
                                        users:{ 
                                            _eq: user_id 
                                        } 
                                        } 
                                    } : {}


    return new Promise((resolve) => {
        
        axios.get(`${url}/permissions`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            filter: {
                ...user_id_filter,
            }
        }
        }).then(function (response) {
            const permissions = response.data.data
            const permissions_names = permissions.map(permission => [permission.collection, permission.action])
            resolve(permissions_names)
        }).catch(function (error) {
            resolve(target_debug ? error : false)
        });
    })
}


const directus_my_roles = async({
    // Access
    url=null,
    token=null,
    // Arbitrary
    user_id=null,
    // Debug
    debug=false,
}) => {
    const target_debug = (debug === true || debug === 'true') ? true : false;
    const { access_token }              = authStore()
    const DIRECTUS_AUTHENTICATION_URL   = await getApiUrl();

    token = token || access_token.value
    const targetUrl = url || DIRECTUS_AUTHENTICATION_URL



    const user_id_filter        = (user_id && user_id.length > 0) ?
                                    {
                                        users:{ 
                                            _eq: user_id 
                                        }    
                                    } : {}

    return new Promise((resolve) => {

        axios.get(`${targetUrl}/roles`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
            filter: {
                ...user_id_filter,
            }
        }
        }).then(function (response) {

            const roles = [...response.data.data]
            roles.push({name:'Public'})
            const roles_names = roles.map(role => role.name)
            if(target_debug) resolve(roles)
            resolve (roles_names)

        }).catch(function (error) {

            if(target_debug) resolve(error)
            resolve(false)
            
        });

    })
}


const directus_is_role = async ({
    // Base
    role = null, // string or array
    // Access
    url = null,
    token = null,
    strict = true,
    return_match = false,
    // Arbitrary
    user_id = null,
    // Debug
    debug = false,
}) => {
    const target_debug = (debug === true || debug === 'true') ? true : false;
    const { access_token }              = authStore()
    const DIRECTUS_AUTHENTICATION_URL   = await getApiUrl();

    token = token || access_token.value
    url = url || DIRECTUS_AUTHENTICATION_URL


    if (role && typeof(role) === 'string') role = [role];

    const myRoles = await directus_my_roles({ url, token, user_id });

    const roleIntersection = myRoles.filter(myRole => role.includes(myRole));

    if (target_debug) {
        return roleIntersection;
    }

    return roleIntersection.length > 0;
};

const directus_is_author = async({
    // Base
    collection = null,
    author_key = 'user_created',
    id = null,
    id_key = 'id',
    user_id = null,
    // Access
    url = null,
    token = null,
    strict = true,
    // Arbitrary
    // Debug
    debug = false,
}) => {
    const target_debug = (debug === true || debug === 'true') ? true : false;

    const { access_token }              = authStore()
    const DIRECTUS_AUTHENTICATION_URL   = await getApiUrl();

    token = token || access_token.value
    url = url || DIRECTUS_AUTHENTICATION_URL

    return new Promise((resolve) => {
        let filter = {
            [author_key]: {
                _eq: user_id ? user_id : '$CURRENT_USER',
            },
            [id_key]: {
                _eq: id,
            },
        };

        if (target_debug) {
        }

        axios
            .get(`${url}/items/${collection}`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    filter: filter,
                },
            })
            .then(function (response) {
                if (target_debug) {
                }

                if (response.data && response.data.data && response.data.data.length > 0) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(function (error) {
                if (target_debug) {
                    console.error('Error fetching items:', error);
                }
                resolve(false);
            });
    });
};


const directus_can_access = async ({
    maps = [],
    operator = AND,
    url = null,
    token = null,
    strict = true,
    user_id = null,
    return_match = false,
    debug = false,
    test_db = false,
}) => {
    const targetDebug = debug === true || debug === 'true';

    const { access_token }              = authStore()
    const DIRECTUS_AUTHENTICATION_URL   = await getApiUrl();

    token = token || access_token.value
    url = url || DIRECTUS_AUTHENTICATION_URL

    const mapsWithContainer = maps.map(data_map => [...data_map, [], false]);

    const intersectionBetweenArrays = (a, b) => {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            return [];
        }
        const s = new Set(b);
        return a.filter(x => s.has(x));
    };

    const myRoles = await directus_my_roles({ url, token });
    if (Array.isArray(myRoles) && myRoles.includes('Administrator')) return true;

    return new Promise((resolve, reject) => {
        axios
            .get(`${url}/permissions`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    filter: {
                        role: {
                            _eq: '$CURRENT_ROLE',
                        },
                    }
                },
            })
            .then(response => {
                const permissions = response.data.data;

                mapsWithContainer.forEach((data_map, index) => {
                    const fields_data_map_length = data_map[2].length;

                    mapsWithContainer[index][4] = permissions.filter(permission => {
                        const fields_intersection = permission?.fields && permission.fields[0] === '*' ? data_map[2] : intersectionBetweenArrays(permission.fields, data_map[2]);
                        const fields_intersection_length = fields_intersection.length;

                        return (
                            data_map[0] === permission.action &&
                            data_map[1] === permission.collection &&
                            (
                                (data_map[3].toLowerCase() === AND && (fields_intersection_length === fields_data_map_length || (permission?.fields && permission.fields[0] === '*'))) ||
                                (data_map[3].toLowerCase() === OR && (fields_intersection_length > 0 || (permission?.fields && permission.fields[0] === '*')))
                            )
                        );
                    });

                    mapsWithContainer[index][5] = mapsWithContainer[index][4].length > 0;
                });

                if (targetDebug) resolve(mapsWithContainer);
                if (operator.toLowerCase() === AND) resolve(mapsWithContainer.every(data_map => data_map[5] === true));
                if (operator.toLowerCase() === OR) resolve(mapsWithContainer.some(data_map => data_map[5] === true));
            })
            .catch(error => {
                reject(error);
            });
    });
};

export function permissionsApi() {
    return {
        directus_my_access,
        directus_my_roles,
        directus_is_role,
        directus_is_author,
        directus_can_access,
    }
}