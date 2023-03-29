import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_USER_BY_ID } from "../gql-operations/queries";

export default function OtherUserProfile() {
    const { userid } = useParams();
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { userid },
  });
  console.log(data);
 
  if (error) {
    console.log(error.message);
  }

  if (loading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${data.user.firstName}.png?size=200x200`}
          alt="Profile Pic"
        />
        <h5>
          {data.user.firstName}
          {data.user.lastName}
        </h5>
        <h6>E-mail - {data.user.email}</h6>
      </div>
      <h3>
        {data.user.quotes.map((quote) => {
          return (
            <blockquote key={quote._id}>
              <h6>{quote.name}</h6>
            </blockquote>
          );
        })}
      </h3>
    </div>
  );
}
