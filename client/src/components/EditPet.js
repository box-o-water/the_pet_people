import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Form, Alert } from "react-bootstrap";

import Auth from "../utils/auth";
// import { UPDATE_PET } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

const EditPetForm = ({ pet, toggleEditForm, editPet}) => {
  const [showAlert, setShowAlert] = useState(false);

  // mutations, and queries
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


    await editPet(
      {
        variables: {
          petName,
          animalType,
          breed,
          size,
          age,
          id: pet._id.toString(),
        },
      });
      
      toggleEditForm();
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (!token) {
    return <p>you must be logged in to update your profile.</p>;
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
          something went wrong while we were adding your adorable animal, we are
          currently working on fixing this.
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="petName">what's your pet's name</Form.Label>
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
            what type of animal do you have? (cat, dog, bird, lizard, snake,
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
          <Form.Label htmlFor="location">animal size</Form.Label>
          <Form.Select
            type="text"
            name="size"
            onChange={handleInputChange}
            value={formData.size}
          >
            <option value="">-- what size is your animal --</option>
            <option value="Extra-Small">extra-small (under 5 pounds)</option>
            <option value="Small">small (5-25 pounds)</option>
            <option value="Medium">medium (26-60 pounds)</option>
            <option value="Large">large (61-100 pounds)</option>
            <option value="Extra-Large">extra-large (101 pounds+) </option>
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

        <button 
        type="submit" 
        variant="success" 
        onClick={handleFormSubmit}
        className="ml-4 bg-slate-50 hover:bg-cyan-700 rounded-md px-3 py-1 text-rose-600 hover:text-slate-50 border-solid border-slate-300 border-2">
          submit
        </button>
      </Form>
    </div>
  );
};

export default EditPetForm;
