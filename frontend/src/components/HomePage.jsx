import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="text-center">
        <h1 className="text-white mb-4">Welcome to Our Website</h1>
        <div className="btn-group" role="group" aria-label="Basic example">
          <Link to="/register" className="me-2">
            <button className="btn btn-primary">Register</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-secondary">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
