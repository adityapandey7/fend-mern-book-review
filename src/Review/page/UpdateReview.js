import React, { useContext, useEffect, useState } from "react";
import Button from "../../common/Component/FormElement/Button";
import Input from "../../common/Component/FormElement/Input";
import { useForm } from "../../common/hook.js/form-hook";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../common/Component/UIElements/Card";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../validators";

import { AuthContext } from "../../common/context/auth-context";
import ErrorModal from "../../common/Component/UIElements/ErrorModal";

function UpdateReview() {
  const reviewId = useParams().revId;
  const [loadedReview, setLoadedReview] = useState(true);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const { formState, inputHandler, setFormData } = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/review/${reviewId}`
        );
        const responseData = await response.json();
        if (!response.ok) {
          setIsLoading(false);
          setError(responseData.message);
        } else {
          setIsLoading(false);

          setLoadedReview(responseData.review);
        }

        setFormData(
          {
            title: {
              value: loadedReview.title,
              isValid: true,
            },
            description: {
              value: loadedReview.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchReview();
  }, [setFormData, reviewId]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/review/${reviewId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: formState.inputs.title.value,
            description: formState.inputs.description.value,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(responseData.message);
      } else {
        navigate(`/review/${reviewId}`);
      }
      // navigate.push("/" + auth.userId + "/review");
    } catch (err) {}
  };

  const clearError = () => {
    setError(null);
  };

  if (!loadedReview && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedReview && (
        <form className="place-form" onSubmit={updateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedReview.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedReview.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}

export default UpdateReview;
