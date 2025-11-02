import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/create">Create Post</Link>
  </nav>
);

export default Nav;