import React from "react";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { DELETE_USER, DELETE_PET } from "../utils/mutations";
import Auth from "../utils/auth";
import Swal from "sweetalert2";

const Profile = () => {
  const [deletePet] = useMutation(DELETE_PET);
  const [deleteUser] = useMutation(DELETE_USER);
  // use useQuery to get logged in user's data
  const { loading, data } = useQuery(GET_ME);
  const pets = data?.me.pets || [];
  const reviews = data?.me.reviews || [];
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return false;
  }

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  const handleDeletePet = async (petId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deletePet({
            variables: { petId: petId },
          });

          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "All your information will disappear!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser({
            variables: { username: data?.me.username },
          });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          // adds delay to show confirmation message
          setTimeout(() => {
            Auth.logout();
            window.location.href = "/";
          }, 3000);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <a href="/update-profile"> Update Profile</a>
      <div>
        <a href="/add-pet">Add Pet</a>
      </div>

      <h2>profile</h2>
      <p>Name: {data?.me.username}</p>
      <p>Email: {data?.me.email}</p>
      <img
        src="https://i.guim.co.uk/img/media/e4ae055cd7e0b946e216e2a43a97fcf085c364e6/463_41_2032_1219/master/2032.jpg?width=645&quality=45&dpr=2&s=none"
        width="150"
        alt="cat lady"
      ></img>
      <p>Location (City, State): {data?.me.location}</p>
      <div>
        <h3>pets are people, too</h3>
        {pets &&
          pets.map((pet) => (
            <div key={pet._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                {pet.petName}
                <button onClick={() => handleDeletePet(pet._id)}>
                  Delete Pet
                </button>
              </h4>
              <div className="card-body bg-light p-2">
                <p>{pet.animalType}</p>
                <p>{pet.breed}</p>
                <p>{pet.size}</p>
              </div>
            </div>
          ))}
      </div>
      <div>
        <h3>reviews from people, about people</h3>
        {reviews &&
          reviews.map((review) => (
            <div key={review._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                {review.landlord}
              </h4>
              <div className="card-body bg-light p-2">
                <p>{review.createdAt}</p>
                <p>{review.reviewContents}</p>
                <p>{review.rating}</p>
              </div>
            </div>
          ))}
      </div>
      <button onClick={handleDeleteUser}>Delete Account</button>
    </div>
  );
};

export default Profile;
