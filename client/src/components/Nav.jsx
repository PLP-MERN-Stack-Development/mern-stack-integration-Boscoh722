import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="bg-blue-600 text-white p-4 shadow-md">
    <div className="container mx-auto flex gap-4">
      <Link to="/" className="hover:text-blue-200 transition-colors">
        Home
      </Link>
      <Link to="/create" className="hover:text-blue-200 transition-colors">
        Create Post
      </Link>
    </div>
  </nav>
);

export default Nav;