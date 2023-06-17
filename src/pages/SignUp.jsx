import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
//import "./Profile.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const { name, email, password, phoneNumber } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      formDataCopy.uid = user.uid; // Add UID to the formDataCopy

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div
  className="pageContainer"
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  }}
>
  <form
    className="formContainer"
    onSubmit={onSubmit}
    style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '20px',
      maxWidth: '400px',
    }}
  >
    <header>
      <p className="pageHeader">Welcome back!</p>
    </header>
    <main>
      <input
        type="text"
        className="nameInput"
        placeholder="Name"
        id="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        className="emailInput"
        placeholder="Email"
        id="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        className="phoneNumberInput"
        placeholder="Phone Number"
        id="phoneNumber"
        value={phoneNumber}
        onChange={onChange}
      />
      <div className="passwordInputDiv">
        <input
          type={showPassword ? "text" : "password"}
          className="passwordInput"
          placeholder="Password"
          id="password"
          value={password}
          onChange={onChange}
        />
        <img
          src={visibilityIcon}
          alt="show password"
          className="showPassword"
          onClick={() => setShowPassword((prevState) => !prevState)}
        />
      </div>

      <Link to="/forgot-password" className="forgotPasswordLink">
        Forgot Password
      </Link>

      <div className="signUpBar">
        <p className="signUpText">Sign Up</p>
        <button className="signUpButton">
          <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
        </button>
      </div>
    </main>
  </form>
</div>

    </>
  );
}

export default SignUp;
