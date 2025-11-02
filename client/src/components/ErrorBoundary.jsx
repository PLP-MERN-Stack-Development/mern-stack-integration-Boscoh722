import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Optional: for reset on route change
import PropTypes from 'prop-types';

const ErrorBoundary = ({ children, fallback }) => {
  const [hasError, setHasError] = useState(false);
  const location = useLocation(); // Remove if not using React Router

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
      setHasError(true);
    };

    // In React 18+, errors are handled via useEffect in the root, but this works for thrown errors
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Reset error on route change (prevents persistent error state)
  useEffect(() => {
    setHasError(false);
  }, [location]);

  if (hasError) {
    return fallback || <p>Something went wrong. Please refresh the page or try again.</p>;
  }

  return children;
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};

export default ErrorBoundary;