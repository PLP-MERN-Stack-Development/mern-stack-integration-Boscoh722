import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import PostList from './components/PostList';
import Post from './components/Post';
import PostForm from './components/PostForm';

const App = () => (
  <div className="min-h-screen bg-gray-100">
    <Nav />
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<Post />} />
      <Route path="/create" element={<PostForm />} />
      <Route path="/edit/:id" element={<PostForm isEdit />} />
    </Routes>
  </div>
);

export default App;
