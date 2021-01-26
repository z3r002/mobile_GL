import AsyncStorage from '@react-native-async-storage/async-storage';

const Network = async (url, method, body) => {
  const token = await AsyncStorage.getItem('token');
  //const token = localStorage.getItem('token');   ?access_token=${token}
  console.log('fetch', url, method);

  return fetch(
    `http://172.20.10.5:3000/api/${url}${
      token ? `?access_token=${token}` : ''
    }`,
    {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    },
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error(error);
    });
};
export default Network;
