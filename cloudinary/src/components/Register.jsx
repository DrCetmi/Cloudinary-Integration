import { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} is required`,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      console.log("Registration successful");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div className="container-fluid bg-dark vh-100 d-flex align-items-center justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="container w-50 border p-5 rounded bg-light"
      >
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
          <label htmlFor="image" className="form-label">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
