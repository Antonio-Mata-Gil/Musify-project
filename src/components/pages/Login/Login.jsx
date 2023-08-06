import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useContext } from "react-router-dom";
import Global from "../../core/Global/global";
import "../Login/login.css";
import { TokenContext } from "../../../context/tokenContext";

const baseUrl = `https://accounts.spotify.com/authorize?client_id=${Global.client_id}&response_type=code&redirect_uri=${Global.redirect_uri}&scope=${Global.scopes}`;

const Login = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotyCode = urlParams.get("code");
    if (spotyCode) {
      autenticateUser(spotyCode);
    }
  });

  const autenticateUser = (spotyCode) => {
    try {
      const searchParams = new URLSearchParams({
        code: spotyCode,
        grant_type: "authorization_code",
        redirect_uri: Global.redirect_uri,
        client_id: Global.client_id,
        client_secret: Global.client_secret,
      });

      axios
        .post("https://accounts.spotify.com/api/token", searchParams)
        .then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);

          window.location.href = "/"

        })
    } catch (error) {
    }
  };

  function login() {
    window.location.replace(baseUrl);


  }

  return (
    <div className="general">
      <div className="login-container">
        <div className="box-login">
          <h1 className="subtitle">Login</h1>
          <p>Inicia sesión con tu cuenta de Spotify para acceder</p>
          <button onClick={login} className="btnLogin">
            INICIAR SESION
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;