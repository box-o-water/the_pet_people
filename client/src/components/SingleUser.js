import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview";
// import { Container, Card, Button, Row, Col } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

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
      <div>
        <h3 className="font-bold text-lg ml-6 mt-4 mr-4">pets are people, too</h3>
        <div className="max-w-sm w-full lg:max-w-full lg:flex ml-6 mt-4 mr-4 mb-4 shadow-lg">
          <img
            className=" h-44 lg:h-auto lg:w-44 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border-solid border-slate-300"
            src="https://i.guim.co.uk/img/media/e4ae055cd7e0b946e216e2a43a97fcf085c364e6/463_41_2032_1219/master/2032.jpg?width=645&quality=45&dpr=2&s=none"
            width="150"
            alt="cat lady"
          ></img>
          {/* <img
          className="h-44 lg:h-auto lg:w-44 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border-solid border-slate-300"
          src={corgi_butt}
          alt="illustrated corgi butt"
        ></img> */}
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
            <div className="mb-8">
              <p className="text-sm text-gray-600 flex items-center"></p>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {data?.user[0].username}
              </div>

              <p className="text-gray-700 text-base">
                email: {data?.user[0].email}
              </p>

              <p className="text-gray-700 text-base">
                location (city, state): {data?.user[0].location}
              </p>
            </div>
          </div>
        </div>
        {pets &&
          pets.map((pet) => (
            <div key={pet._id} className="card mb-3">
              <h4 className="card-header bg-primary text-light p-2 m-0">
                {pet.petName}
              </h4>
              <div className="card-body bg-light p-2">
                <p>{pet.breed}</p>
                <p>{pet.size}</p>
              </div>
            </div>
          ))}
      </div>
      
      <div className="ml-4">
        <h3 className="font-bold text-lg ml-4">
          reviews from people, about people
        </h3>
        {reviews &&
          reviews.map((review) => (
            <div
              key={review._id}
              className="ml-4 max-w-sm rounded overflow-hidden shadow-lg m-2 bg-slate-50"
            >
              <div className="flex bg-slate-200">
                <h4 className="font-semibold text-xl mb-2 flex w-3/12 pl-4 pt-">
                  {review.landlord}
                </h4>
              </div>
              <div className="pl-4 pb-4 pr-4">
                <p>{review.createdAt}</p>
                <p>{review.reviewContents}</p>
                <p>rating (out of 10): {review.rating}</p>
              </div>
            </div>
          ))}
      </div>
      <div>
        <button className="ml-6 bg-slate-50 hover:bg-cyan-700 rounded-md px-3 py-1 text-rose-600 hover:text-slate-50 border-solid border-slate-300 border-2" 
        onClick={toggleReviewAddForm}>
          add review
        </button>
        {showAddReviewForm && <AddReview data={data} />}
      </div>
    </div>
  );
};

export default SingleUser;
