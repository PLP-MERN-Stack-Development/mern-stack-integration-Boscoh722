import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const PostList = () => {
  const { data: posts = [], loading, error, fetchData } = useApi(); // Default to [] for safety

  useEffect(() => {
    fetchData('/posts');
  }, [fetchData]); // ← Critical: Include fetchData as dependency

  if (loading) return <div className="container mx-auto p-6"><p className="text-center text-gray-600">Loading posts...</p></div>;
  if (error) return <div className="container mx-auto p-6"><p className="text-center text-red-600">Error: {error}</p></div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Posts</h2>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Link to={`/posts/${post._id}`} className="text-blue-600 hover:text-blue-800 font-semibold text-lg">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;