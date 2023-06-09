import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({ variables: userFormData });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">username</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
            className="border-solid border-slate-300 border-2"
          />
          <Form.Control.Feedback type="invalid">
            username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">email</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
            className="border-solid border-slate-300 border-2"
          />
          <Form.Control.Feedback type="invalid">
            email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
            className="border-solid border-slate-300 border-2"
          />
          <Form.Control.Feedback type="invalid">
            password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <button 
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant ="success"
          className="ml-4 bg-slate-50 hover:bg-cyan-700 rounded-md px-3 py-1 text-rose-600 hover:text-slate-50 border-solid border-slate-300 border-2"
        >
          submit
        </button>
      </Form>
    </>
  );
};

export default SignupForm;
