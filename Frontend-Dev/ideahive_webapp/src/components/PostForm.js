import { useContext, useState } from "react";
import { PostContext } from "../context/PostState";
import {v4 as uuid} from 'uuid';
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const { addPost} = useContext(PostContext);  
  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
    // file: null,
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({...post, [name]: value});
  };

  const handleSubmit = () => {
    const newPost = {
      userId: 4,
      id: uuid,
      title: post.title,
      description: post.description,
      category: post.category
    }
    addPost(newPost)
    navigate('/post');
  };


  return (
    <div>
      <h1>Create your post here</h1>
      <form onSubmit={handleSubmit}>
        <h3>Title</h3>
        <input type="text" name="title" onChange={handleChange} />
        <h3>Description</h3>
        <textarea name="description" onChange={handleChange} />
        <h3>Category</h3>
        <select name="category" onChange={handleChange}>
          <option></option>
          <option>category 1</option>
          <option>category 2</option>
          <option>category 3</option>
          <option>category 4</option>
        </select>
        {/*<h3>Image</h3>
  <input type="file" name="file" onChange={handleChange} />*/}
<button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
