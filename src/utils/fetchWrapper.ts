// import { jwtVerify } from "jose";
// Get a cookie
export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};
// function getCookie(cname) {}
// async function verify(text) {
//   return await jwtVerify(
//     text,
//     new TextEncoder().encode(process.env.secretTokenJWT)
//   );
// }

function get(url: RequestInfo, token: String ='') {
  const requestOptions = {
    method: "GET",
    headers: authHeader(token),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: RequestInfo, body: any, token: String) {
  let requestOptions = {};
    requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    };

  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body, token) {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse).catch((e)=>console.log(e));
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, token) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function authHeader(token: String) {
  // return auth header with jwt if user is logged in and request is to the api url
  // const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

function handleResponse(response: { text: () => Promise<any>; ok: any; statusText: any; }) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
