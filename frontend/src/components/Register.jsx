import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/default.jpg";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value.trim() ? `${name} is required` : "",
    }));
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0] || null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, profilePicture } = formData;
    const newErrors = {
      ...(username.trim() ? {} : { username: "Username is required" }),
      ...(email.trim() ? {} : { email: "Email is required" }),
      ...(password.trim() ? {} : { password: "Password is required" }),
      ...(profilePicture
        ? {}
        : { profilePicture: "Profile picture is required" }),
    };

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        formDataToSend
      );
      console.log("Registration successful", response.data);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setErrors({ form: error.response?.data?.message || "An error occurred" });
      toast.error("Registration failed");
    }
  };

  return (
    <div
      className="container-fluid bg-dark vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "black",
      }}
    >
      <div className="position-absolute top-0 end-0 p-3">
        <Link to="/">
          <button className="btn btn-warning">Back to Home</button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="container w-50 border p-5 rounded bg-light"
      >
        <h1 className="text-center p-3">Register</h1>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            {" "}
          </label>

          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            className={`form-control ${
              errors.profilePicture ? "is-invalid" : ""
            }`}
          />
          {errors.profilePicture && (
            <div className="invalid-feedback">{errors.profilePicture}</div>
          )}
        </div>
        <button type="submit" className="btn btn-danger">
          Register
        </button>
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}
      </form>
    </div>
  );
};

export default RegistrationForm;
