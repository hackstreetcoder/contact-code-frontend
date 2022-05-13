import React, { useState } from "react";
import Username from "../components/Username";
import Email from "../components/Email";
import Password from "../components/Password";
import ConfirmPassword from "../components/ConfirmPassword";
import { post } from "../authService/authService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let [username, setUsername] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [password, setPassword] = React.useState("");
  let [confirmPassword, setConfirmPassword] = React.useState("");
  let [errormessage, setErrormessage] = React.useState("");

  const navigate = useNavigate();

  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  function checkError(e) {
    e.preventDefault();
    if (username.length < 4) {
      setErrormessage("username must be at least four characters");
    } else if (password.length < 6) {
      setErrormessage("password must be at least 6 characters");
    } else if (password === "password") {
      setErrormessage("your password can't be 'password'");
    } else if (password !== confirmPassword) {
      setErrormessage("your password didn't match");
    } else if (!regexExp.test(email)) {
      setErrormessage("that is not a valid email address");
    } else {
      setErrormessage(`Welcome ${username}!`);
      post("/users/signup", {
        username: username,
        password: password,
      })
        .then((results) => {
          console.log("Results", results.data.token);
          localStorage.setItem("authToken", results.data.token);
          navigate("/");
        })
        .catch((err) => {
          console.log("Something went wrong", err.message);
        });
    }
  }

  return (
    <div>
      <form onSubmit={checkError}>
        <Username setUsername={setUsername} />
        <Email setEmail={setEmail} />
        <Password setPassword={setPassword} />
        <ConfirmPassword setConfirmPassword={setConfirmPassword} />

        <button>Submit</button>

        <p>{errormessage}</p>
      </form>
    </div>
  );
};

export default Signup;