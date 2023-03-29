import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gql-operations/muatations";

export default function Login() {
  const [loginuser, { data, loading, error }] = useMutation(LOGIN_USER,{
    onCompleted(data){
      localStorage.setItem("token", data.user.token);
      navigate("/");
    }
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  if (loading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginuser({
      variables: {
        userSignin: formData,
      },
    });
  };
  return (
    <div className="container my-container">
      {error && (
        <div
          className="red card-panel"
          style={{ fontSize: "1.2rem", color: "white" }}
        >
          Username or Password is invalid
        </div>
      )}
      <h5>Login!!</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="email"
          placeholder="e-mail"
          name="email"
          onChange={handleChange}
          id="email"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Link to="/signup">
          <p>Don't have an account ??</p>
        </Link>
        <button type="submit" className="btn #673ab7 deep-purple">
          Login
        </button>
      </form>
    </div>
  );
}
