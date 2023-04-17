import React from "react";
import { Link } from "react-router-dom";
// import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
// import { corgibutt } from "../components/assets/corgi_butt.png";

const UsersList = () => {
  const { data } = useQuery(QUERY_USERS);

  const users = data?.users || [];

  return (
    <div className="bg-cyan-50">
      <h3 className="ml-4 mt-2 mr-4 mb-2 font-bold text-lg">renters are people, too</h3>
      {users &&
        users.map((user) => (
          <div className="max-w-sm w-full lg:max-w-full lg:flex m-2 shadow-lg m-4 rounded-md">
            {/* <img
              className="h-44 lg:h-auto lg:w-44 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border-solid border-slate-300"
              src= { corgibutt }
              alt="illustrated corgi butt"
            ></img> */}
            <div className="border-r border-b border-l border-pink-500 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-full">
            <div className="mb-8">
            <p className="text-sm text-gray-600 flex items-center"></p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              <Link to={{ pathname: `/renter/${user._id}` }}>
                  {user.username}
              </Link>
            </div>

            <p className="text-gray-700 text-base">email: {user.email}</p>

            <p className="text-gray-700 text-base">
              location (city, state): {user.location}
            </p>
            </div>
          </div>
        </div>

          // <div key={user._id} className="card mb-3">
            // <h4 className="card-header bg-primary text-light p-2 m-0">
         
            // </h4>
            // <div className="card-body bg-light p-2">
            //   <p>{user.email}</p>
            //   <p>{user.location}</p>
            // </div>
          // </div>
          
        ))}
    </div>
  );
};

export default UsersList;
