import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Error 404: Not Found
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          The page you requested could not be found.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
        >
          Go to Home Page
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
