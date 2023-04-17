import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <nav className="bg-gray-900 text-white flex justify-between p-6">
        <div>
          <Link to="/" className="font-bold text-lg">
            The Pet People
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <div className="flex">
              <Link to="/profile" className="mr-4">
                See Your Profile
              </Link>
              <Link to="/" onClick={Auth.logout}>
                Logout
              </Link>
            </div>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-600 rounded-md px-3 py-1"
              onClick={() => setShowModal(true)}
            >
              Login/Sign Up
            </button>
          )}
        </div>
      </nav>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-xl">
            <button
              className="absolute top-0 right-0 mr-4 mt-4 text-gray-700 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <div className="my-4">
              {showLogin ? (
                <LoginForm handleModalClose={() => setShowModal(false)} />
              ) : (
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              )}
              <div className="mt-4">
                {showLogin ? (
                  <p>
                    Don't have an account?{" "}
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => setShowLogin(false)}
                    >
                      Sign Up
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => setShowLogin(true)}
                    >
                      Login
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppNavbar;
