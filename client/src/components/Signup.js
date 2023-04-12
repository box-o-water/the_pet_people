import React, { useState}  from "react";
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_RENTER } from '../utils/mutations';
import Auth from '../utils/auth';

function SignUp() {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    // adding Renter mutation
    const [addRenter, { error }] = useMutation(ADD_RENTER);

    // handler for handing the signup
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
          const mutationResponse = await addRenter({
            variables: { ...formState },
          });
          const token = mutationResponse.data.addUser.token;
          Auth.login(token);
        } catch (e) {
          console.log(e);
        }
      };
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };
      
      return (
        <div className="container">
          <Link to="/login">← Go to Login</Link>
      
          <h2>Sign Up</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                placeholder="Username"
                name="username"
                type="text"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input
                placeholder="email@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            {error ? (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      );
      
      



} 
export default SignUp;