import React, { useState } from "react";

const PostForm = () => {
  const [inputArr, setInputArr] = useState([]);
  const [post, setPost] = useState({
    title: "",
    description: "",
    delivarable: "",
    category: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return { ...prev, [name]: value };
    });
  };

  let { title, description, delivarable, category, file } = post;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputArr);
    setInputArr([...inputArr, title, description, delivarable, category, file]);
  };

  return (
    <div>
      <h1>Create your post here</h1>
      <form onSubmit={handleSubmit}>
        <h3>Title</h3>
        <input type="text" name="title" onChange={handleChange} />
        <h3>Description</h3>
        <textarea name="description" onChange={handleChange} />
        <h3>Delivarables</h3>
        <input type="text" name="delivarable" onChange={handleChange} />
        <h3>Category</h3>
        <select name="category" onChange={handleChange}>
          <option></option>
          <option>category 1</option>
          <option>category 2</option>
          <option>category 3</option>
          <option>category 4</option>
        </select>
        <h3>Image</h3>
        <input type="file" name="file" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {inputArr.map((info, index) => {
          return (
            <div>
              <p>{info.title}</p>
              <p>{info.description}</p>
              <p>{info.category}</p>
              <p>{info.delivarable}</p>
              <img src={info.file} alt={info.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostForm;
