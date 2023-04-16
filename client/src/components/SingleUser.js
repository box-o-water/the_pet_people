import React from "react";
import { useParams } from "react-router-dom";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const SingleUser = () => {
  let { username } = useParams();

  // use useQuery to get logged in user's data
  const { loading, data: userData } = useQuery(QUERY_USER, {
    variables: { username: username },
  });
  const pets = userData?.me.pets || [];
  console.log(userData);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div>
      <a href="/update-profile"> Update Profile</a>
      <div>
        <a href="/add-pet">Add Pet</a>
      </div>

      <h2>profile</h2>
      <p>Name: {userData?.user.username}</p>
      <p>Email: {userData?.user.email}</p>
      <img
        src="https://i.guim.co.uk/img/media/e4ae055cd7e0b946e216e2a43a97fcf085c364e6/463_41_2032_1219/master/2032.jpg?width=645&quality=45&dpr=2&s=none"
        width="150"
        alt="cat lady"
      ></img>
      <p>Location (City, State): {userData?.user.location}</p>
      <div>
        <h3>pets are people, too</h3>
        {pets &&
          pets.map((pet) => (
            <div key={pet._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                {pet.petName}
              </h4>
              <div className="card-body bg-light p-2">
                <p>{pet.breed}</p>
                <p>{pet.size}</p>
              </div>
            </div>
          ))}
      </div>
      <h2>reviews:</h2>
      <p>Review Title:</p>
      <p>review body</p>
    </div>
  );
};

export default SingleUser;
