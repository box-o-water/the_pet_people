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
          <Link to="/" className="font-bold text-lg border-b-2 border-rose-400 hover:text-cyan-200">
            the pet people
          </Link>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <div className="flex">
              <a href="/profile" className="mr-4 border-b-2 border-rose-400 hover:text-cyan-200">
                your profile
              </a>
              <a
                href="/"
                onClick={Auth.logout}
                className="border-b-2 border-rose-400 hover:text-cyan-200"
              >
                logout
              </a>
            </div>
          ) : (
            <button
              className="font-bold text-lg border-b-2 border-rose-400 hover:text-cyan-0"
              onClick={() => setShowModal(true)}
            >
              login/sign-up
            </button>
          )}
        </div>
      </nav>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow-xl">
            <button
              className="absolute bold-text text-4xl top-0 right-0 mr-4 mt-4 text-rose-700 hover:text-gray-900"
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
                    don't have an account?{" "}
                    <button
                      className="text-rose-700 hover:underline"
                      onClick={() => setShowLogin(false)}
                    >
                      sign up
                    </button>
                  </p>
                ) : (
                  <p>
                    already have an account?{" "}
                    <button
                      className="text-rose-700 hover:underline"
                      onClick={() => setShowLogin(true)}
                    >
                      login
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
