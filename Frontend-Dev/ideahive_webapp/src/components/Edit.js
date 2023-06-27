// Importing necessary libraries popup and MUI/MUI-icons
import { useContext, useState, useEffect } from "react";
import { PostContext } from "../context/PostState";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  FormControl,
  Box,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

const Edit = () => {
  const { posts, editPost } = useContext(PostContext);
  const [selectedpost, setSelectedPost] = useState({
    id: "",
    userId: "",
    title: "",
    description: "",
    category: "",
    // file: null,
  });

  const currentPostId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const postId = currentPostId.postid;
    setSelectedPost(posts.find((post) => post.id === Number(postId)));
  }, [currentPostId, posts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost({ ...selectedpost, [name]: value });
  };


  const handleSubmit = () => {
    editPost(selectedpost);
    navigate("/post");
  };

  // <Stack direction="column" mt={"50px"} spacing={2} width={"50vw"} justifyContent="center">
  //   <form onSubmit={handleSubmit}>
  //   <InputLabel>Title</InputLabel>
  //     <TextField type="text" name="title" value={selectedpost.title} onChange={handleChange}/>
  //     <InputLabel>Description</InputLabel>
  //     <TextareaAutosize
  //       minRows={5}
  //       name="body"
  //       value={selectedpost.body}
  //       onChange={handleChange}
  //     ></TextareaAutosize>
  //     <InputLabel>Category</InputLabel>
  //     <Select label="category" name="category" value={selectedpost.category} onChange={handleChange}>
  //     <MenuItem value={"agriculture"}>Agriculture</MenuItem>
  //       <MenuItem value={"education"}>Education</MenuItem>
  //       <MenuItem value={"healthcare"}>Healthcare</MenuItem>
  //       <MenuItem value={"industry"}>Industry</MenuItem>
  //       <MenuItem value={"information technology"}>Infromation Technology</MenuItem>
  //     </Select>
  //    <Stack direction='row'>
  //    <Button
  //    variant="contained"
  //    sx={{ m: 4, p: 1.5 }}
  //    color="primary"
  //    type="submit"
  //  >
  //    Update
  //  </Button>
  //  <Button
  //  variant="contained"
  //  sx={{ m: 4, p: 1.5 }}
  //  color="error"
  //  type="submit"
  // >
  //  Cancel
  // </Button>
  // </Stack>
  // </form>


  // <Box
  //           position="absolute"
  //           top={344}
  //           left={397}
  //           bottom={101}
  //           right={397}
  //           bgcolor="rgba(255, 255, 255, 0.7)"
  //           display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       sx={{
  //         borderRadius: "10px",
  //         border: "1px solid black",
  //       }}
  //         >
  //         <Button
  //         variant="contained"
  //         sx={{
  //           width: "100px",
  //           background: "#60dfe69e",
  //           color: "#000000",
  //           fontSize: "18",
  //           borderRadius: "10px",
  //           p: "0.2rem",
  //           mt: "-100px",
  //           ":hover": {
  //             background: "#60dfe69e",
  //             color: "#FFFFFF",
  //           },
  //         }}
  //       >
  //         Change
  //       </Button>
  //       </Box>

  return (
    //edit ui with functionality
    <Box display="flex" justifyContent="center">
      <Stack
        mt="30px"
        p="30px"
        spacing={3}
        direction="column"
        width="40vw"
        sx={{
          boxShadow: "0px 5px 15px 3px rgba(0, 0, 0, 0.25)",
        }}
      >
        <TextField
          label="Title"
          name="title"
          value={selectedpost.title}
          variant="standard"
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="body"
          value={selectedpost.body}
          multiline
          maxRows={5}
          variant="standard"
          onChange={handleChange}
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="category"
            value={selectedpost.category}
            onChange={handleChange}
            label="Category"
          >
            <MenuItem value="agriculture">Agriculture</MenuItem>
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="health_care">Health Care</MenuItem>
            <MenuItem value="industry">Industry</MenuItem>
            <MenuItem value="information technology">
              Infromation Technology
            </MenuItem>
          </Select>
        </FormControl>
        <Stack direction="row" justifyContent= "flex-end"><EditIcon/></Stack>
        <Box
        component="img"
        src={selectedpost.image}
        alt={selectedpost.title}
          sx={{
            width: "430px",
            height: "150px",
            borderRadius: "10px",
            border: "1px solid black",
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        </Box>
        
        <Stack direction={"row"} spacing={4} justifyContent="center" ml="30px">
          <Button
            variant="contained"
            sx={{
              width: "150px",
              background: "#FBDF5F",
              color: "#000000",
              fontSize: "24",
              border: "1px solid black",
              borderRadius: "10px",
              p: "0.5rem",
              ":hover": {
                background: "#FBDF5F",
                color: "#FFFFFF",
              },
            }}
            onClick={handleSubmit}
          >
            Update
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "150px",
              background: "#FFFFFF",
              color: "#000000",
              fontSize: "24",
              border: "1px solid black",
              borderRadius: "10px",
              p: "0.5rem",
              ":hover": {
                background: "#FBDF5F",
                color: "#FFFFFF",
              },
            }}
            onClick={() => navigate("/post")}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Edit;
