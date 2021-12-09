export default (url, options) => {
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };
  return fetch(url, fetchOptions).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw res;
  });
};
