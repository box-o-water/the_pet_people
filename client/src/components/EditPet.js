// EditPetForm.js

import React, { useState } from "react";

const EditPetForm = ({ pet, handleEditPet, toggleEditForm }) => {
  const [formData, setFormData] = useState({
    petName: pet.petName,
    animalType: pet.animalType,
    breed: pet.breed,
    size: pet.size
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleEditPet(pet._id, formData);
    toggleEditForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pet Name:
        <input type="text" name="petName" value={formData.petName} onChange={handleChange} />
      </label>
      <label>
        Animal Type:
        <input type="text" name="animalType" value={formData.animalType} onChange={handleChange} />
      </label>
      <label>
        Breed:
        <input type="text" name="breed" value={formData.breed} onChange={handleChange} />
      </label>
      <label>
        Size:
        <input type="text" name="size" value={formData.size} onChange={handleChange} />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={toggleEditForm}>Cancel</button>
    </form>
  );
};

export default EditPetForm;
