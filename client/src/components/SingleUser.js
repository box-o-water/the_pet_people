import React, {useState} from "react";
import { useParams } from "react-router-dom";
import AddReview from "./AddReview"
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
    <div>
      <p>Name: {data?.user[0].username}</p>
      <p>Email: {data?.user[0].email}</p>
      <img
        src="https://i.guim.co.uk/img/media/e4ae055cd7e0b946e216e2a43a97fcf085c364e6/463_41_2032_1219/master/2032.jpg?width=645&quality=45&dpr=2&s=none"
        width="150"
        alt="cat lady"
      ></img>
      <p>Location (City, State): {data?.user[0].location}</p>
      <div>
        <h3>pets are people, too</h3>
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
      <div>
      <button onClick={toggleReviewAddForm}>Add Review</button>
      {showAddReviewForm && (
                <AddReview data={data} />
              )}
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
    </div>
  );
};

export default SingleUser;
