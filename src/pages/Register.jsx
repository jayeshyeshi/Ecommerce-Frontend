import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import API from "../services/Api";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    dob: "",
  });

  const [error, setError] = useState("");

const handleChange = (e) => {

     const { name } = e.target;
     let value = e.target.value;

     // ✅ Clear error when user starts correcting
    setError("");

    // ✅ Convert email to lowercase
    if (name === "email") {
        value = value.toLowerCase();
    }

    // ✅ Restrict mobile to numbers only
    if (name === "mobile") {
        const onlyNumbers = value.replace(/\D/g, ""); // remove non-digits

        setFormData({
        ...formData,
        [name]: onlyNumbers,
        });
        return;
  }

  // default behavior
  setFormData({
            ...formData,
            [name]: value,
        });
    };

  const handleSubmit = async (e) => {
  e.preventDefault();


  const { email, password, confirmPassword, mobile, dob } = formData;

  // ✅ Empty check
  if (!email || !password || !confirmPassword || !mobile || !dob) {
    setError("All fields are mandatory");
    return;
  }

  // ✅ Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setError("Invalid email format");
    return;
  }

  // ✅ Password validation
  // At least 8 chars, 1 number, 1 special char
  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  if (!passwordPattern.test(password)) {
    setError(
      "Password must be at least 8 characters and include 1 number & 1 special character"
    );
    return;
  }

  // ✅ Confirm password match
  if (password !== confirmPassword) {
    setError("Passwords doesn't match");
    return;
  }

  // ✅ Mobile validation
  const mobilePattern = /^[0-9]{10}$/;
  if (!mobilePattern.test(mobile)) {
    setError("Mobile number must be exactly 10 digits");
    return;
  }

  // ✅ DOB validation (not future date)
  const today = new Date();
  const selectedDate = new Date(dob);

  if (selectedDate > today) {
    setError("Date of birth cannot be in the future");
    return;
  }

  // ✅ All good
  try {
    const response = await API.post("/user/create", {
        userName: email,          // mapping email → userName
        password: password,
        email: email,
        contactNo: Number(mobile), // convert to number
        dateOfBirth: dob,          // already in correct format (yyyy-mm-dd)
    });

    // To print payload in console
    // const payload = {
    //     userName: formData.email,
    //     password: formData.password,
    //     email: formData.email,
    //     contactNo: Number(formData.mobile),
    //     dateOfBirth: formData.dob,
    //     };

    // console.log("Payload:", payload);

    console.log("Success:", response.data);
    alert(response.data);

    // ✅ RESET FORM
    setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        dob: "",
    });

  setError("");

  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      setError(error.response.data.message || "Registration failed");
    } else {
      setError("Server not reachable");
    }
  }
};

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />


          <div className="password-field">
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <div className="password-field">
            <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
            <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          <input
            type="tel"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            maxLength={10}
            required
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;