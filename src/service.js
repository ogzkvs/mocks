import settings from './settings';

const get = query => {
  return fetch(settings.api + query, {
    method: 'GET',
  }).then(response => {
    return response.json();
  });
};

const postProduct = (endpoint, data) => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow',
  };
  return fetch(settings.api + endpoint, requestOptions).then(response =>
    response.json(),
  );
};

export {get, postProduct};
