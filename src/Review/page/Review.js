import React, { useEffect, useState } from "react";
import ErrorModal from "../../common/Component/UIElements/ErrorModal";
import LoadingSpinner from "../../common/Component/UIElements/LoadingSpinner";
import ReviewList from "../component/ReviewList";

function Review() {
  const [loadedReview, setLoadedReview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  let controller;
  useEffect(() => {
    const fetchReview = async () => {
      setIsLoading(true);
      try {
        controller = new AbortController();
        const response = await fetch("http://localhost:5000/api/review", {
          method: "GET",
          signal: controller.signal,
        });

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
    fetchReview();
  }, []);

  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, []);

  const clearError = () => {
    setError(null);
  };

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

export default Review;
