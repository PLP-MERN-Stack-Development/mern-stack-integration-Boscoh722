import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const PostList = () => {
  const { data: posts = [], loading, error, fetchData } = useApi(); // Default to [] for safety

  useEffect(() => {
    fetchData('/posts');
  }, [fetchData]); // ← Critical: Include fetchData as dependency

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post._id}>
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;