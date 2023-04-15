import React from "react";
// import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

const UsersList = () => {
  const { data } = useQuery(QUERY_USERS);

  const users = data?.users || [];

  return (
    <div>
      <h3>renters are people, too</h3>
      {users &&
        users.map((user) => (
          <div key={user._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {user.username}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{user.email}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UsersList;
