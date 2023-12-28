const urls = {
  GET: 'https://29.javascript.pages.academy/kekstagram/data',
  POST: 'https://29.javascript.pages.academy/kekstagra',
};

const sendRequest = (onSuccess, onFail, method, body) =>{
  fetch (
    urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

export const loadData = (onSuccess, onFail, method = 'GET') => sendRequest(onSuccess, onFail, method);

export const uploadData = (onSuccess, onFail, method = 'POST', body) => sendRequest(onSuccess, onFail, method, body);
