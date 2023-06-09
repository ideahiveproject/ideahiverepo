// Importing necessary libraries popup and MUI/MUI-icons
import { Box, Stack, Typography, Button, Avatar } from "@mui/material";
const ProfileSection = () => {
  return (
    //users profile 
      <Box sx={{p: {lg: "30px", xs: "10px"} }} borderRadius="10px" bgcolor="#E4DAD9">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Avatar sx={{ bgcolor: "red", width: "50px", height: "50px"}}>
              A
            </Avatar>
            <Box>
              <Typography>Anna</Typography>
              <Typography>Addis Ababa, Ethiopia</Typography>
            </Box>
          </Stack>
          ...icon
        </Stack>
        <Stack direction='row' justifyContent="space-between">
        <Typography>Web Designer</Typography>
        <Stack direction="row" justifyContent="flex-end" spacing={3}>
          <Button  variant="contained" bgcolor="#E4DAD9">View Profile</Button>
          <Box>pen icon</Box>
        </Stack>
        </Stack>
      </Box>
  )
}

export default ProfileSection