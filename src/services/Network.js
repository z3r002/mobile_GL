import AsyncStorage from '@react-native-async-storage/async-storage';

const Network = async (url, method, body) => {
  const token = await AsyncStorage.getItem('token');
  //const token = localStorage.getItem('token');   ?access_token=${token}

  return fetch(
    `http://192.168.0.103:3000/api/${url}?access_token=PZvLDUptdviTDaB7Ee0JmmtJcsBcW8LO4beHflHAehFETaK2mCnFt2dBGMuOQFPv`,
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
