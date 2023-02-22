import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../common/Component/UIElements/ErrorModal";
import LoadingSpinner from "../../common/Component/UIElements/LoadingSpinner";

import { AuthContext } from "../../common/context/auth-context";
import ReviewList from "../component/ReviewList";

function UserReview() {
  const [loadedReview, setLoadedReview] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const auth = useContext(AuthContext);

  const userIdParam = useParams().userId;

  useEffect(() => {
    const fetcchUserReview = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/review/user/${userIdParam}`,
          {
            method: "GET",
            headers: {
              authorization: "Bearer " + auth.token,
            },
          }
        );
        const responseData = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          setError(responseData.message);
        } else {
          setIsLoading(false);
          setLoadedReview(responseData.reviews);
        }
      } catch (err) {}
    };
    fetcchUserReview();
  }, [userIdParam]);

  const clearError = () => {
    setError(null);
  };

  if (!loadedReview) {
    <div className="center">
      <h5>No reviews for this user. </h5>
    </div>;
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedReview && <ReviewList list={loadedReview} />}
    </>
  );
}

export default UserReview;
