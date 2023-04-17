import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import corgibutt from "./assets/corgi_butt.png";

const SingleUser = () => {
  let { id } = useParams();

  // use useQuery to get logged in user's data
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { _id: id },
  });

  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

  const toggleReviewAddForm = () => {
    setShowAddReviewForm(!showAddReviewForm);
  };
  const pets = data?.user[0].pets || [];
  const reviews = data?.user[0].reviews || [];

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="bg-cyan-50">
      <div className="bg-gray-700 text-white flex justify-between pl-3">
        <div className="flex w-3/12 p-2"></div>
        <nav className="flex w-9/12 justify-end p-2">
          <button
            className="mr-4 border-b-2 border-rose-300"
            onClick={toggleReviewAddForm}
          >
            add review
          </button>
        </nav>
      </div>
      <div>
        {showAddReviewForm && <AddReview data={data} />}
        <h3 className="font-bold text-2xl pl-6 pt-4 pr-4">
          pets are people, too
        </h3>
        <div className="grid content-center place-content-center">
          <div className="max-w-sm w-full lg:max-9/12 shadow-lg m-1 lg:flex lg:justify-center">
            <img
              className="h-fit lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              src={corgibutt}
              alt="illustrated corgi butt"
            ></img>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
              <div className="mb-8">
                <p className="text-sm text-gray-600 flex items-center"></p>
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {data?.user[0].username}
                </div>
                <p className="font-semibold">contact renter at:</p>
                <p className="text-gray-700 text-base">
                  email: {data?.user[0].email}
                </p>
                <p className="font-semibold">renter is looking to move to:</p>
                <p className="text-gray-700 text-base">
                  (city, state): {data?.user[0].location}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="font-bold text-2xl pl-6 pt-4 pr-4">
          here are {data?.user[0].username}'s pets
        </h3>
        <div className="grid md:grid-cols-2 content-center place-content-center">
          {pets &&
            pets.map((pet) => (
              <div
                key={pet._id}
                className="sm:w-56 md:w-96 rounded overflow-hidden shadow-lg m-2 bg-slate-50"
              >
                <div className="bg-slate-200">
                  <h4 className=" font-semibold text-xl pl-4 pt-1">
                    {pet.petName}
                  </h4>
                </div>

                <div className="card-body bg-light p-2">
                  <p>pet type: {pet.animalType}</p>
                  <p>pet breed: {pet.breed}</p>
                  <p>pet size: {pet.size}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <h3 className="font-bold text-lg ml-4">
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
      <div></div>
    </div>
  );
};

export default SingleUser;
