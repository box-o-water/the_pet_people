import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const UpdateProfile = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    location: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [updateUser] = useMutation(UPDATE_USER);
  const { loading, data: userData } = useQuery(GET_ME);
  // check if user is authenticated
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (!token) {
    return <p>You must be logged in to update your profile.</p>;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.persist();
      event.stopPropagation();
    }

    try {
      const username = userFormData.username;
      const email = userFormData.email;
      const location = userFormData.location;

      const { data } = await updateUser({
        variables: {
          username,
          email,
          location,
        },
      });

      Auth.getProfile(data.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
      return;
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
      location: "",
    });

    event.persist();
    // on submit reloads page
    window.location.reload();
  };

  return (
    <>
    <div className="m-2">
      <p>
        Hey {userData?.me.username} What would you like to update about your
        profile!
      </p>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with updating your profile!
        </Alert>

        <Form.Group  className="font-semibold">
          <Form.Label htmlFor="username">new username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="new username here"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
          />
        </Form.Group>

        <Form.Group  className="font-semibold">
          <Form.Label htmlFor="email">change your email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="example@example.com"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
          />
        </Form.Group>

        <Form.Group className="font-semibold">
          <Form.Label htmlFor="location">
            where are you looking to move to. (only city and state, please){" "}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="only City and state, please"
            name="location"
            onChange={handleInputChange}
            value={userFormData.location}
          />
        </Form.Group>

        <button 
        type="submit" 
        variant="success"
        className="ml-4 bg-slate-50 hover:bg-cyan-700 rounded-md px-3 py-1 text-rose-600 hover:text-slate-50 border-solid border-slate-300 border-2"
        >
          submit
        </button>
      </Form>
      </div>
    </>
  );
};

export default UpdateProfile;
