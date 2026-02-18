import { Link } from "react-router-dom";
import './404.css'

const PageNotFound = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-code">404</div>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-message">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link className="back-home-btn" to="/">Back to Home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;