import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

const Post = () => {
  const { id } = useParams();
  const { data, loading, error, fetchData } = useApi();
  const post = Array.isArray(data) ? data[0] : data;

  useEffect(() => {
    fetchData(`/posts/${id}`);
  }, [id, fetchData]);

  if (loading) return <div className="container mx-auto p-6"><p className="text-center text-gray-600">Loading...</p></div>;
  if (error) return <div className="container mx-auto p-6"><p className="text-center text-red-600">Error: {error}</p></div>;

  if (!post) return <div className="container mx-auto p-6"><p className="text-center text-gray-600">Post not found</p></div>;

  return (
    <div className="container mx-auto p-6">
      <article className="bg-white rounded-lg shadow-md p-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>
      </article>
    </div>
  );
};

export default Post;
