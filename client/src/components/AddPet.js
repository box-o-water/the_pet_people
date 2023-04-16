import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PET } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const AddPet = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    petName: "",
    animalType: "",
    breed: "",
    age: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addPet] = useMutation(ADD_PET);
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
      const petName = userFormData.petName;
      const animalType = userFormData.animalType;
      const breed = userFormData.breed;
      const size = userFormData.size;
      const age = userFormData.age;
      console.log(animalType);
      const { data } = await addPet(
        {
          variables: {
            petName,
            animalType,
            breed,
            size,
            age,
          },
        },
        { userData }
      );

      Auth.getProfile(data.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    event.persist();
    // on submit send user to their profile
    window.location.href = "/profile";
  };

  return (
    <>
      <p>Hey {userData?.me.username}, You got a new animal, That's Amazing!</p>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong while we were adding your adorable animal, we are
          currently working on fixing this.
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="petName">What's Your Pet's Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your petName"
            name="petName"
            onChange={handleInputChange}
            value={userFormData.petName}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="animalType">
            What type of animal do you have (Cat, Dog, Bird, Lizard, snake,
            etc...)
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter animal type"
            name="animalType"
            onChange={handleInputChange}
            value={userFormData.animalType}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="breed"></Form.Label>
          <Form.Control
            type="text"
            placeholder="Animal breed here"
            name="breed"
            onChange={handleInputChange}
            value={userFormData.breed}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="location">Animal Size</Form.Label>
          <Form.Select
            type="text"
            name="size"
            onChange={handleInputChange}
            value={userFormData.size}
          >
            <option value="">-- What size is your animal --</option>
            <option value="Extra-Small">Extra-Small (under 5 pounds)</option>
            <option value="Small">Small (5-25 pounds)</option>
            <option value="Medium">Medium (26-60 pounds)</option>
            <option value="Large">Large (61-100 pounds)</option>
            <option value="Extra-Large">Extra-Large (101 pounds+) </option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="age">Year:</Form.Label>
          <Form.Control
            type="date"
            max={new Date().getFullYear()}
            name="age"
            onChange={handleInputChange}
            value={userFormData.age}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddPet;
