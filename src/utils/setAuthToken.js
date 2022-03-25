import axios from 'axios';

const setAuthToken = accessToken => {
  if (accessToken) {
    return (axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`);
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
