import { useForm } from 'react-hook-form';

const PostForm = ({ isEdit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    // Send data via fetch/axios
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: true })} />
      {errors.title && <span>Title is required</span>}
      {/* Similarly for content */}
      <button type="submit">Submit</button>
    </form>
  );
};
export default PostForm;