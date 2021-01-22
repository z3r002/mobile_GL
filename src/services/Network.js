const Network = async (url, method, body) => {
  //const token = localStorage.getItem('token');   ?access_token=${token}

  return fetch(`http://192.168.0.103:3001/api/${url}`, {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
};
export default Network;
