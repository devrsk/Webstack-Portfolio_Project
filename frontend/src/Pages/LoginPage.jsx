import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toastSuccess, toastError } from "../components/ToastMessage";
import { loginValidate } from "../Middleware/loginValidation";
import { SERVER_URL } from "../Config/Config";

function LoginPage({ setAuth }) {
  useEffect(() => {
    document.title = "Login";
    window.scrollTo(0, 0);
  }, []);

  const [inputs, setInputs] = useState({
    user_email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const { user_email, password } = inputs;

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const error = loginValidate(inputs);

    if (error) {
      setError(error);
      console.log("Validation error:", error);
    }

    if (Object.keys(error).length === 0) {
      try {
        const body = { user_email, password };
        console.log("Request body:", body);

        const response = await axios.post(`${SERVER_URL}/api/auth/login`, body);
        console.log("Response:", response);

        const parseRes = response.data;

        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          setAuth(true);
          toastSuccess("Logged in successfully!");
        } else {
          setAuth(false);
        }
      } catch (err) {
        console.error(err.message);
        console.log("Axios error:", err);

        if (err.response.status === 422) {
          let errors = err.response.data.errors[0].msg;
          console.log("Server validation error:", errors);
          toastError(errors);
        } else {
          toastError("Server error!");
        }
      }
    } else {
      const errorMessages = Object.values(error).filter(
        (errors) => errors !== null && errors !== undefined
      );
      errorMessages.forEach((error) => {
        console.log("Validation error:", error);
        toastError(error);
      });
    }
  };

  return (
    <main className="w-full flex">
      {/* Rest of the code */}
    </main>
  );
}

export default LoginPage;
