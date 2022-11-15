// const axios = require('axios');

// const axiosAuth = axios.create();

// axiosAuth.interceptors.request.use((req) => {
//   console.log('method & url', `${req.method} ${req.url}`);
//   // Important: request interceptors **must** return the request.
//   return req;
// });

// axiosAuth.interceptors.response.use((res) => {
//   console.log(res.data.json);
//   // Important: response interceptors **must** return the response.
//   return res;
// });

// export { axiosAuth };

// import axios from 'axios';

// export const axios = axios.create();

// axios.interceptors.request.use(
//   async function (config) {
//     const token = localStorageService.getAccessToken();
//     if (token) {
//       config.headers['Authotization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   async function (config) {
//     return config;
//   },
//   (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && originalRequest.url === `${API}refresh`) {
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorageService.getRefreshToken();
//       const user = localStorageService.getUser();
//       return axios
//         .post(`${API}refresh`, {
//           email: user.email,
//           refreshToken: refreshToken,
//         })
//         .then((res) => {
//           if (res.status === 201) {
//             localStorageService.setToken(res.data.accessToken);
//             axios.defaults.headers.common['Authorization'] =
//               'Bearer ' + localStorageService.getAccessToken();
//             return axios(originalRequest);
//           }
//         });
//     }
//     return Promise.reject(error);
//   }
// );
