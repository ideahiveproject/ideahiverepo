// Importing necessary libraries popup and MUI/MUI-icons
import { useContext } from "react";
import { PostContext } from "../context/PostState";
import {
    Button,
    Typography,
    Stack,
  } from "@mui/material";
  import "reactjs-popup/dist/index.css";
  
  const Delete = ({close, post }) => {
    const { removePost } = useContext(PostContext);
    return (
      //delete ui and functionality
          <Stack ml={"5vw"} mt={"20px"}>
          <Typography>Are you sure you want to delete permanently?</Typography>
           <Stack direction='row' mr="0px">
           <Button
           variant="contained"
           sx={{ m: 4, p: 1.5 }}
           color="primary"
           type="submit"
           onClick={()=> removePost(post.id)}
         >
           Yes
         </Button>
         <Button
         variant="contained"
         sx={{ m: 4, p: 1.5 }}
         color="error"
         type="submit"
         onClick={() => close()}
       >
         No
       </Button>
       </Stack>
          </Stack>
    );
  };
  
  export default Delete;
  