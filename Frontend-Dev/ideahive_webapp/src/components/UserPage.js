// Importing necessary libraries for routing and MUI/MUI-icons
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack} from "@mui/material";
import { PostContext } from "../context/PostState";
import ProfileSection from "./ProfileSection";
import UserPost from "./UserPost";

const UserPage = () => {
  const { posts} = useContext(PostContext);
  const { userid } = useParams();
console.log(posts);
  const userposts = [...new Set(posts.filter((q) => q.userId == userid))];
  return (
    //users page which can see profile and post
    <Box sx={{ p: 8, bgColor: "#F5F5F5" }}>
    <ProfileSection />
    {userposts.map((post) => (
      <Stack mt='20px' >
    <UserPost userid ={userid} post={post}/>
    </Stack>
    ))}
    </Box>
  );
};

export default UserPage;
