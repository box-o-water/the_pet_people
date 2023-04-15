import React from "react";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  // use useQuery to get logged in user's data
  const { loading, data: userData } = useQuery(GET_ME);

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

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
      <p>Name: {userData?.me.username}</p>
      <p>Email: {userData?.me.email}</p>
      <img
        src="https://i.guim.co.uk/img/media/e4ae055cd7e0b946e216e2a43a97fcf085c364e6/463_41_2032_1219/master/2032.jpg?width=645&quality=45&dpr=2&s=none"
        width="150"
        alt="cat lady"
      ></img>
      <p>Location (City, State): {userData?.me.location}</p>
      <h2>pets:</h2>
      <p>pet1</p>
      <p>pet2</p>
      <h2>reviews:</h2>
      <p>Review Title:</p>
      <p>review body</p>
    </div>
  );
};

// function Profile() {
//   return (
//     <div>
//       <h2>profile</h2>
//       <img src="https://i.guim.co.uk/img/media/e4ae055cd7e0b946e216e2a43a97fcf085c364e6/463_41_2032_1219/master/2032.jpg?width=645&quality=45&dpr=2&s=none" width="500" alt="cat lady"></img>
//       <p>Name:</p>
//       <p>Location (City, State):</p>
//       <h2>pets:</h2>
//       <p>pet1</p>
//       <p>pet2</p>
//       <h2>reviews:</h2>
//       <p>Review Title:</p>
//       <p>review body</p>
//     </div>
//   );
// }

export default Profile;
