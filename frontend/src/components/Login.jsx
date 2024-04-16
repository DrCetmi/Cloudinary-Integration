import { useState } from "react";
import axios from "axios";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setErrors({ server: "E-mail and password are required" });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        loginData
      );
      localStorage.setItem("token", response.data.token);
      console.log("Login successful", response.data);
      alert("Login successful");
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = error.response?.data?.message || "Login failed";
      setErrors({ server: errorMsg });
    }
  };

  return (
    <div className="container-fluid bg-dark vh-100 d-flex align-items-center justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="container w-50 border p-5 rounded bg-light"
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
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
            value={loginData.password}
            onChange={handleChange}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>
        {errors.server && (
          <div className="alert alert-danger">{errors.server}</div>
        )}
        <button type="submit" className="btn btn-danger">
          Anmelden
        </button>
      </form>
    </div>
  );
}

export default Login;
