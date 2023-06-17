import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import "./Profile.css";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const location = useLocation();

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

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Bad User Credentials");
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div
        className="pageContainer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <header>
          <button onClick={goBack} style={{ marginBottom: "10px" }}>
            Go Back
          </button>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form
          className="formContainer"
          onSubmit={onSubmit}
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            margin: "20px",
            maxWidth: "400px",
          }}
        >
          <main>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
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
                style={{ marginLeft: "5px", cursor: "pointer" }}
              />
            </div>

            <Link to="/forgot-password" className="forgotPasswordLink" style={{ marginTop: "10px" }}>
              Forgot Password
            </Link>

            <div className="signInBar" style={{ marginTop: "10px" }}>
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
              </button>
            </div>
          </main>
        </form>
      </div>
    </>
  );
}

export default SignIn;
