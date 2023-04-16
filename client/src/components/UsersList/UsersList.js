import React from "react";
import { Link } from "react-router-dom";
// import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";

const UsersList = () => {
  const { data } = useQuery(QUERY_USERS);

  const users = data?.users || [];
  console.log(users);

  return (
    <div>
      <section>
      <h3>renters are people, too</h3>
      </section>
      {users &&
        users.map((user) => (
          <div key={user.username} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <Link to={{ pathname: `/user/${user.username}` }}>
                {user.username}
              </Link>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{user.email}</p>
              <p>{user.location}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UsersList;
