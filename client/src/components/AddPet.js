import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PET } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

const AddPet = () => {
  // set initial form state
  const [petFormData, setPetFormData] = useState({
    petName: "",
    animalType: "",
    breed: "",
    age: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // mutations, and queries
  const [addPet] = useMutation(ADD_PET);
  const { loading, data: userData } = useQuery(GET_ME);
  // check if user is authenticated
  const token = Auth.loggedIn() ? Auth.getToken() : null;


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetFormData({ ...petFormData, [name]: value });
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
      const petName = petFormData.petName;
      const animalType = petFormData.animalType;
      const breed = petFormData.breed;
      const size = petFormData.size;
      const age = petFormData.age;

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
      return;
    }

    event.persist();
    // on submit reloads page
    window.location.reload();
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (!token) {
    return <p>you must be logged in to update your profile.</p>;
  }
  return (
    <>
      <p>hey {userData?.me.username}, you got a new animal - that's amazing!</p>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          make sure to fill out all the inputs in this form. we're excited to meet your amazing friend!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="petName">what's your pet's name?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your petName"
            name="petName"
            onChange={handleInputChange}
            value={petFormData.petName}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="animalType">
            what type of animal do you have? (cat, dog, bird, lizard, snake,
            etc...)
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter animal type"
            name="animalType"
            onChange={handleInputChange}
            value={petFormData.animalType}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="breed"></Form.Label>
          <Form.Control
            type="text"
            placeholder="Animal breed here"
            name="breed"
            onChange={handleInputChange}
            value={petFormData.breed}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="location">Animal Size</Form.Label>
          <Form.Select
            type="text"
            name="size"
            onChange={handleInputChange}
            value={petFormData.size}
            required
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
          <Form.Label htmlFor="age">approx birthday</Form.Label>
          <Form.Control
            type="date"
            max={new Date().getFullYear()}
            name="age"
            onChange={handleInputChange}
            value={petFormData.age}
            required
            isInvalid={!petFormData.age}
          />
          <Form.Control.Feedback type="invalid">
            please enter a valid year.
          </Form.Control.Feedback>
        </Form.Group>

        <button 
        type="submit" 
        variant="success"
        className="ml-4 bg-slate-50 hover:bg-cyan-700 rounded-md px-3 py-1 text-rose-600 hover:text-slate-50 border-solid border-slate-300 border-2">
          submit
        </button>
      </Form>
    </>
  );
};

export default AddPet;
