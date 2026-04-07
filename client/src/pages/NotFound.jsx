import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="auth-shell">
      <div className="auth-card center-card">
        <span className="eyebrow-pill">404</span>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="primary-button">
          Go Home
        </Link>
      </div>
    </div>
  );
}
