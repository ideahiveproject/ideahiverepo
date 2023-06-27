// Importing necessary libraries for routing and MUI/MUI-icons
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Stack, Button, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { PostContext } from "../context/PostState";
import ProfileSection from "./ProfileSection";
import UserPost from "./UserPost";

const UserPage = () => {
  const { posts } = useContext(PostContext);
  // const {accounts} = useContext(AccountContext)
  const { userid } = useParams();
  
  const userposts = [...new Set(posts.filter((q) => q.userId === Number(userid)))];
  // const useraccount = [...new Set(accounts.filter((q)=> q.userId == userid))]
  


  return (
    //users page which can see profile and post
    <Box sx={{ p: 8, bgColor: "#FFFFFF" }}>
      <ProfileSection userid={userid} />
      <Stack direction= "row" justifyContent="flex-end">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value="ALL"
        >
          <MenuItem value="ALL">
          ALL
          </MenuItem>
          <MenuItem value="">Agriculture</MenuItem>
          <MenuItem value="">Eduaction</MenuItem>
          <MenuItem value="">Health Care</MenuItem>
          <MenuItem value="">Industry</MenuItem>
          <MenuItem value="">Infromation Technology</MenuItem>
        </Select>
        </FormControl>
      </Stack>
      <Stack direction="row" spacing={8} mt="50px">
        <Stack
          direction="column"
          width="350px"
          height="387px"
          p="50px"
          spacing={5}
        >
          <Button variant="text" sx={{
            width: "300px",
            color: "#000000",
            fontSize:"24",
            borderBottom: '1px solid black',
            borderRadius: '0px',
            justifyContent: 'flex-start',
            ":hover": {
              background: "#FBDF5F",
              color: "#000000",
              borderBottom: '0px',
              boxShadow: '0px 5px 15px 3px rgba(0, 0, 0, 0.25)'
            },
          }} >Edit Profile</Button>
          <Link to='/createpost'>
          <Button variant="text" sx={{
            width: "300px",
            color: "#000000",
            fontSize:"24",
            borderBottom: '1px solid black',
            borderRadius: '0px',
            justifyContent: 'flex-start',
            ":hover": {
              background: "#FBDF5F",
              color: "#000000",
              borderBottom: '0px',
              boxShadow: '0px 5px 15px 3px rgba(0, 0, 0, 0.25)'
            },
          }}>Create Post</Button>
          </Link>
        </Stack>
        <Box>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {userposts.map((post) => (
              <Grid item xs={6} mt="20px">
                <Stack position="relative">
                  <UserPost userid={userid} post={post} />
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};

export default UserPage;
