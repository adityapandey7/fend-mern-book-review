import React, { useContext, useState } from "react";

import { useForm } from "../../common/hook.js/form-hook";
import Input from "../../common/Component/FormElement/Input";
import Button from "../../common/Component/FormElement/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../validators";
import { AuthContext } from "../../common/context/auth-context";
import ErrorModal from "../../common/Component/UIElements/ErrorModal";
import LoadingSpinner from "../../common/Component/UIElements/LoadingSpinner";
import ImageUpload from "../../common/Component/FormElement/ImageUpload";

import "./NewReview.css";
import { useNavigate } from "react-router-dom";

function NewReview() {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const { formState, inputHandler } = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const navigation = useNavigate();

  async function reviewSubmitHandler(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);
      console.log("t", formData.getAll("title"));
      console.log("d", formData.getAll("description"));
      console.log("i", formData.getAll("image"));
      const response = await fetch("http://localhost:5000/api/review/create", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(response.message);
      } else {
        setIsLoading(false);
        navigation("/");
      }
    } catch (err) {}
  }

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="review-form" onSubmit={reviewSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element="input"
          id="title"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter title"
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          id="description"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter description (atleast 5 word)"
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Review
        </Button>
      </form>
    </>
  );
}

export default NewReview;
