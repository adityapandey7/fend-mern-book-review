import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../../common/Component/UIElements/Card";
import ErrorModal from "../../common/Component/UIElements/ErrorModal";
import LoadingSpinner from "../../common/Component/UIElements/LoadingSpinner";

import "./User.css";

function User() {
  const [loadedUser, setLoadedUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchingUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/user");
        const responseData = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          setError(responseData.message);
        } else {
          setIsLoading(false);
          setLoadedUser(responseData.users);
        }
      } catch (err) {}
    };
    fetchingUser();
  }, []);

  const clearError = () => {
    setError(null);
  };

  if (!loadedUser && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Something went Wrong</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading &&
        loadedUser &&
        loadedUser.map((user) => (
          <div className=" center" key={user.id}>
            <Card className="user ">
              <Link to={`/${user.id}/review`}>
                <div className="user-content">
                  <div className="user-content_image">
                    <img
                      src={`http://localhost:5000/${user.image}`}
                      alt={user.name}
                    />
                  </div>
                  <div className="user-content_info">
                    <h5 className="user-content_info-name">
                      <strong>{user.name}</strong>
                    </h5>
                    <p className="user-content_info-revCount">
                      {user.reviews.length}{" "}
                      {user.reviews.length > 1 ? "Reviews" : "Review"}
                    </p>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        ))}
    </>
  );
}

export default User;
