import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_QUOTES } from "../gql-operations/queries";
import {Link} from "react-router-dom"
export default function Home() {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  if (loading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  if (error) {
    console.log(error.message);
  }
  if (!data.quotes.length)
    return (
      <div className="container center">
        <h3>No Quotes Available</h3>
      </div>
    );
  return (
    <div className="container my-container">
      {data.quotes.map((quote) => {
        return (
          <blockquote key={quote._id}>
            <h6>{quote.name}</h6>
            <Link to={`/profile/${quote.by._id}`}>
              <p className="right-align">~{quote.by.firstName}</p>
            </Link>
          </blockquote>
        );
      })}
    </div>
  );
}
