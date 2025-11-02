import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';

const PostForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  // Load post data if editing
  useEffect(() => {
    if (isEdit && id) {
      postService.getPost(id)
        .then(post => {
          setValue('title', post.title || '');
          setValue('content', post.content || '');
        })
        .catch(err => {
          setError('Failed to load post');
          console.error(err);
        });
    }
  }, [isEdit, id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      if (isEdit && id) {
        await postService.updatePost(id, data);
      } else {
        await postService.createPost(data);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            {...register('title', { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post title"
            disabled={loading}
          />
          {errors.title && (
            <span className="text-red-600 text-sm mt-1 block">Title is required</span>
          )}
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            {...register('content', { required: true })}
            rows="8"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post content"
            disabled={loading}
          />
          {errors.content && (
            <span className="text-red-600 text-sm mt-1 block">Content is required</span>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
        </button>
      </form>
    </div>
  );
};
export default PostForm;