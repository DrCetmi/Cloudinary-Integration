import { useState } from "react";

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

    // Echtzeitüberprüfung
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} Feld ist erforderlich`,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Überprüfung
    const newErrors = {};
    if (!loginData.email.trim()) {
      newErrors.email = "E-Mail Adresse ist erforderlich";
    }
    if (!loginData.password.trim()) {
      newErrors.password = "Passwort ist erforderlich";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Backend-Kommunikation - Hier kann ein echter API-Aufruf erfolgen

    console.log("Anmeldeinformationen:", loginData);
  };

  return (
    <div className="container-fluid bg-dark vh-100 d-flex align-items-center justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="container w-50 border p-5 rounded bg-light"
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-Mail:
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
            Passwort:
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
        <button type="submit" className="btn btn-danger">
          Anmelden
        </button>
      </form>
    </div>
  );
}

export default Login;
