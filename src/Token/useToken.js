import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    // const tokenString = sessionStorage.getItem('token');
    const tokenString = localStorage.getItem("user_info");
    const userToken = JSON.parse(tokenString);
    if (userToken !== null) {
      // console.log("getToken() : ", Object.values(userToken));
    }

    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    // sessionStorage.setItem('token', JSON.stringify(userToken));

    localStorage.setItem("user_info", JSON.stringify(userToken));
    console.log("userToken() : ", userToken);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    getToken: getToken,
    token,
  };
}
