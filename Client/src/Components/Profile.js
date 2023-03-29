import { useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_PROFILE } from "../gql-operations/queries";
import "../App.css";
import { UPDATE_QUOTE, DELETE_QUOTE } from "../gql-operations/muatations";

export default function Profile() {
  const [isActive, setActive] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [quote, setQuote] = useState("");
  const [oldQuote, setOldQuote] = useState("");
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(USER_PROFILE, {
    fetchPolicy: "no-cache",
  });

  const [updateQuote, { updatedData }] = useMutation(UPDATE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
  });

  const [deleteQuote, { deletedData }] = useMutation(DELETE_QUOTE, {
    refetchQueries: ["getAllQuotes", "getMyProfile"],
  });

  if (!localStorage.getItem("token")) {
    navigate("/login");
    return <h1>Unauthorized</h1>;
  }
  if (error) {
    console.log(error.message);
  }

  if (loading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  const handleEditQuote = (e) => {
    const result = data.user.quotes.find(
      (quote) => quote._id === e.target.value
    );
    setOldQuote(() => result.name);
    setQuote(() => result.name);
    setActive(true);
    setShowMessage(false);
  };

  const handleUpdate = (e) => {
    setQuote(e.target.value);
  };

  const handleUpdatedData = (e) => {
    e.preventDefault();
    updateQuote({
      variables: {
        input: {
          name: oldQuote,
          value: quote,
        },
      },
    });
    setActive(false);
    setShowMessage(true);
  };

  const handleDelete = (e) => {
    deleteQuote({
      variables: {
        id: e.target.value,
      },
    });
    // return <p>Deleted Successfully</p>
  };

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
      <div className={isActive ? "active" : "inactive"}>
        <form onSubmit={handleUpdatedData}>
          <input type="text" onChange={handleUpdate} value={quote} />
          <button type="submit" className="btn">
            Save
          </button>
        </form>
      </div>
      {showMessage ? (
        <p className="green card-panel">
          Data updated successfully
          <button
            onClick={() => {
              setShowMessage(false);
            }}
            className=" green right"
          >
            x
          </button>
        </p>
      ) : (
        ""
      )}

      <h3>
        {data.user.quotes.map((quote, ind) => {
          return (
            <blockquote key={quote._id}>
              <h6>{quote.name}</h6>
              <div
                key={quote._id}
                style={{ display: "flex", flexDirection: "row", gap: ".5rem" }}
              >
                <button
                  value={quote._id}
                  className="btn #673ab7 deep-purple"
                  onClick={handleEditQuote}
                >
                  Edit
                </button>
                <button
                  value={quote._id}
                  className="btn red"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </blockquote>
          );
        })}
      </h3>
    </div>
  );
}
