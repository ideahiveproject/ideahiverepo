// Importing necessary libraries popup and MUI/MUI-icons
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../context/PostState";
import { useNavigate } from "react-router-dom";
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  Stack,
  TextField,
} from "@mui/material";
import "reactjs-popup/dist/index.css";


const Edit = (props) => {
  const { posts, editPost} = useContext(PostContext);  
  const [selectedpost, setSelectedPost] = useState({
    id:'',
    userId: '',
    title: "",
    description: "",
    category: "",
    // file: null,
  });

  const currentPostId = props.match.params.id;
  console.log(props.match.params.id);
  const navigate = useNavigate();

  useEffect(()=>{
    const postId = currentPostId;
    selectedpost = posts.find(post => post.id === postId)
    setSelectedPost(selectedpost);
  },[currentPostId, posts])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost({...selectedpost, [name]: value});
  };

  const handleSubmit = () => {
    editPost(selectedpost);
    navigate('/post');
  };
  return (
    //edit ui with functionality
        <Stack ml={"5vw"} mt={"20px"} spacing={2} width={"30vw"}>
        <form onSubmit={handleSubmit}>
        <InputLabel>Title</InputLabel>
          <TextField type="text" name="title" value={selectedpost.title} onChange={handleChange}/>
          <InputLabel>Description</InputLabel>
          <TextareaAutosize
            minRows={5}
            name="description"
            value={selectedpost.body}
            onChange={handleChange}
          ></TextareaAutosize>
          <InputLabel>Category</InputLabel>
          <Select label="category" name="category" value={selectedpost.category} onChange={handleChange}>
          <MenuItem value={"agriculture"}>Agriculture</MenuItem>
            <MenuItem value={"education"}>Education</MenuItem>
            <MenuItem value={"healthcare"}>Healthcare</MenuItem>
            <MenuItem value={"industry"}>Industry</MenuItem>
            <MenuItem value={"information technology"}>Infromation Technology</MenuItem>
          </Select>
         <Stack direction='row'>
         <Button
         variant="contained"
         sx={{ m: 4, p: 1.5 }}
         color="primary"
         type="submit"
        //  onClick={()}
       >
         Update
       </Button>
       <Button
       variant="contained"
       sx={{ m: 4, p: 1.5 }}
       color="error"
       type="submit"
      //  onClick={() => close()}
     >
       Cancel
     </Button>
     </Stack>
     </form>
    </Stack>
  );
};

export default Edit;
