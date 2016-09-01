const nonEmptyKeys = object => {
  return Object.keys(object).filter(k => !!object[k]);
};

export const isEmpty = object => {
  return nonEmptyKeys(object).length === 0;
};

/**
 * NOTE: Is encodeURIComponent definitely the one we want here?
 */
export const buildQueryString = object => {
  const pairs = nonEmptyKeys(object).reduce((arr, key) => {
    const value = (key === 'cc' || key === 'bcc')
      ? object[key]
      : encodeURIComponent(object[key]);

    return [ ...arr, `${key}=${value}` ];
  }, []);

  return '?' + pairs.join('&');
};

export const mailTo = (address = '', options = {}) => {
  const queryString = isEmpty(options) ? '' : buildQueryString(options);
  return 'mailto:' + address + queryString;
};
