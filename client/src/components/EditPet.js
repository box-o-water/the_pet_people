import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Button, Alert } from "react-bootstrap";

import Auth from "../utils/auth";
import { EDIT_PET } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

const EditPetForm = ({ pet, handleEditPet, toggleEditForm }) => {
  const [showAlert, setShowAlert] = useState(false);

  // mutations, and queries
  const [editPet] = useMutation(EDIT_PET);
  const { loading } = useQuery(GET_ME);

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const [formData, setFormData] = useState({
    petName: pet.petName,
    animalType: pet.animalType,
    breed: pet.breed,
    size: pet.size,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const petName = formData.petName;
    const animalType = formData.animalType;
    const breed = formData.breed;
    const size = formData.size;
    const age = formData.age;
    const id = pet._id;
    console.log(id)
    await editPet(
      {
        variables: {
          id,
          petName,
          animalType,
          breed,
          size,
          age,
        },
      },
    );
    toggleEditForm();
  };
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (!token) {
    return <p>You must be logged in to update your profile.</p>;
  }
  return (
    <div>
      <Form onSubmit={handleFormSubmit}>
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
            value={formData.petName}
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
            value={formData.animalType}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="breed"></Form.Label>
          <Form.Control
            type="text"
            placeholder="Animal breed here"
            name="breed"
            onChange={handleInputChange}
            value={formData.breed}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="location">Animal Size</Form.Label>
          <Form.Select
            type="text"
            name="size"
            onChange={handleInputChange}
            value={formData.size}
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
            value={formData.age}
          />

        </Form.Group>

        <Button type="submit" variant="success">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditPetForm;
