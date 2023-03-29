import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_QUOTE } from "../gql-operations/muatations";


export default function CreateQuote() {
  const [quote, setQuote] = useState("");
  const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE,{
    refetchQueries:[
      "getAllQuotes",
      "getMyProfile"
    ]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        name: quote,
      },
    });
  };
  if (loading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  if (error) {
    console.log(error);
  }

  return (
    <div className="container my-container">
      {data && <div className="green card-panel">{data.quote}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="quote"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Write your quote here"
        />
        <button className="btn green">Create</button>
      </form>
    </div>
  );
}
