import React, { useState } from "react";
import EditPet from "./EditPet";
import AddPet from "./AddPet";
import UpdateProfile from "./UpdateProfile";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { DELETE_USER, DELETE_PET, UPDATE_PET } from "../utils/mutations";

import corgi_butt from "./assets/corgi_butt.png";

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
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);
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
          }, 1000);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };
  const toggleAddPetForm = () => {
    setShowAddPetForm(!showAddPetForm);
  };
  const toggleEditProfileForm = () => {
    setShowEditProfileForm(!showEditProfileForm);
  };

  return (
    <div className="bg-cyan-50">
      <div className="bg-gray-700 text-white flex justify-between pl-3">
        <div className="flex w-3/12 p-2">
          <h2 className="text-lg">hello, {data?.me.username}!</h2>
        </div>
        <nav className="flex w-9/12 justify-end p-2">
          <button
            className="mr-2 md:mr-4 border-b-2 border-rose-300 hover:text-cyan-200"
            onClick={toggleEditProfileForm}
          >
            update profile
          </button>
          <button
            className="mr-2 md:mr-4 border-b-2 border-rose-300 hover:text-cyan-200"
            onClick={toggleAddPetForm}
          >
            add pet
          </button>
          <button
            className="mr-2 md:mr-4 border-b-2 border-rose-300 hover:text-cyan-200"
            onClick={toggleEditForm}
          >
            edit pets
          </button>
        </nav>
      </div>
      <div>
        {showAddPetForm && <AddPet toggleEditForm={toggleAddPetForm} />}
        {showEditProfileForm && (
          <UpdateProfile toggleEditForm={toggleEditProfileForm} />
        )}
      </div>

      <div className="grid content-center place-content-center">
        <div className="max-w-sm w-full lg:max-9/12 shadow-lg m-1 lg:flex lg:justify-center">
          <img
            className="h-fit lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            src={corgi_butt}
            alt="illustrated corgi butt"
          ></img>
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
            <div className="mb-8">
              <p className="text-sm text-gray-600 flex items-center"></p>
              <div className="text-gray-900 font-bold text-xl mb-2">
                my profile
              </div>

              <p className="text-gray-700 text-base">
                your email: {data?.me.email}
              </p>

              <p className="text-gray-700 text-base">
                location(city, state): {data?.me.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-sm w-full lg:max-w-full lg:flex"></div>
      <div>
        <h3 className="font-bold text-lg pl-4">pets are people, too</h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 content-center place-content-center">
          {pets &&
            pets.map((pet) => (
              <div
                key={pet._id}
                className="max-w-sm rounded overflow-hidden shadow-lg m-2 bg-slate-50"
              >
                <div className="flex bg-slate-200">
                  <h4 className="font-bold text-xl mb-2 flex w-3/12 pl-4 pt-2">
                    {pet.petName}
                  </h4>
                  <div className="flex w-9/12 justify-end p-2">
                    <button
                      className="mr-4 border-b-2 border-rose-300"
                      onClick={() => handleDeletePet(pet._id)}
                    >
                      delete pet
                    </button>
                  </div>
                </div>
                <div className="pl-4 pb-4 pr-4">
                  <p>animal type: {pet.animalType}</p>
                  <p>breed: {pet.breed}</p>
                  <p>size: {pet.size}</p>
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
      </div>
      <div>
        <h3 className="mt-4 font-bold text-lg pl-4">
          reviews from people, about people
        </h3>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 content-center place-content-center">
          {reviews &&
            reviews.map((review) => (
              <div
                key={review._id}
                className="ml-4 max-w-sm rounded overflow-hidden shadow-lg m-2 bg-slate-50"
              >
                <div className="flex bg-slate-200">
                  <h4 className="font-semibold text-xl mb-2 flex w-3/12 pl-4 pt-1">
                    {review.landlord}
                  </h4>
                </div>
                <div className="pl-4 pb-4 pr-4 ">
                  <p>{review.reviewContents}</p>
                  <div className="block m-2">
                    <p>posted on: {review.createdAt}</p>
                    <p>rating (out of 10): {review.rating}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <button
        className="ml-4 mt-4 mr-4 mb-4 bg-slate-50 hover:bg-cyan-700 rounded-md px-3 py-1 text-rose-600 hover:text-slate-50 border-solid border-slate-300 border-2"
        onClick={handleDeleteUser}
      >
        delete account
      </button>
    </div>
  );
};

export default Profile;
