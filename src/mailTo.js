export const isEmpty = object => {
  return Object.keys(object).length === 0;
};

export const buildQueryString = object => {
  const pairs = Object.keys(object).reduce((arr, key) => {
    return [ ...arr, `${key}=${object[key]}` ];
  }, []);

  return '?' + pairs.join('&');
};

export const mailTo = (address = '', options = {}) => {
  const queryString = isEmpty(options) ? '' : buildQueryString(options);
  return 'mailto:' + address + queryString;
};
