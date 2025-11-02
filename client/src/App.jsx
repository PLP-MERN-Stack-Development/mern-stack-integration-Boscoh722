import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import PostList from './components/PostList';
import Post from './components/Post';
import PostForm from './components/PostForm';
// ... other imports (NO BrowserRouter import/use)

const App = () => (
  <div>
    <Nav />
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/create" element={<PostForm />} />
      <Route path="/edit/:id" element={<PostForm isEdit />} />
      {/* Add more routes as needed */}
    </Routes>
  </div>
);

export default App;