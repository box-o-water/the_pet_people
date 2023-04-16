import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
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
      const img = userFormData.img;
      const location = userFormData.location;

      const { data } = await updateUser({
        variables: {
          username,
          email,
          img,
          location,
        },
      });

      Auth.getProfile(data.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
      img: "",
      location: "",
    });

    event.persist();
    // on submit send user to their profile
    window.location.href = '/profile';
  };

  return (
    <>
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

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="img">Profile Image</Form.Label>
          <Form.Control
            type="file"
            placeholder="Only City and state"
            name="image"
            onChange={handleInputChange}
            value={userFormData.img}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="location">
            Where are you looking to move to. (only city and state){" "}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Only City and state"
            name="location"
            onChange={handleInputChange}
            value={userFormData.location}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UpdateProfile;
