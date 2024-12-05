import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center">
      <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary btn-outline">
        Go Back To Home
      </Link>
    </div>
  );
};

export default ErrorPage;
