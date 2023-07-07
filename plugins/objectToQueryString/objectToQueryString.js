const objectToQueryString = (initialObj) => {

  const reducer = (obj, parentPrefix = null) => (prev, key) => {
    const val = obj[key];
    const isArrayElement = Array.isArray(obj);
    key = encodeURIComponent(key);
    const prefix = parentPrefix ? (isArrayElement ? `${parentPrefix}[]` : `${parentPrefix}[${key}]`) : key;

    if (val == null || typeof val === 'function') {
      prev.push(`${prefix}=`);
      return prev;
    }

    if (['number', 'boolean', 'string'].includes(typeof val)) {
      prev.push(`${prefix}=${encodeURIComponent(val)}`);
      return prev;
    }

    prev.push(Object.keys(val).reduce(reducer(val, prefix), []).join('&'));
    return prev;
  };

  return Object.keys(initialObj).reduce(reducer(initialObj), []).join('&');

}


export default objectToQueryString;