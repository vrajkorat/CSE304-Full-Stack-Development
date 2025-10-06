// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const PagenotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-500 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default PagenotFound;
