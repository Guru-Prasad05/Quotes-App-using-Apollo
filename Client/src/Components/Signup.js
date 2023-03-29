import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_USER } from "../gql-operations/muatations";
export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  console.log(data);
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
    console.log(formData);
    signupUser({
      variables: { usernew: formData },
    });
  };
  return (
    <div className="container my-container">
      {error && (
        <div
          className="red card-panel"
          style={{ fontSize: "1.2rem", color: "white" }}
        >
          {error.message}
        </div>
      )}
      {data && data.user && (
        <div
          className="green card-panel"
          style={{ fontSize: "1.2rem", color: "white" }}
        >{`Welcome ${data.user.firstName}, now you can Login`}</div>
      )}
      <h5>Signup!!</h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={handleChange}
          required
        />
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
        <Link to="/login">
          <p>Alredy have an account ??</p>
        </Link>
        <button type="submit" className="btn #673ab7 deep-purple">
          Submit
        </button>
      </form>
    </div>
  );
}
