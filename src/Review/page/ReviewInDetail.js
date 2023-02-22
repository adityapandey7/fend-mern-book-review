import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../common/Component/UIElements/Card";
import Button from "../../common/Component/FormElement/Button";
import { AuthContext } from "../../common/context/auth-context";

import "./ReviewInDetail.css";
import Modal from "../../common/Component/UIElements/Modal";
import ErrorModal from "../../common/Component/UIElements/ErrorModal";
import LoadingSpinner from "../../common/Component/UIElements/LoadingSpinner";

function ReviewInDetail() {
  const [showModal, setShowModal] = useState(false);
  const [loadedReview, setLoadedReview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const reviewParam = useParams().revId;
  const naviate = useNavigate();

  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/review/${reviewParam}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          setIsLoading(false);
          setError(response.message);
        } else {
          setIsLoading(false);
          setLoadedReview(responseData.review);
        }
      } catch (err) {}
    };
    fetchReview();
  }, [reviewParam]);

  function showDeleteWarning() {
    setShowModal(true);
  }
  const cancelDeleteHandler = () => {
    setShowModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowModal(false);
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/review/${loadedReview.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(responseData.message);
      } else {
        setIsLoading(false);
        naviate("/");
      }
    } catch (err) {}
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      <Modal
        show={showModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this review? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedReview && (
        <div className="review-in-detail">
          <Card className="review-in-detail_content">
            <div className="review-in-detail_image">
              <img
                src={`http://localhost:5000/${loadedReview.image}`}
                alt={loadedReview.title}
              />
            </div>
            <div className="review-in-detail_info">
              <h3>{loadedReview.title}</h3>
              <p>{loadedReview.description}</p>
            </div>
            <div className="review-in-detail_info-extra">
              <p>{loadedReview.recommend}</p>
              <p>{loadedReview.creator}</p>
            </div>
            {auth.userId === loadedReview.creator && (
              <div className="review-in-detail_admin">
                <Button to={`/review/update/${loadedReview.id}`}>Edit</Button>
                <Button danger onClick={showDeleteWarning}>
                  Delete
                </Button>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default ReviewInDetail;
