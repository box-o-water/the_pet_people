import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../utils/mutations";

const AddReview = (userData) => {
  // set initial form state
  const [reviewFormData, setReviewFormData] = useState({
    landlord: "",
    reviewContents: "",
    rating: "",
  });

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // mutations, and queries
  const [addReview] = useMutation(ADD_REVIEW);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // check if input is for "rating"
    if (name === "rating") {
      // convert value to integer and check if it's greater than 0 and less than or equal to 10
      if (parseInt(value) > 0 && parseInt(value) <= 10) {
        setReviewFormData({ ...reviewFormData, [name]: parseInt(value) });
      }
    } else {
      // for all other inputs, just update the state
      setReviewFormData({ ...reviewFormData, [name]: value });
    }
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
      const landlord = reviewFormData.landlord;
      const reviewContents = reviewFormData.reviewContents;
      const rating = parseInt(reviewFormData.rating);
      const userReviewed = userData.data.user[0].username;

      console.log(userReviewed);
      await addReview({
        variables: {
          landlord,
          reviewContents,
          rating,
          userReviewed,
        },
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
      return;
    }

    event.persist();
    // on submit reloads page
    window.location.reload();
  };

  const handleKeyPress = (event) => {
    if (
      event.charCode > 48 &&
      event.charCode <= 57 &&
      parseInt(event.target.value + event.key) > 10
    ) {
      event.preventDefault();
    }
  };

  return (
    <>
      <p>you can write your review here</p>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Make Sure to fill out all the inputs in this form correctly.
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="landlord">landlord's Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name/companies name"
            name="landlord"
            onChange={handleInputChange}
            value={reviewFormData.landlord}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="reviewContents">
            What do you have to say about this renter?
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your review here"
            name="reviewContents"
            onChange={handleInputChange}
            value={reviewFormData.reviewContents}
            minLength={10}
            required
          />
          {reviewFormData.reviewContents &&
            reviewFormData.reviewContents.length < 10 && (
              <Form.Text className="text-danger">
                Review contents must be at least 10 characters.
              </Form.Text>
            )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="age">
            from 1 - 10 how would you rate this renter
          </Form.Label>
          <Form.Control
            type="Number"
            min={1}
            max={10}
            name="rating"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid rating.
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={
            !(
              reviewFormData.rating &&
              reviewFormData.reviewContents &&
              reviewFormData.landlord
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddReview;
