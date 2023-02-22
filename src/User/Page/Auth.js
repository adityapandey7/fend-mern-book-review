import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../common/Component/UIElements/Card";
import Input from "../../common/Component/FormElement/Input";
import ImageUpload from "../../common/Component/FormElement/ImageUpload";
import Button from "../../common/Component/FormElement/Button";
import ErrorModal from "../../common/Component/UIElements/ErrorModal";
import LoadingSpinner from "../../common/Component/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../validators";
import { useForm } from "../../common/hook.js/form-hook";
import { AuthContext } from "../../common/context/auth-context";

import "./Auth.css";

function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const { formState, inputHandler, setFormData } = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  function changeModeHandler() {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode((prevState) => !prevState);
  }

  const clearError = () => {
    setError(null);
  };
  let controller;
  async function authSubmitHandler(event) {
    event.preventDefault();

    if (isLoginMode) {
      setIsLoading(true);
      try {
        controller = new AbortController();
        const response = await fetch("http://localhost:5000/api/user/login", {
          method: "POST",
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });
        const responseData = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          setError(responseData.message);
        } else {
          setIsLoading(false);
          auth.login(responseData.userId, responseData.token);
          navigate("/");
        }
      } catch (err) {}
    } else {
      setIsLoading(true);
      try {
        controller = new AbortController();
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const response = await fetch("http://localhost:5000/api/user/signup", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        });

        const responseData = await response.json();
        setIsLoading(false);
        if (!response.ok) {
          setError(responseData.message);
        } else {
          auth.login(responseData.userId, responseData.token);
          navigate("/");
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    }
  }
  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, []);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        {isLoginMode ? "Login Required" : "Sign Up Please"}
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />

          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />

          <Button type="submit">{isLoginMode ? "Login" : "Sign Up"}</Button>
        </form>
        <Button inverse onClick={changeModeHandler}>
          Switch To {isLoginMode ? "Sign Up" : "Login"}
        </Button>
      </Card>
    </>
  );
}

export default Auth;
