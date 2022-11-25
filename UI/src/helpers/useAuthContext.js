import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { Navigate, Route } from 'react-router';

const axiosWithAuth = axios.create();

export const AuthContext = createContext({
  //initial context data
  isLoading: true,
});

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [userProfile, setUserProfile] = useState();

  axiosWithAuth.interceptors.request.use(
    async (request) => {
      console.log('request :>> ', request);
      if (accessToken) {
        request.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return request;
    },
    (error) => {
      console.log('NOT authorized');
      return Promise.reject(error);
    }
  );

  axiosWithAuth.interceptors.response.use(
    async ({ data = {}, ...response }) => {
      //isolating data and the rest of the response from each other and saving to their own seperate variables
      const { accessToken, refreshToken, ...moreData } = data; // isolating access/refresh token from the rest of the data, saving them each in their own variable
      const hasData = Object.keys(moreData).length > 0; // check if there is other properties inseide moreData & setting those properites from the response to their own variable

      response?.status === 200 && accessToken && setAccessToken(accessToken); //

      return {
        ...response, // returning the rest of the restpones - without data
        ...(hasData && { data: moreData }), // if there are more properties inside hasData, return them as an object with the key data
      };
    },
    (error) => {
      console.log('error.config :>> ', error.config);
      // const { config } = error;

      // if (error.response.status === 401 && config.url === `${API}refresh`) {
      //   return Promise.reject(error);
      // }

      // if (error.response.status === 401 && !originalRequest._retry) {
      //   originalRequest._retry = true;
      //   const refreshToken = localStorageService.getRefreshToken();
      //   const user = localStorageService.getUser();
      //   return axios
      //     .post(`${API}refresh`, {
      //       email: user.email,
      //       refreshToken: refreshToken,
      //     })
      //     .then((res) => {
      //       if (res.status === 201) {
      //         setAccessToken(res.data.accessToken);
      //         axios.defaults.headers.common['Authorization'] =
      //           'Bearer ' + res.data.accessToken;
      //         return axios(originalRequest);
      //       }
      //     });
      // }
      return Promise.reject(error);
    }
  );

  const data = {
    axiosWithAuth,
    userProfile,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const providerData = useContext(AuthContext);

  return {
    ...providerData,
  };
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {({ authorize, checkAuth }) => {
      let content = '';

      if (authorize) {
        content = <Route render={(props) => <Component {...props} />} {...rest} />;
      } else if (checkAuth && !authorize) {
        console.log('You must be login');
        content = <Navigate to="/" />;
      }
      return content;
    }}
  </AuthContext.Consumer>
);
