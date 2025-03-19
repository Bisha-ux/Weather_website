import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Weather Tracker</h1>
      <p className="mt-2 text-gray-700">Get real-time weather updates for any city.</p>

      <div className="mt-6 space-x-4">
        <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Sign Up
        </Link>
        <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Login
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
