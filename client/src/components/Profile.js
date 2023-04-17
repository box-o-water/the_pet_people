import React, { useState } from "react";
import EditPet from "./EditPet";

// import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { DELETE_USER, DELETE_PET, UPDATE_PET } from "../utils/mutations";

import dayjs from "dayjs";

import Auth from "../utils/auth";
import Swal from "sweetalert2";

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  const [deletePet] = useMutation(DELETE_PET);
  const [deleteUser] = useMutation(DELETE_USER);
  const [editPet] = useMutation(UPDATE_PET, {
    refetchQueries: [{ query: GET_ME }],
  });

  // use useQuery to get logged in user's data

  const pets = data?.me.pets || [];
  const reviews = data?.me.reviews || [];
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const [showEditForm, setShowEditForm] = useState(false);

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

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  return (
    <div className="bg-cyan-50">
      <div className="bg-gray-700 text-white flex justify-between pl-3">
        <div className="flex w-3/12 p-2">
          <h2 className="text-lg">hello, {data?.me.username}!</h2>
        </div>
        <nav className="flex w-9/12 justify-end p-2">
          <a className="mr-4 border-b-2 border-rose-300" href="/update-profile">
            update profile
          </a>
          <a className="mr-2 border-b-2 border-rose-300" href="/add-pet">
            add pet
          </a>
        </nav>
      </div>
      <p>email: {data?.me.email}</p>
      <img
        src="https://i.guim.co.uk/img/media/e4ae055cd7e0b946e216e2a43a97fcf085c364e6/463_41_2032_1219/master/2032.jpg?width=645&quality=45&dpr=2&s=none"
        width="150"
        alt="cat lady"
      ></img>
      <p>location (city, state): {data?.me.location}</p>
      <div>
        <h3>pets are people, too</h3>
        {pets &&
          pets.map((pet) => (
            <div
              key={pet._id}
              className="max-w-sm rounded overflow-hidden shadow-lg m-2 bg-slate-50"
            >
              <div className="flex bg-slate-200">
                <h4 className="font-bold text-xl mb-2 flex w-3/12 pl-4 pt-2">{pet.petName}</h4>
                <div className="flex w-9/12 justify-end p-2">
                  <button className="mr-4 border-b-2 border-rose-300"
                  onClick={() => handleDeletePet(pet._id)}>
                    delete pet
                  </button>
                  <button className="mr-4 border-b-2 border-rose-300"
                  onClick={toggleEditForm}>edit pet</button>
                </div>
              </div>
              <div className="pl-4 pb-4 pr-4">
                <p>{pet.animalType}</p>
                <p>{pet.breed}</p>
                <p>{pet.size}</p>
                <p>{dayjs(pet.age).format("DD MMM YYYY")}</p>
              </div>
              {showEditForm && (
                <EditPet
                  pet={pet}
                  toggleEditForm={toggleEditForm}
                  editPet={editPet}
                />
              )}
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
