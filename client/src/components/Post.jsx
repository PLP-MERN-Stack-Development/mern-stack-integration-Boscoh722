import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

const Post = () => {
  const { id } = useParams();
  const { data: post, loading, error, fetchData } = useApi();

  useEffect(() => {
    fetchData(`/posts/${id}`);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;
